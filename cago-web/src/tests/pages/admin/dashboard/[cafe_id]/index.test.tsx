import { render } from "@testing-library/react";
import DashboardDetail from "pages/admin/dashboard/[cafe_id]/index";

describe("admin dashboard cafe main page", () => {
  it("renders", () => {
    render(<DashboardDetail />);
  });
});
