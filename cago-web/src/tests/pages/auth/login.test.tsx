import { render } from "@testing-library/react";
import Login from "pages/auth/login";

describe("login page", () => {
  it("renders", () => {
    render(<Login />);
  });
});
