import userEvent from "@testing-library/user-event";
import { server } from "mocks/server";
import { rest } from "msw";
import CafeDashboardAddPicture from "pages/admin/dashboard/[cafe_id]/add-pictures";
import { act, render, screen } from "tests/utils";

describe("admin dashboard add pictures page", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafeDashboardAddPicture />);
    });
  });

  it("handles image upload", async () => {
    await act(() => {
      render(<CafeDashboardAddPicture />);
    });
    const uploader = screen.getByLabelText(/업로드/);
    const file = new File(["this is image."], "image.png", { type: "image/png" });
    await userEvent.upload(uploader, file);
  });

  it("handles main image change", async () => {
    const images = [
      {
        id: 1,
        cafe: 1,
        url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-512.png",
        is_main: false,
      },
    ];
    server.use(
      rest.get("/cafe-images/", (req, res, ctx) => {
        return res(ctx.json(images));
      })
    );

    await act(() => {
      render(<CafeDashboardAddPicture />);
    });
    const button = screen.getByRole("button", { name: /대표/ });
    await userEvent.click(button);
  });
});
