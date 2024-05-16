import type { Endpoint, EndpointOptions } from "./endpoint.ts";
import { buildPath, type StrMap } from "./utils.ts";

type RequestOptions = Omit<FetchRequestInit, "method" | "body"> & {
  baseUrl: string;
};

type RequestType = <T extends EndpointOptions>(
  endpoint: Endpoint<T>,
  params: {
    [K in keyof Omit<T, "response">]: T[K] extends StrMap ? T[K] : undefined;
  },
  options: RequestOptions,
) => Promise<T["response"]>;

const request: RequestType = async (
  [method, path],
  { pathParam, query, body },
  options,
) => {
  const url = new URL(buildPath(path, pathParam), options.baseUrl);

  if (query)
    for (const [key, value] of Object.entries(query))
      if (value) url.searchParams.set(key, value as string);

  const response = await fetch(url, {
    ...options,
    method,
    body: JSON.stringify(body),
  });

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  return await response.json();
};

export default request;
export type { RequestOptions, RequestType };
