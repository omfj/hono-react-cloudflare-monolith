import { z } from "zod";
import { publicProcedure, router } from "..";

export const helloRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  }),
});
