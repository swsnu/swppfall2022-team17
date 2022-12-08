import DashboardBoardPost from "pages/admin/dashboard/[cafe_id]/board/post";
import { act, render } from "tests/utils";

describe("post article page", () => {
  it("renders", async () => {
    await act(() => {
      render(<DashboardBoardPost />);
    });
  });
});
