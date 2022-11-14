import { render } from "@testing-library/react";
import Dashboard from "pages/admin/dashboard";

describe("admin dashboard page", () => {
  it("renders", () => {
    render(<Dashboard />);
  });
});
