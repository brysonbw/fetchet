import {
  FetchetErrorMessage,
  FetchetParameter,
  PrimitiveType
} from "./types.ts";

/**
 * Convert form data to JSON
 * @param {FormData} formData
 * @returns {string | undefined}
 */
export function formDataToJson(formData: FormData): string | undefined {
  if (formData == null || !(formData instanceof FormData)) return undefined;
  const formDataObject: Record<string, FormDataEntryValue> = {};
  formData.forEach((value: FormDataEntryValue, key: string) => {
    formDataObject[key as string] = value;
  });
  return JSON.stringify(formDataObject);
}

/**
 * Validates if object is a plain object
 * @param {unknown} obj
 * @returns {boolean}
 */
export function isPlainObject(obj: unknown): boolean {
  return (
    getTypeof(obj) === "object" &&
    obj !== null &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
}

/**
 * Gets search params string (includes `?` prefix)
 * @param {FetchetParameter | undefined} parameters
 * @example ?foo=1&bar=2
 * @returns {string}
 */
export function getURLSearchParamsString(
  parameters: FetchetParameter | undefined
): string {
  const isObject = isPlainObject(parameters);
  const isURLSearchParams = parameters instanceof URLSearchParams;
  let searchParams = "";

  if (!parameters || (!isObject && !isURLSearchParams)) {
    throw new TypeError(
      `${FetchetErrorMessage.UndefinedOrInvalidProperty} (reading 'parameters')`
    );
  }

  if (isObject) {
    const parametersObj = parameters as Record<string, string>;
    for (const key of Object.keys(parametersObj)) {
      if (getTypeof(parametersObj[key as string]) !== "string") {
        throw new TypeError(
          `${FetchetErrorMessage.UndefinedOrInvalidProperty} (reading 'parameters' [object])`
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

/**
 * Get the type for input
 * @param {unknown} input
 * @returns {PrimitiveType}
 */
export function getTypeof(input: unknown): PrimitiveType {
  return typeof input;
}
