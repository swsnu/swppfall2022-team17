import RequireProfile from "components/layouts/RequireProfile";
import { server } from "mocks/server";
import { rest } from "msw";
import { replace } from "tests/mocks";
import { act, render, screen, waitFor } from "tests/utils";

// A child component to render
const child = <div data-testid="child" />;

describe("require profile", () => {
  describe("if user has a profile", () => {
    it("does not redirect", async () => {
      await act(() => {
        render(<RequireProfile>{child}</RequireProfile>);
      });
      expect(replace).not.toBeCalled();
    });

    it("renders children", async () => {
      render(<RequireProfile>{child}</RequireProfile>);
      await screen.findByTestId("child");
    });
  });

  describe("if user is not logged in", () => {
    beforeEach(() => {
      server.use(
        rest.post("/auth/refresh/", (req, res, ctx) => {
          return res(ctx.status(401));
        })
      );
    });

    it("does not redirect", async () => {
      await act(() => {
        render(<RequireProfile>{child}</RequireProfile>);
      });
      expect(replace).not.toBeCalled();
    });

    it("renders children", async () => {
      render(<RequireProfile>{child}</RequireProfile>);
      await screen.findByTestId("child");
    });
  });

  describe("if user is logged in and doesn't have a profile", () => {
    beforeEach(() => {
      server.use(
        rest.get("/customer-profiles/me/", (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );
    });

    it("redirects", async () => {
      render(<RequireProfile>{child}</RequireProfile>);
      await waitFor(() => expect(replace).toBeCalled());
    });

    it("does not render children", async () => {
      await act(() => {
        render(<RequireProfile>{child}</RequireProfile>);
      });
      expect(screen.queryByTestId("child")).toBeNull();
    });
  });
});
