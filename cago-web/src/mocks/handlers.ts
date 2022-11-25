import { rest } from "msw";
import { managedCafe, profile, token, user } from "./stubs";

// Simplest API handlers
export const handlers = [
  rest.post("/auth/login/", (req, res, ctx) => {
    return res(
      ctx.cookie("refresh_token", token.refresh),
      ctx.json({
        access: token.access,
      })
    );
  }),

  rest.post("/auth/signup/", async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: user.id,
        email: user.email,
      })
    );
  }),

  rest.get("/auth/logout/", (req, res, ctx) => {
    return res(ctx.status(204), ctx.cookie("refresh_token", ""));
  }),

  rest.post("/auth/refresh/", (req, res, ctx) => {
    return res(
      ctx.json({
        access: token.access,
      })
    );
  }),

  rest.post("/customer-profiles/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(profile));
  }),

  rest.get("/customer-profiles/me/", (req, res, ctx) => {
    return res(ctx.json(profile));
  }),

  rest.get("/cafes/1/", (req, res, ctx) => {
    return res(ctx.json(managedCafe));
  }),

  rest.patch("/cafes/1/", (req, res, ctx) => {
    return res(ctx.json({ ...managedCafe, force_closed: true }));
  }),
];
