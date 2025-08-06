interface IFetchetOptions {
    body?: FetchetRequestBody | Record<string | number | symbol, any>;
    config?: FetchetConfig;
    headers?: FetchetHeaders;
    json?: FetchetJSON;
    method?: FetchetRequestMethod;
    parameters?: FetchetParameter;
}
type FetchetRequestBody = BodyInit | FormData;
type FetchetConfig = RequestInit;
type FetchetRequest = RequestInfo | URL;
type FetchetHeaders = HeadersInit;
type FetchetJSON = boolean;
type FetchetParameter = Record<string, string> | URLSearchParams;
type FetchetResponse = Promise<Response>;
type PrimitiveType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
declare enum FetchetRequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD"
}
declare enum FetchetErrorMessage {
    HeadersInvalid = "Cannot read Headers",
    UndefinedOrInvalidProperty = "Cannot read undefined or invalid properties",
    UnsupportedHTTPMethod = "Cannot read HTTP method"
}

declare function fetchet(url: FetchetRequest, { parameters, method, body, headers, json, config }?: IFetchetOptions): FetchetResponse;

export { type FetchetConfig, FetchetErrorMessage, type FetchetHeaders, type FetchetJSON, type FetchetParameter, type FetchetRequest, type FetchetRequestBody, FetchetRequestMethod, type FetchetResponse, type IFetchetOptions, type PrimitiveType, fetchet };
