import DashboardBoard from "pages/admin/dashboard/[cafe_id]/board";
import { act, render } from "tests/utils";

describe("admin board page", () => {
  it("renders", async () => {
    await act(() => {
      render(<DashboardBoard />);
    });
  });
});
