import userEvent from "@testing-library/user-event";
import SignUpForm from "components/forms/SignUpForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { render, screen } from "tests/utils";
import { getCagoAPIError } from "utils";

describe("sign up form", () => {
  it("signs up on clicking the sign up button", async () => {
    server.use(
      rest.post("/auth/signup/", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(getCagoAPIError()));
      })
    );

    render(<SignUpForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/ });
    const continueButton = screen.getByRole("button", { name: /계속하기/ });

    await userEvent.type(emailInput, "test1@test.com");
    await userEvent.click(continueButton);

    const passwordInput = await screen.findByLabelText("password");
    const passwordConfirmInput = await screen.findByLabelText("password-confirm");
    const signUpButton = await screen.findByRole("button", { name: /가입하기/ });
    await userEvent.type(passwordInput, "qwer1234");
    await userEvent.type(passwordConfirmInput, "qwer1234");
    await userEvent.click(signUpButton);
  });

  it("alerts on existing email", async () => {
    server.use(
      rest.post("/auth/signup/", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(getCagoAPIError("unique")));
      })
    );

    render(<SignUpForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/ });
    const continueButton = screen.getByRole("button", { name: /계속하기/ });

    await userEvent.type(emailInput, "test1@test.com");
    await userEvent.click(continueButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
