/*! fetchet | (c) 2025 Bryson Ward | MIT License */

// src/types.ts
var FetchetRequestMethod = /* @__PURE__ */ ((FetchetRequestMethod2) => {
  FetchetRequestMethod2["GET"] = "GET";
  FetchetRequestMethod2["POST"] = "POST";
  FetchetRequestMethod2["PUT"] = "PUT";
  FetchetRequestMethod2["DELETE"] = "DELETE";
  FetchetRequestMethod2["PATCH"] = "PATCH";
  FetchetRequestMethod2["OPTIONS"] = "OPTIONS";
  FetchetRequestMethod2["HEAD"] = "HEAD";
  return FetchetRequestMethod2;
})(FetchetRequestMethod || {});
var FetchetErrorMessage = /* @__PURE__ */ ((FetchetErrorMessage2) => {
  FetchetErrorMessage2["HeadersInvalid"] = "Cannot read Headers";
  FetchetErrorMessage2["UndefinedOrInvalidProperty"] = "Cannot read undefined or invalid properties";
  FetchetErrorMessage2["UnsupportedHTTPMethod"] = "Cannot read HTTP method";
  return FetchetErrorMessage2;
})(FetchetErrorMessage || {});

// src/utils.ts
function formDataToJson(formData) {
  if (formData == null || !(formData instanceof FormData)) return void 0;
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  return JSON.stringify(formDataObject);
}
function isPlainObject(obj) {
  return getTypeof(obj) === "object" && obj !== null && Object.prototype.toString.call(obj) === "[object Object]";
}
function getURLSearchParamsString(parameters) {
  const isObject = isPlainObject(parameters);
  const isURLSearchParams = parameters instanceof URLSearchParams;
  let searchParams = "";
  if (!parameters || !isObject && !isURLSearchParams) {
    throw new TypeError(
      `${"Cannot read undefined or invalid properties" /* UndefinedOrInvalidProperty */} (reading 'parameters')`
    );
  }
  if (isObject) {
    const parametersObj = parameters;
    for (const key of Object.keys(parametersObj)) {
      if (getTypeof(parametersObj[key]) !== "string") {
        throw new TypeError(
          `${"Cannot read undefined or invalid properties" /* UndefinedOrInvalidProperty */} (reading 'parameters' [object])`
        );
      }
    }
    searchParams = new URLSearchParams(parametersObj).toString();
  }
  if (isURLSearchParams) {
    searchParams = parameters.toString();
  }
  return `?${searchParams}`;
}
function getTypeof(input) {
  return typeof input;
}

// src/fetchet.ts
async function fetchet(url, {
  parameters,
  method = "GET" /* GET */,
  body,
  headers,
  json = true,
  config
} = {}) {
  const URL = parameters ? `${url}${getURLSearchParamsString(parameters)}` : url;
  method = method.toUpperCase();
  const methodWhitelist = Object.keys(FetchetRequestMethod).map(
    (key) => FetchetRequestMethod[key]
  );
  if (methodWhitelist.indexOf(method) === -1) {
    throw new Error(
      `${"Cannot read HTTP method" /* UnsupportedHTTPMethod */}: Unsupported '${method}'`
    );
  }
  try {
    headers = new Headers(headers);
  } catch (error) {
    throw new TypeError(
      `${"Cannot read Headers" /* HeadersInvalid */} [${headers instanceof Headers ? "Unreadable Headers" : getTypeof(headers)}]`
    );
  }
  let payload = body;
  if (json && payload !== void 0) {
    if (payload instanceof FormData) {
      payload = formDataToJson(payload);
    } else if (isPlainObject(payload)) {
      payload = JSON.stringify(payload);
    }
  }
  if (json && payload !== void 0 && [
    "POST" /* POST */,
    "PUT" /* PUT */,
    "PATCH" /* PATCH */
  ].indexOf(method) !== -1) {
    headers.delete("content-type");
    headers.set("content-type", "application/json");
  }
  try {
    const response = await fetch(URL, {
      method,
      body: payload,
      headers,
      ...config
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
export {
  FetchetErrorMessage,
  FetchetRequestMethod,
  fetchet
};
