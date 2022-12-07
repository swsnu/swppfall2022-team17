import AdminBoard from "pages/admin/dashboard/[cafe_id]/board";
import { render, act } from "tests/utils";

describe("admin board page", () => {
  it("renders", async () => {
    await act(() => {
      render(<AdminBoard />);
    });
  });
});