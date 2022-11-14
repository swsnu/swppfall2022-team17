import userEvent from "@testing-library/user-event";
import CagoHeader from "components/layouts/CagoHeader";
import { server } from "mocks/server";
import { rest } from "msw";
import { render, screen } from "tests/utils";

describe("cago header", () => {
  describe("logouts on clicking the logout button", () => {
    it("renders a logout button", async () => {
      render(<CagoHeader />);
      const logoutButton = await screen.findByRole("button", { name: /로그아웃/ });
      await userEvent.click(logoutButton);
    });
  });

  describe("if the user is not logged in", () => {
    beforeEach(() => {
      server.use(
        rest.post("/auth/refresh/", (req, res, ctx) => {
          return res(ctx.status(401));
        })
      );
    });

    it("renders the links to login page and signup page", async () => {
      render(<CagoHeader />);
      await screen.findByRole("link", { name: /로그인/ });
      screen.getByRole("link", { name: /회원가입/ });
    });
  });
});
