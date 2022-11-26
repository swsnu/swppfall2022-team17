import Dashboard from "pages/admin/dashboard/index";
import { act } from "react-dom/test-utils";
import { render } from "tests/utils";

describe("admin dashboard page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Dashboard />);
    });
  });
});
