import Cafes from "pages/cafes";
import { act, render } from "tests/utils";

describe("cafes page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Cafes />);
    });
  });
});
