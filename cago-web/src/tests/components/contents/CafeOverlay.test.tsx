import CafeOverlay from "components/contents/CafeOverlay";
import { Cafe } from "components/contents/CafesMap";
import { cafes } from "mocks/stubs";
import { act, render } from "tests/utils";

describe("cafe overlay", () => {
  it("renders cafe information", async () => {
    await act(() => {
      render(<CafeOverlay cafe={cafes[0] as Cafe} />);
    });
  });
});
