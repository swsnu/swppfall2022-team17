import Info from "pages/admin/dashboard/[id]/info";
import { act, render } from "tests/utils";

describe("admin cafe information page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Info />);
    });
  });
});
