import userEvent from "@testing-library/user-event";
import CreateReviewForm from "components/forms/CreateReviewForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { act, render, screen } from "tests/utils";
import { getCagoAPIError } from "utils";

describe("create review form", () => {
  it("handles review submit", async () => {
    await act(() => {
      render(<CreateReviewForm cafe_id={1} />);
    });
    const ratingButtons = screen.getAllByRole("button", { name: /★/ });

    // Try to click all the rating buttons.
    await userEvent.click(ratingButtons[0]);
    await userEvent.click(ratingButtons[1]);
    await userEvent.click(ratingButtons[2]);
    await userEvent.click(ratingButtons[3]);
    await userEvent.click(ratingButtons[4]);

    const tasteButton = screen.getByRole("button", { name: "Taste" });
    const serviceButton = screen.getByRole("button", { name: "Service" });
    const moodButton = screen.getByRole("button", { name: "Mood" });

    // Try to click all the strength buttons.
    await userEvent.click(tasteButton);
    await userEvent.click(serviceButton);
    await userEvent.click(moodButton);

    const contentInput = screen.getByRole("textbox");
    await userEvent.type(contentInput, "review content.");

    const submitButton = screen.getByRole("button", { name: /작성/ });
    await userEvent.click(submitButton);
  });

  it("handles error on duplicate review", async () => {
    server.use(
      rest.post("/reviews/", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(getCagoAPIError("unique")));
      })
    );

    await act(() => {
      render(<CreateReviewForm cafe_id={1} />);
    });
    await userEvent.type(screen.getByRole("textbox"), "review content.");
    await userEvent.click(screen.getByRole("button", { name: /작성/ }));
    expect(window.alert).toBeCalled();
  });

  it("handles error on a manager tries to create a review", async () => {
    server.use(
      rest.post("/reviews/", (req, res, ctx) => {
        return res(ctx.status(403), ctx.json(getCagoAPIError("permission")));
      })
    );

    await act(() => {
      render(<CreateReviewForm cafe_id={1} />);
    });
    await userEvent.type(screen.getByRole("textbox"), "review content.");
    await userEvent.click(screen.getByRole("button", { name: /작성/ }));
    expect(window.alert).toBeCalled();
  });
});
