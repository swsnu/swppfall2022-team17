import RegisterCafe from "pages/admin/register-cafe";
import { act, render } from "tests/utils";

describe("register cafe page", () => {
  it("renders", async () => {
    await act(() => {
      render(<RegisterCafe />);
    });
  });
});
