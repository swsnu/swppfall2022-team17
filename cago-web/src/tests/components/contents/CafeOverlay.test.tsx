import CafeOverlay from "components/contents/CafeOverlay";
import { Cafe } from "components/contents/CafesMap";
import { cafes } from "mocks/stubs";
import { render } from "tests/utils";

describe("cafe overlay", () => {
  it("renders cafe information", () => {
    render(<CafeOverlay cafe={cafes[0] as Cafe} />);
  });
});
