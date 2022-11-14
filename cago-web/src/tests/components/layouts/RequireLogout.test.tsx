import RequireLogout from "components/layouts/RequireLogout";
import { server } from "mocks/server";
import { rest } from "msw";
import { replace } from "tests/mocks";
import { act, render, screen, waitFor } from "tests/utils";

// A child component to render
const child = <div data-testid="child" />;

describe("require logout", () => {
  describe("if the user is logged in", () => {
    it("redirects", async () => {
      render(<RequireLogout>{child}</RequireLogout>);
      await waitFor(() => expect(replace).toBeCalled());
    });

    it("does not render children", async () => {
      await act(() => {
        render(<RequireLogout>{child}</RequireLogout>);
      });
      expect(screen.queryByTestId("child")).toBeNull();
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

    it("does not redirect", async () => {
      await act(() => {
        render(<RequireLogout>{child}</RequireLogout>);
      });
      expect(replace).not.toBeCalled();
    });

    it("renders children", async () => {
      render(<RequireLogout>{child}</RequireLogout>);
      screen.findByTestId("child");
    });
  });
});
