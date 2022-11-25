import Dashboard from "pages/admin/dashboard/index";
import { render, screen } from "tests/utils";
import userEvent from "@testing-library/user-event";


describe("admin dashboard page", () => {
  it("renders", () => {
    render(<Dashboard />);
  });
  
  it('has both checked and unchecked toggle',async ()=>{
    render(<Dashboard/>);
    const toggle_1 = await screen.findByTestId("1 toggle")
    const toggle_2 = await screen.findByTestId("2 toggle")
  })
});
