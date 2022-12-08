import CafesMap from "components/maps/CafesMap";
import { act, render } from "tests/utils";

describe("cafes map", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafesMap />);
    });
  });
});
