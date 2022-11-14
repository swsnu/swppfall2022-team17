import { render } from "@testing-library/react";
import RegisterCafe from "pages/admin/register-cafe";

describe("register cafe page", () => {
  it("renders", () => {
    render(<RegisterCafe />);
  });
});
