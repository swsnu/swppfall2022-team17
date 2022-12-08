import CafeDashboardInfo from "pages/admin/dashboard/[cafe_id]/info";
import { act, render } from "tests/utils";

describe("admin dashboard information page", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafeDashboardInfo />);
    });
  });
});
