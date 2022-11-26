import Crowdedness from "components/contents/Crowdedness";
import { render } from "tests/utils";

describe("crowdedness", () => {
  it("should render crowdedness properly", () => {
    render(<Crowdedness crowdedness={1} />);
  });
});
