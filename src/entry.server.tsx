import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { appRouter } from "./trpc/server/router";

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();

app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

app.get("*", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/main.js"></script>
          ) : (
            <script type="module" src="/src/entry.client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export default app;
