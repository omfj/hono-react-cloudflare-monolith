import { useState } from "react";
import { api } from "../trpc/api";

export const Root = () => {
  const { data } = api.hello.hello.useQuery();
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return (
    <div className="py-24 mx-auto flex flex-col gap-8 max-w-screen-sm">
      <h1 className="text-xl mb-8 font-medium">Hello, world!</h1>

      <div>
        <p>Data from server:</p>
        <pre>
          <code>{JSON.stringify(data)}</code>
        </pre>
      </div>

      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
};
