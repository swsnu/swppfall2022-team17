import { render } from "@testing-library/react";
import Cafes from "pages/cafes";

describe("cafes page", () => {
  it("renders", () => {
    render(<Cafes />);
  });
});
