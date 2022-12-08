import userEvent from "@testing-library/user-event";
import CreateProfileForm from "components/forms/CreateProfileForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { render, screen } from "tests/utils";
import { getCagoAPIError } from "utils";

describe("create profile form", () => {
  it("creates new profile", async () => {
    render(<CreateProfileForm />);
    const displayNameInput = screen.getByRole("textbox", { name: /display-name/ });
    const submitButton = screen.getByRole("button", { name: /확인/ });

    await userEvent.type(displayNameInput, "test1");
    await userEvent.click(submitButton);
  });

  it("handles error on creating a profile", async () => {
    server.use(
      rest.post("/customer-profiles/", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(getCagoAPIError("unique")));
      })
    );
    render(<CreateProfileForm />);
    const displayNameInput = screen.getByRole("textbox", { name: /display-name/ });
    const submitButton = screen.getByRole("button", { name: /확인/ });

    await userEvent.type(displayNameInput, "test1");
    await userEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it("handles image upload", async () => {
    global.URL.createObjectURL = jest.fn(
      () => new URL("/user-content/avatar.png", process.env.NEXT_PUBLIC_S3_URL).href
    );

    render(<CreateProfileForm />);
    const uploader = await screen.findByLabelText("");
    const file = new File(["this is image."], "image.png", { type: "image/png" });
    await userEvent.upload(uploader, file);

    const displayNameInput = screen.getByRole("textbox", { name: /display-name/ });
    await userEvent.type(displayNameInput, "test1");
    const submitButton = screen.getByRole("button", { name: /확인/ });
    await userEvent.click(submitButton);
  });
});
