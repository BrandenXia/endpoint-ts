import type { RequestOptions, RequestType } from "./request.ts";
import request from "./request.ts";
import type { Endpoint, EndpointOptions } from "./endpoint.ts";
import { type StrMap } from "./utils.ts";

type EndpointRequest<
  T extends Endpoint,
  O extends EndpointOptions = T extends Endpoint<infer O> ? O : never,
> = (
  params: {
    [K in keyof Omit<O, "resBody">]: O[K] extends StrMap ? O[K] : undefined;
  },
  options?: Omit<RequestOptions, "baseUrl">,
) => Promise<O["resBody"]>;

type WithRequest<T extends Record<string, Endpoint>> = {
  [K in keyof T]: EndpointRequest<T[K]>;
};

class Client<T extends Record<string, Endpoint>> {
  constructor(
    private readonly options: RequestOptions,
    endpoints: { [K in keyof T]: T[K] },
  ) {
    for (const [key, endpoint] of Object.entries(endpoints))
      (this as any)[key] = this.request.bind(endpoint);
  }

  private readonly request: RequestType = async (endpoint, params, options) =>
    await request(endpoint, params, { ...this.options, ...options });
}

const createClient = <T extends Record<string, Endpoint>>(
  options: RequestOptions,
  endpoints: { [K in keyof T]: T[K] },
) => new Client(options, endpoints) as unknown as WithRequest<T>;

export default createClient;
