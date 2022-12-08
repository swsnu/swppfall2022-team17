import DashboardReview from "pages/admin/dashboard/[cafe_id]/reviews";
import { act, render } from "tests/utils";

describe("admin dashboard reviews page", () => {
  it("renders", async () => {
    await act(() => {
      render(<DashboardReview />);
    });
  });
});
