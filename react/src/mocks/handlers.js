import { rest } from "msw";

export const handlers = [
  rest.get("/first", (_, res, ctx) =>
    res(ctx.delay(2000), ctx.status(200), ctx.json({ result: true }))
  ),
  rest.get("/second", (_, res, ctx) =>
    res(ctx.delay(2000), ctx.status(200), ctx.json({ result: true }))
  ),
  rest.get("/search/count", (_, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json([
        { id: "1", count: 10 },
        { id: "2", count: 20 },
        { id: "3", count: 30 },
        { id: "4", count: 40 },
      ])
    )
  ),
  rest.get("/search", (_, res, ctx) =>
    res(
      ctx.delay(4000),
      ctx.status(200),
      ctx.json([
        ...Array.from({ length: 20 }).map(() => ({
          id: Math.random().toString(8).slice(2, 32),
        })),
      ])
    )
  ),
  rest.get("/nav/:nav", (_, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json([
        { name: "Nav Link 1", id: "nav-1" },
        { name: "Nav Link 2", id: "nav-2" },
        { name: "Nav Link 3", id: "nav-3" },
      ])
    )
  ),
];
