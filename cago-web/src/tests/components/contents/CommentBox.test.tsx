import CommentBox from "components/contents/CommentBox";
import { comments } from "mocks/stubs";
import { act, render } from "tests/utils";

describe("comment box", () => {
  it("renders", async () => {
    await act(() => {
      render(<CommentBox comment={comments[0]} cafe_id={1} />);
    });
  });
});
