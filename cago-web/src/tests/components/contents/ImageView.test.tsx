import userEvent from "@testing-library/user-event";
import ImageView from "components/contents/ImageView";
import { images } from "mocks/stubs";
import { render, screen } from "tests/utils";

describe("image view", () => {
  it("is able to rotate the images", async () => {
    const onIndexChange = jest.fn();
    render(<ImageView images={images.map((d) => d.url)} onIndexChange={onIndexChange} />);

    const left = screen.getByRole("button", { name: "left" });
    const right = screen.getByRole("button", { name: "right" });

    expect(onIndexChange).toBeCalledWith(0);
    await userEvent.click(left);
    expect(onIndexChange).toBeCalledWith(1);
    await userEvent.click(right);
    expect(onIndexChange).toBeCalledWith(0);
  });
});
