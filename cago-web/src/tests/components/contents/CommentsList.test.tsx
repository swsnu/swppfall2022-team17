import userEvent from "@testing-library/user-event";
import CommentsList from "components/contents/CommentsList";
import { comments } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

describe("comments list", () => {
  it("handles add comment", async () => {
    await act(() => {
      render(<CommentsList writable cafeId={1} articleId={1} comments={comments} />);
    });
    const textInput = screen.getByRole("textbox");
    await userEvent.type(textInput, "new comment");

    const confirmButton = screen.getByRole("button", { name: /작성/ });
    await userEvent.click(confirmButton);
  });
});
