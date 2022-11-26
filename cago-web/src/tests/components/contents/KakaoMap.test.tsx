import KakaoMap from "components/contents/KakaoMap";
import { render } from "tests/utils";

describe("kakao map", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("retrieve the last location from local storage", () => {
    window.localStorage.setItem("last-location", JSON.stringify({ x: 127, y: 37 }));
    render(<KakaoMap />);
    expect(window.localStorage.getItem).toBeCalled();
  });
});
