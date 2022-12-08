import CafeButtonGroup from "components/layouts/CafeButtonGroup";
import { act, render } from "tests/utils";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("cafe button group", () => {
  it("selects info", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/info", query: { cafe_id: 1 } });

    await act(() => {
      render(<CafeButtonGroup />);
    });
  });

  it("selects menu", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/menu", query: { cafe_id: 1 } });

    await act(() => {
      render(<CafeButtonGroup />);
    });
  });

  it("selects reviews", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/reviews", query: { cafe_id: 1 } });

    await act(() => {
      render(<CafeButtonGroup />);
    });
  });

  it("selects board", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/board", query: { cafe_id: 1 } });

    await act(() => {
      render(<CafeButtonGroup />);
    });
  });
});
