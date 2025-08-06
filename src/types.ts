export interface IFetchetOptions {
  body?: FetchetRequestBody | Record<string | number | symbol, any>;
  config?: FetchetConfig;
  headers?: FetchetHeaders;
  json?: FetchetJSON;
  method?: FetchetRequestMethod;
  parameters?: FetchetParameter;
}

export type FetchetRequestBody = BodyInit | FormData;
/** Contains options that control things like HTTP method, headers, body content, credentials, and more */
export type FetchetConfig = RequestInit;
export type FetchetRequest = RequestInfo | URL;
export type FetchetHeaders = HeadersInit;
/** Specifies if request body contents to be handled as JSON */
export type FetchetJSON = boolean;
export type FetchetParameter = Record<string, string> | URLSearchParams;
export type FetchetResponse = Promise<Response>;

export type PrimitiveType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

/**
 * Enum representing {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods HTTP request methods}
 * @enum {string}
 */
export enum FetchetRequestMethod {
  /** Request a representation of the specified resource */
  GET = "GET",

  /** Submit an entity to the specified resource */
  POST = "POST",

  /** Replace all current representations of the target resource with the request  */
  PUT = "PUT",

  /** Delete the specified resource */
  DELETE = "DELETE",

  /** Applies partial modifications to a resource */
  PATCH = "PATCH",

  /** Describe the communication options for the target resource */
  OPTIONS = "OPTIONS",

  /** Ask for a response identical to a GET request, but without a response body */
  HEAD = "HEAD"
}

/**
 * Enum representing common error messages thrown during request preparation or parsing
 * @enum {string}
 */
export enum FetchetErrorMessage {
  HeadersInvalid = "Cannot read Headers",
  UndefinedOrInvalidProperty = "Cannot read undefined or invalid properties",
  UnsupportedHTTPMethod = "Cannot read HTTP method"
}
