import userEvent from "@testing-library/user-event";
import LoginForm from "components/forms/LoginForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { render, screen } from "tests/utils";

describe("login form", () => {
  it("logins on clicking the login button", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/ });
    const passwordInput = screen.getByLabelText("password");
    const loginButton = screen.getByRole("button", { name: /로그인/ });

    await userEvent.type(emailInput, "test1@test.com");
    await userEvent.type(passwordInput, "qwer1234");
    await userEvent.click(loginButton);
  });

  it("alerts on login error", async () => {
    server.use(
      rest.post("/auth/login/", (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    render(<LoginForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/ });
    const passwordInput = screen.getByLabelText("password");
    const loginButton = screen.getByRole("button", { name: /로그인/ });

    await userEvent.type(emailInput, "test1@test.com");
    await userEvent.type(passwordInput, "qwer1234");
    await userEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
