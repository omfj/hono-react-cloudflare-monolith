import "./styles/globals.css";
import * as React from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Root } from "./routes/root";
import { api } from "./trpc/api";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Root />}></Route>)
);

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5173/trpc",
        }),
      ],
    })
  );

  return (
    <React.StrictMode>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </api.Provider>
    </React.StrictMode>
  );
};
