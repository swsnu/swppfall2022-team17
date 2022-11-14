import "@testing-library/jest-dom";
import { server } from "mocks/server";
import "./mocks";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
});
