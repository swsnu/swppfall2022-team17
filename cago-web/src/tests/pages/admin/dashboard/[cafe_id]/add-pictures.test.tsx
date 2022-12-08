import CafeDashboardAddPicture from "pages/admin/dashboard/[cafe_id]/add-pictures";
import { act, render } from "tests/utils";

describe("admin dashboard add pictures page", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafeDashboardAddPicture />);
    });
  });
});
