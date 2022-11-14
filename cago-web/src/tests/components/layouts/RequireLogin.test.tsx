import RequireLogin from "components/layouts/RequireLogin";
import { server } from "mocks/server";
import { rest } from "msw";
import { replace } from "tests/mocks";
import { act, render, screen, waitFor } from "tests/utils";

// A child component to render
const child = <div data-testid="child" />;

describe("require login", () => {
  describe("if the user is logged in", () => {
    it("does not redirect", async () => {
      await act(() => {
        render(<RequireLogin>{child}</RequireLogin>);
      });
      expect(replace).not.toBeCalled();
    });

    it("renders children", async () => {
      render(<RequireLogin>{child}</RequireLogin>);
      await screen.findByTestId("child");
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

    it("redirects", async () => {
      render(<RequireLogin>{child}</RequireLogin>);
      await waitFor(() => expect(replace).toBeCalled());
    });

    it("does not render children", async () => {
      await act(() => {
        render(<RequireLogin>{child}</RequireLogin>);
      });
      expect(screen.queryByTestId("child")).toBeNull();
    });
  });
});
