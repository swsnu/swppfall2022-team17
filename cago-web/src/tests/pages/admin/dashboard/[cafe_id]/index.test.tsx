import { render } from "@testing-library/react";
import ManagedCafeMain from "pages/admin/dashboard";

describe("admin dashboard cafe main page", () => {
  it("renders", () => {
    render(<ManagedCafeMain />);
  });
});
