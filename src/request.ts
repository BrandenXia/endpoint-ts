import type { Endpoint, EndpointOptions } from "./endpoint.ts";
import { buildPath, type StrMap } from "./utils.ts";

type RequestOptions = Omit<Parameters<typeof fetch>[1], "method" | "body"> & {
  baseUrl: string;
};

type RequestType = <T extends EndpointOptions>(
  endpoint: Endpoint<T>,
  params: {
    [K in keyof Omit<T, "resBody">]: T[K] extends StrMap ? T[K] : undefined;
  },
  options: RequestOptions,
) => Promise<T["resBody"]>;

const request: RequestType = async (
  [method, path],
  { pathParam, queryParam, reqBody },
  options,
) => {
  const url = new URL(buildPath(path, pathParam), options.baseUrl);

  if (queryParam)
    for (const [key, value] of Object.entries(queryParam))
      if (value) url.searchParams.set(key, value as string);

  const response = await fetch(url, {
    ...options,
    method,
    body: reqBody ? JSON.stringify(reqBody) : undefined,
  });

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  return await response.json();
};

export default request;
export type { RequestOptions, RequestType };
