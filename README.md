# endpoints

A lib for creating RESTful API wrappers.

## Usage

```typescript
import { createClient, request } from "endpoints";
import type { Endpoints } from "endpoints";

// Define your endpoints
const test: Endpoint<{
  pathParam: { id: string };
  query: { page?: string };
  body: { name: string };
  response: { message: string };
}> = ["GET", "/test"];
const test1: Endpoint<{
  pathParam: { id: string };
  query: { page?: string };
  body: { name: string };
  response: { message: string };
}> = ["GET", "/test/{id}"];

// Directly call the endpoint
const res = await request(
  test,
  {
    pathParam: { id: "1" },
    query: { page: "1" },
    body: { name: "test" },
  },
  { baseUrl: "http://localhost:3000" },
);

// Or wrap serveral endpoints into a client
const client = createClient(
  { baseUrl: "http://localhost:3000" },
  { test, test1 },
);

const res1 = await client.test({
  pathParam: { id: "1" },
  query: { page: "1" },
  body: { name: "test" },
});
```
