import userEvent from "@testing-library/user-event";
import PostArticleForm from "components/forms/PostArticleForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { push } from "tests/mocks";
import { render, screen, waitFor } from "tests/utils";

describe("post article form", () => {
  it("posts new article on clicking the submit button", async () => {
    render(<PostArticleForm />);
    const titleInput = screen.getByLabelText("title");
    const contentInput = screen.getByLabelText("content");
    const submitButton = screen.getByRole("button", { name: /작성/ });

    await userEvent.type(titleInput, "title");
    await userEvent.type(contentInput, "content");
    await userEvent.click(submitButton);

    await waitFor(() => expect(push).toBeCalled());
  });

  it("handles error on creating an article", async () => {
    server.use(
      rest.post("/board/", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(<PostArticleForm />);
    const titleInput = screen.getByLabelText("title");
    const contentInput = screen.getByLabelText("content");
    const submitButton = screen.getByRole("button", { name: /작성/ });

    await userEvent.type(titleInput, "title");
    await userEvent.type(contentInput, "content");
    await userEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
