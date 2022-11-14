import { render } from "@testing-library/react";
import SignUp from "pages/auth/signup";

describe("signup page", () => {
  it("renders", () => {
    render(<SignUp />);
  });
});
