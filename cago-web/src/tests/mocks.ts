jest.spyOn(window, "alert").mockImplementation(() => {});

// Router mock
export const push = jest.fn();
export const replace = jest.fn();
export const pathname = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    push: () => push(),
    replace: () => replace(),
    pathname: "/cafes/1/1/1",
    prefetch: jest.fn(),
    query: {},
  }),
}));
