import {
  IFetchetOptions,
  FetchetParameter,
  FetchetRequestBody,
  FetchetRequestMethod,
  FetchetRequest,
  FetchetErrorMessage,
  FetchetHeaders,
  FetchetJSON,
  FetchetConfig,
  FetchetResponse
} from "./types.ts";
import {
  getURLSearchParamsString,
  formDataToJson,
  isPlainObject,
  getTypeof
} from "./utils.ts";

/**
 * fetchet – HTTP fetch client
 * @param {FetchetRequest} url Request URL
 * @param {IFetchetOptions} [options] Fetchet options
 * @param {FetchetParameter} [options.parameters] Separately, for GET requests, "parameters" refer to query parameters appended to the URL
 * @param {FetchetRequestMethod} [options.method] Specifies the HTTP request method (e.g., GET, POST, PUT, DELETE, ect)
 * @param {FetchetRequestBody} [options.body] Contents that have been added to the request
 * @param {FetchetHeaders} [options.headers]  An object. array, or Headers object containing the HTTP request headers
 * @param {FetchetJSON} [options.json] Specifies if request body contents to be handled as JSON
 * @param {FetchetConfig} [options.config] Request configurations
 * @returns {FetchetResponse}
 */
export async function fetchet(
  url: FetchetRequest,
  {
    parameters,
    method = FetchetRequestMethod.GET,
    body,
    headers,
    json = true,
    config
  }: IFetchetOptions = {}
): FetchetResponse {
  // Config request url - add query params string (if `parameters` defined)
  const URL = parameters
    ? `${url}${getURLSearchParamsString(parameters)}`
    : url;

  // Config request method
  method = method.toUpperCase() as FetchetRequestMethod;
  const methodWhitelist = Object.keys(FetchetRequestMethod).map(
    (key) => FetchetRequestMethod[key as keyof typeof FetchetRequestMethod]
  );
  if (methodWhitelist.indexOf(method) === -1) {
    throw new Error(
      `${FetchetErrorMessage.UnsupportedHTTPMethod}: Unsupported '${method}'`
    );
  }

  // Config headers - convert to safe Headers object
  try {
    headers = new Headers(headers);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    throw new TypeError(
      `${FetchetErrorMessage.HeadersInvalid} [${
        headers instanceof Headers ? "Unreadable Headers" : getTypeof(headers)
      }]`
    );
  }

  // Config payload for fetch request body
  let payload = body;
  if (json && payload !== undefined) {
    if (payload instanceof FormData) {
      payload = formDataToJson(payload);
    } else if (isPlainObject(payload)) {
      payload = JSON.stringify(payload);
    }
  }

  // When sending json set 'content-type: application/json' to headers
  if (
    json &&
    payload !== undefined &&
    [
      FetchetRequestMethod.POST,
      FetchetRequestMethod.PUT,
      FetchetRequestMethod.PATCH
    ].indexOf(method) !== -1
  ) {
    headers.delete("content-type");
    headers.set("content-type", "application/json");
  }

  try {
    const response = await fetch(URL, {
      method,
      body: payload as FetchetRequestBody,
      headers,
      ...config
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
}
