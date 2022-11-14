import userEvent from "@testing-library/user-event";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import { render, screen } from "tests/utils";

describe("cago admin header", () => {
  it("logouts on clicking the logout button", async () => {
    render(<CagoAdminHeader />);
    const logoutButton = await screen.findByRole("button", { name: /로그아웃/ });
    await userEvent.click(logoutButton);
  });
});
