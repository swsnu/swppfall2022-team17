jest.spyOn(window, "alert").mockImplementation(() => {});

// Router mock
export const push = jest.fn();
export const replace = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    push: () => push(),
    replace: () => replace(),
    pathname: "/cafes/1/info",
    asPath: "/cafes/1/info",
    prefetch: jest.fn(),
    query: { cafe_id: "1" },
  }),
}));
