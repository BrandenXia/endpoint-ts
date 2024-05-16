import { test, expect } from "bun:test";
import { type Endpoint, request } from "../src";

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

test("GET request", async () => {
  const res = await request(
    test1,
    {},
    { baseUrl: "https://jsonplaceholder.typicode.com" },
  );
  expect(res).toBeObject();
  expect(res.userId).toBeNumber();
  expect(res.id).toBeNumber();
  expect(res.title).toBeString();
  expect(res.completed).toBeBoolean();
});

test("POST request", async () => {
  const res = await request(
    test2,
    {
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    },
    {
      baseUrl: "https://jsonplaceholder.typicode.com",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  expect(res).toBeObject();
  expect(res.id).toBeNumber();
  expect(res.title).toBeString();
  expect(res.body).toBeString();
  expect(res.userId).toBeNumber();
});
