import userEvent from "@testing-library/user-event";
import RegisterCafeForm from "components/forms/RegisterCafeForm";
import { server } from "mocks/server";
import { rest } from "msw";
import { push } from "tests/mocks";
import { render, screen } from "tests/utils";
import { getCagoAPIError } from "utils";

const addressSearch = jest.fn().mockImplementation((address, callback) => {
  const result = [{ x: "127", y: "37" }];
  callback(result, "OK");
});

const categorySearch = jest.fn().mockImplementation((code, callback, options) => {
  const result = [
    {
      place_name: "cafe",
      phone: "010-1234-1234",
      road_address_name: "road_address",
      x: "127",
      y: "37",
    },
  ];
  callback(result);
});

const kakao = {
  maps: {
    services: {
      Geocoder: jest.fn().mockImplementation(() => ({
        addressSearch,
      })),
      Places: jest.fn().mockImplementation(() => ({
        categorySearch,
      })),
      SortBy: {
        ACCURACY: "accuracy",
        DISTANCE: "distance",
      },
    },
  },
};

global.kakao = kakao as any;

describe("register cafe form", () => {
  it("handles address search", async () => {
    render(<RegisterCafeForm />);

    const addressInput = screen.getByPlaceholderText(/주소/);
    const searchButton = screen.getByRole("button", { name: /검색/ });
    await userEvent.type(addressInput, "관악로 1");
    await userEvent.click(searchButton);
  });

  it("handles form submit", async () => {
    render(<RegisterCafeForm />);
    const addressInput = screen.getByPlaceholderText(/주소/);
    const searchButton = screen.getByRole("button", { name: /검색/ });
    await userEvent.type(addressInput, "관악로 1");
    await userEvent.click(searchButton);

    const regNumInput = screen.getByPlaceholderText(/사업자 등록 번호/);
    const nameInput = screen.getByPlaceholderText(/카페명/);
    const phoneInput = screen.getByPlaceholderText(/전화번호/);
    await userEvent.type(regNumInput, "1234567890");
    await userEvent.type(nameInput, "Cool Name");
    await userEvent.type(phoneInput, "010-1234-1234");

    const submitButton = screen.getByRole("button", { name: /등록하기/ });
    await userEvent.click(submitButton);
    expect(push).toBeCalled();
  });

  it("alerts when there is no cafe", async () => {
    categorySearch.mockImplementationOnce((code, callback, options) => {
      callback([]);
    });
    render(<RegisterCafeForm />);

    const addressInput = screen.getByPlaceholderText(/주소/);
    const searchButton = screen.getByRole("button", { name: /검색/ });
    await userEvent.type(addressInput, "관악로 1");
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  it("alerts when address is incorrect", async () => {
    addressSearch.mockImplementationOnce((address, callback) => {
      callback([], "ERROR");
    });
    render(<RegisterCafeForm />);

    const addressInput = screen.getByPlaceholderText(/주소/);
    const searchButton = screen.getByRole("button", { name: /검색/ });
    await userEvent.type(addressInput, "서울대학교");
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  it("alerts when the form is invalid", async () => {
    server.use(
      rest.post("/cafes/", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(getCagoAPIError("unique")));
      })
    );
    render(<RegisterCafeForm />);
    const addressInput = screen.getByPlaceholderText(/주소/);
    const searchButton = screen.getByRole("button", { name: /검색/ });
    await userEvent.type(addressInput, "관악로 1");
    await userEvent.click(searchButton);

    const regNumInput = screen.getByPlaceholderText(/사업자 등록 번호/);
    await userEvent.type(regNumInput, "1234567890");

    const submitButton = screen.getByRole("button", { name: /등록하기/ });
    await userEvent.click(submitButton);

    expect(push).not.toBeCalled();
    expect(window.alert).toBeCalled();
  });
});
