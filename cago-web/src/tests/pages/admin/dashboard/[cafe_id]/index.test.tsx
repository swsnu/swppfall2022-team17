import DashboardDetail from "pages/admin/dashboard/[cafe_id]/index";
import { act, render } from "tests/utils";

describe("admin dashboard cafe main page", () => {
  it("renders", async () => {
    await act(() => {
      render(<DashboardDetail />);
    });
  });
});
