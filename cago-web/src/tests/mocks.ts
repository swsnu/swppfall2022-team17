jest.spyOn(window, "alert").mockImplementation(() => {});

// Router mock
export const push = jest.fn();
export const replace = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    push: () => push(),
    replace: () => replace(),
    prefetch: jest.fn(),
    query: { id: "1" },
  }),
}));
