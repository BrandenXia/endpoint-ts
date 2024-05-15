import type { HttpMethod } from "./http.ts";
import type { StrMap } from "./utils.ts";

type EndpointOptions = {
  pathParam?: StrMap;
  query?: StrMap;
  body?: StrMap;
  response?: StrMap;
};

type Endpoint<T extends EndpointOptions = EndpointOptions> = [
  method: HttpMethod,
  path: string,
];

export type { Endpoint, EndpointOptions };
