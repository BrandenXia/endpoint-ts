import { createClient, type Endpoint } from "../src";
import { expect, test } from "bun:test";

const test1: Endpoint<{
  response: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
}> = ["GET", "/todos/1"];

const test2: Endpoint<{
  body: {
    title: string;
    body: string;
    userId: number;
  };
  response: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
}> = ["POST", "/posts"];

test("client", async () => {
  const client = createClient(
    {
      baseUrl: "https://jsonplaceholder.typicode.com",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { test1, test2 },
  );

  const response1 = await client.test1({});
  expect(response1).toBeObject();
  expect(response1.userId).toBeNumber();
  expect(response1.id).toBeNumber();
  expect(response1.title).toBeString();
  expect(response1.completed).toBeBoolean();

  const response2 = await client.test2({
    body: {
      title: "foo",
      body: "bar",
      userId: 1,
    },
  });

  expect(response2).toBeObject();
  expect(response2.id).toBeNumber();
  expect(response2.title).toBeString();
  expect(response2.body).toBeString();
  expect(response2.userId).toBeNumber();
});
