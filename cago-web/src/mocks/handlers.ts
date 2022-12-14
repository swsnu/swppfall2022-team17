import { rest } from "msw";
import { articles, cafes, cafe_menu, comments, images, profile, reviews, token, user } from "./stubs";

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

  rest.get("/cafes/", (req, res, ctx) => {
    if (req.url.searchParams.get("manager")) {
      return res(ctx.json([cafes[0]]));
    } else {
      return res(ctx.json(cafes));
    }
  }),

  rest.get("/cafes/1/", (req, res, ctx) => {
    return res(ctx.json(cafes[0]));
  }),

  rest.get("/cafes/2/", (req, res, ctx) => {
    return res(ctx.json(cafes[1]));
  }),

  rest.patch("/cafes/1/", (req, res, ctx) => {
    return res(ctx.json(cafes[0]));
  }),

  rest.post("/cafes/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(cafes[0]));
  }),

  rest.get("/menus/", (req, res, ctx) => {
    return res(ctx.json(cafe_menu));
  }),

  rest.delete("/menus/1/", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post("/menus/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(cafe_menu[0]));
  }),

  rest.post("/board/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(articles[0]));
  }),

  rest.get("/board/", (req, res, ctx) => {
    return res(ctx.json(articles));
  }),

  rest.patch("/board/1/", (req, res, ctx) => {
    return res(ctx.json(articles[0]));
  }),

  rest.delete("/board/1/", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get("/cafe-images/", (req, res, ctx) => {
    return res(ctx.json(images));
  }),

  rest.post("/cafe-images/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(images[0]));
  }),

  rest.patch("/cafe-images/1/", (req, res, ctx) => {
    return res(ctx.json(images[0]));
  }),

  rest.get("/reviews/", (req, res, ctx) => {
    return res(ctx.json(reviews));
  }),

  rest.post("/reviews/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(reviews[0]));
  }),

  rest.delete("/reviews/1/", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.put("https://cago-storage.s3.ap-northeast-2.amazonaws.com/user-content/*", (req, res, ctx) => {
    return res();
  }),

  rest.post("/like/", (req, res, ctx) => {
    return res();
  }),

  rest.delete("/like/", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post("/comments/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(comments[0]));
  }),

  rest.delete("/comments/1/", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.patch("/comments/1/", (req, res, ctx) => {
    return res(ctx.json(comments[0]));
  }),
];
