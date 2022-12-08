import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import { act, render } from "tests/utils";

describe("cafe button group", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafeButtonGroup />);
    });
  });
});
