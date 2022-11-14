import { server } from "mocks/server";
import { rest } from "msw";
import CreateProfile from "pages/create-profile";
import { replace } from "tests/mocks";
import { act, render, waitFor } from "tests/utils";

describe("create profile page", () => {
  describe("if user has a profile", () => {
    it("redirects", async () => {
      render(<CreateProfile />);
      await waitFor(() => expect(replace).toBeCalled());
    });
  });

  describe("if user doesn't have a profile", () => {
    beforeEach(() => {
      server.use(
        rest.get("/customer-profiles/me/", (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );
    });

    it("does not redirect", async () => {
      await act(() => {
        render(<CreateProfile />);
      });
      expect(replace).not.toBeCalled();
    });
  });
});
