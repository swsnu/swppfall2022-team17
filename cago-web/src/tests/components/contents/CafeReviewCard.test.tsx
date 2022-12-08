import userEvent from "@testing-library/user-event";
import CafeReviewCard from "components/contents/CafeReviewCard";
import { reviews } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

const renderCafeReviewCard = () => render(<CafeReviewCard review={reviews[0]} />);

describe("cafe review card", () => {
  it("handles delete", async () => {
    await act(() => {
      renderCafeReviewCard();
    });

    const deleteButton = screen.getByRole("button", { name: /delete/ });
    await userEvent.click(deleteButton);
  });
});
