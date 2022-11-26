jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");

export const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((successCallback) =>
    Promise.resolve(
      successCallback({
        coords: {
          latitude: 37,
          longitude: 127,
        },
      })
    )
  ),
  watchPosition: jest.fn().mockImplementation((successCallback) => {
    Promise.resolve(
      successCallback({
        coords: {
          latitude: 37,
          longitude: 127,
        },
      })
    );
    return 1;
  }),
};

(global as any).navigator.geolocation = mockGeolocation;

// Router mock
export const push = jest.fn();
export const replace = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    push: () => push(),
    replace: () => replace(),
    prefetch: jest.fn(),
    query: {},
  }),
}));
