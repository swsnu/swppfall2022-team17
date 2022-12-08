import userEvent from "@testing-library/user-event";
import CommentBox from "components/contents/CommentBox";
import { comments } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

describe("comment box", () => {
  it("handles edit", async () => {
    await act(() => {
      render(<CommentBox comment={comments[0]} cafe_id={1} />);
    });

    await userEvent.click(screen.getByRole("button", { name: /수정/ }));
    await userEvent.click(screen.getByRole("button", { name: /취소/ }));
    await userEvent.click(screen.getByRole("button", { name: /수정/ }));
    await userEvent.type(screen.getByRole("textbox"), "new comment");
    await userEvent.click(screen.getByRole("button", { name: /확인/ }));
  });

  it("handles delete", async () => {
    await act(() => {
      render(<CommentBox comment={comments[0]} cafe_id={1} />);
    });
    await userEvent.click(screen.getByRole("button", { name: /삭제/ }));
  });
});
