import ContentSection from "components/contents/ContentSection";
import { render } from "tests/utils";

describe("ContentSection", () => {
  it("renders ContentSection", () => {
    render(<ContentSection title={"title"} />);
  });
});
