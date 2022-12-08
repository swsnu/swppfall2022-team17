import CagoButtonGroup from "components/layouts/CagoButtonGroup";
import { act, render } from "tests/utils";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("cago button group", () => {
  it("selects info", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/info", query: { cafe_id: 1 } });

    await act(() => {
      render(<CagoButtonGroup />);
    });
  });

  it("selects menu", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/menu", query: { cafe_id: 1 } });

    await act(() => {
      render(<CagoButtonGroup />);
    });
  });

  it("selects reviews", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/reviews", query: { cafe_id: 1 } });

    await act(() => {
      render(<CagoButtonGroup />);
    });
  });

  it("selects board", async () => {
    useRouter.mockReturnValue({ pathname: "/cafes/1/board", query: { cafe_id: 1 } });

    await act(() => {
      render(<CagoButtonGroup />);
    });
  });
});
