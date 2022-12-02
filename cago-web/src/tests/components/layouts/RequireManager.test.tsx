import RequireManager from "components/layouts/RequireManager";
import { server } from "mocks/server";
import { cafes } from "mocks/stubs";
import { rest } from "msw";
import { replace } from "tests/mocks";
import { act, render, screen } from "tests/utils";

// A child component to render
const child = <div data-testid="child" />;

describe("require manager", () => {
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
        render(<RequireManager>{child}</RequireManager>);
      });
      expect(replace).not.toBeCalled();
    });

    it("does not render children", async () => {
      await act(() => {
        render(<RequireManager>{child}</RequireManager>);
      });
      expect(screen.queryByTestId("child")).toBeNull();
    });
  });

  describe("if the user is logged in", () => {
    describe("if the user is manager", () => {
      it("does not redirect", async () => {
        await act(() => {
          render(<RequireManager>{child}</RequireManager>);
        });
        expect(replace).not.toBeCalled();
      });

      it("renders children", async () => {
        render(<RequireManager>{child}</RequireManager>);
        await screen.findByTestId("child");
      });
    });

    describe("if the user is not a manager", () => {
      const stubCafe = { ...cafes[0], managers: [99] };
      beforeEach(() => {
        server.use(
          rest.get("/cafes/1/", (req, res, ctx) => {
            return res(ctx.json(stubCafe));
          })
        );
      });

      it("redirect to dashboard", async () => {
        await act(() => {
          render(<RequireManager>{child}</RequireManager>);
        });
        expect(replace).toBeCalled();
      });

      it("does not render children", async () => {
        await act(() => {
          render(<RequireManager>{child}</RequireManager>);
        });
        expect(screen.queryByTestId("child")).toBeNull();
      });
    });
  });
});
