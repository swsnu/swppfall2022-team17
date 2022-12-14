import userEvent from "@testing-library/user-event";
import MenuContainer from "components/contents/MenuContainer";
import { cafe_menu } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

const categoryStub = "커피";
const menuListStub: any = [cafe_menu[0], cafe_menu[1]];

describe("menu container", () => {
  describe("read only", () => {
    it("renders category name", async () => {
      await act(() => {
        render(<MenuContainer category={categoryStub} menuList={menuListStub} />);
      });
      expect(screen.getByText(categoryStub)).toBeVisible();
    });

    it("renders menu", async () => {
      await act(() => {
        render(<MenuContainer category={categoryStub} menuList={menuListStub} />);
      });
      expect(screen.getByText(menuListStub[0].name)).toBeVisible();
    });
  });

  describe("editable", () => {
    it("is able to delete a menu", async () => {
      await act(() => {
        render(<MenuContainer category={categoryStub} menuList={menuListStub} editable cafeId={1} />);
      });
      const button = screen.getAllByRole("button")[0];
      await userEvent.click(button);
    });
  });
});
