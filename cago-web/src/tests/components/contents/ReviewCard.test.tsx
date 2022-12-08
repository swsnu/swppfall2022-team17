import userEvent from "@testing-library/user-event";
import ReviewCard from "components/contents/ReviewCard";
import { reviews } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

const renderReviewCard = () => render(<ReviewCard review={reviews[0]} />);

describe("review card", () => {
  it("handles delete", async () => {
    await act(() => {
      renderReviewCard();
    });

    const deleteButton = screen.getByRole("button", { name: /delete/ });
    await userEvent.click(deleteButton);
  });
});
