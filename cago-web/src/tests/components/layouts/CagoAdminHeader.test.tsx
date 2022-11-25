import userEvent from "@testing-library/user-event";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import { render, screen } from "tests/utils";

describe("cago admin header", () => {
  describe("logouts on clicking the logout button", () => {
    it("renders a logout button", async () => {
      render(<CagoAdminHeader />);
      const logoutButton = await screen.findByRole("button", {
        name: /로그아웃/,
      });
      await userEvent.click(logoutButton);
    });
  });

  describe("if the user is at the detail page", () => {
    it("renders the brief information of the cafe", async () => {
      render(<CagoAdminHeader />);
      await screen.findByRole("link", { name: /managedCafe1/ });
      screen.getByText("# of likes");
      await screen.findByRole("button", { name: /영업 중/ });
    });
  });
});
