// @ts-nocheck
import { describe, expect, it } from "vitest";
import {
  formDataToJson,
  getTypeof,
  getURLSearchParamsString,
  isPlainObject
} from "../utils.ts";
import { FetchetErrorMessage } from "../types.ts";

describe("formDataToJson()", () => {
  it("converts formData", () => {
    const formData = new FormData();
    formData.append("userId", "1");
    formData.append("username", "johnDoe");

    const jsonStringify = formDataToJson(formData);
    expect(jsonStringify).toBeDefined();
    expect(jsonStringify).toBeTypeOf("string");

    const jsonParsed = JSON.parse(jsonStringify);
    expect(jsonParsed).toBeDefined();
    expect(jsonParsed).toBeTypeOf("object");
    expect(jsonParsed).toEqual({ userId: "1", username: "johnDoe" });
  });

  it("converts empty formData", () => {
    const formData = new FormData();

    const jsonStringify = formDataToJson(formData);
    expect(jsonStringify).toBeDefined();
    expect(jsonStringify).toBeTypeOf("string");
    expect(jsonStringify).toEqual("{}");

    const jsonParsed = JSON.parse(jsonStringify);
    expect(jsonParsed).toBeDefined();
    expect(jsonParsed).toBeTypeOf("object");
    expect(jsonParsed).toEqual({});
  });

  it("returns undefined if not instanceof FormData", () => {
    const str = "formData";
    const obj = { name: "formData" };
    const arr = ["formData"];
    const num = 1;
    const symbol = Symbol("formData");
    function func() {}
    expect(formDataToJson(str)).toBeUndefined();
    expect(formDataToJson(obj)).toBeUndefined();
    expect(formDataToJson(arr)).toBeUndefined();
    expect(formDataToJson(num)).toBeUndefined();
    expect(formDataToJson(symbol)).toBeUndefined();
    expect(formDataToJson(func())).toBeUndefined();

    const formData = new FormData();
    expect(formDataToJson(formData)).toBeDefined();
  });
});

describe("isPlainObject()", () => {
  it("returns true if plain object", () => {
    expect(isPlainObject({})).toEqual(true);
  });

  it("returns false if not plain object", () => {
    const str = "object";
    const arr = ["object"];
    const num = 1;
    const symbol = Symbol("object");
    function func() {}
    expect(isPlainObject(str)).toEqual(false);
    expect(isPlainObject(arr)).toEqual(false);
    expect(isPlainObject(num)).toEqual(false);
    expect(isPlainObject(symbol)).toEqual(false);
    expect(isPlainObject(func())).toEqual(false);
  });
});

describe("getURLSearchParamsString()", () => {
  it("returns query string from object", () => {
    const obj = { foo: "1", bar: "2" };
    const searchParamsStr = getURLSearchParamsString(obj);

    expect(searchParamsStr).toBeDefined();
    expect(searchParamsStr).toEqual("?foo=1&bar=2");
  });

  it("returns query string from URLSearchParams 'string literal'", () => {
    const searchParamsWithPrefix = new URLSearchParams("?foo=1&bar=2");
    const searchParamsWithoutPrefix = new URLSearchParams("foo=1&bar=2");

    expect(getURLSearchParamsString(searchParamsWithPrefix)).toBeDefined();
    expect(getURLSearchParamsString(searchParamsWithPrefix)).toEqual(
      "?foo=1&bar=2"
    );

    expect(getURLSearchParamsString(searchParamsWithoutPrefix)).toBeDefined();
    expect(getURLSearchParamsString(searchParamsWithoutPrefix)).toEqual(
      "?foo=1&bar=2"
    );
  });

  it("returns query string from URLSearchParams 'pairs'", () => {
    const searchParams = new URLSearchParams([
      ["foo", "1"],
      ["bar", "2"]
    ]);

    expect(getURLSearchParamsString(searchParams)).toBeDefined();
    expect(getURLSearchParamsString(searchParams)).toEqual("?foo=1&bar=2");
  });

  it("returns query string from URLSearchParams 'record'", () => {
    const searchParams = new URLSearchParams({ foo: "1", bar: "2" });

    expect(getURLSearchParamsString(searchParams)).toBeDefined();
    expect(getURLSearchParamsString(searchParams)).toEqual("?foo=1&bar=2");
  });

  it("throws error for undefined or invalid 'parameters' param", () => {
    const paramNull = null;
    const paramUndefined = undefined;
    const paramNonObject = {
      str: "str",
      num: 1,
      arr: ["array"],
      symbol: Symbol("symbol"),
      func: function func() {}
    };
    const paramNonInstanceofURLSearchParam = {
      formData: new FormData()
    };
    const errorMessage = `${FetchetErrorMessage.UndefinedOrInvalidProperty} (reading 'parameters')`;

    expect(() => getURLSearchParamsString(paramNull)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramUndefined)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramNonObject.str)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramNonObject.num)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramNonObject.arr)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramNonObject.symbol)).toThrowError(
      errorMessage
    );
    expect(() => getURLSearchParamsString(paramNonObject.func)).toThrowError(
      errorMessage
    );
    expect(() =>
      getURLSearchParamsString(paramNonInstanceofURLSearchParam.formData)
    ).toThrowError(errorMessage);
  });

  it("throws error for invalid 'parameters' object not containing typeof key/value string", () => {
    const searchParamsErrorObj = {
      num: 1,
      arr: ["array"],
      symbol: Symbol("symbol"),
      func: function func() {}
    };
    const searchParamsSuccessObj = {
      foo: "1",
      bar: "2"
    };
    const errorMessage = `${FetchetErrorMessage.UndefinedOrInvalidProperty} (reading 'parameters' [object])`;

    // Error 'parameters'
    expect(() => getURLSearchParamsString(searchParamsErrorObj)).toThrowError(
      errorMessage
    );

    // Success 'parameters'
    expect(() =>
      getURLSearchParamsString(searchParamsSuccessObj)
    ).not.toThrowError(errorMessage);
    expect(() =>
      getURLSearchParamsString(searchParamsSuccessObj)
    ).toBeDefined();
    expect(getURLSearchParamsString(searchParamsSuccessObj)).toEqual(
      "?foo=1&bar=2"
    );
  });
});

describe("getTypeof()", () => {
  it("returns a string indicating the type of the operand's value", () => {
    const str = "string";
    const num = 123;
    const bool = true;
    const undefinedVal = undefined;
    const obj = { key: "value" };
    const func = function () {};
    const symbol = Symbol("symbol");
    const bigInt = 100n;
    const nullVal = null;

    expect(getTypeof(str)).toEqual("string");
    expect(getTypeof(num)).toEqual("number");
    expect(getTypeof(bool)).toEqual("boolean");
    expect(getTypeof(undefinedVal)).toEqual("undefined");
    expect(getTypeof(obj)).toEqual("object");
    expect(getTypeof(func)).toEqual("function");
    expect(getTypeof(symbol)).toEqual("symbol");
    expect(getTypeof(bigInt)).toEqual("bigint");
    expect(getTypeof(nullVal)).toEqual("object");
  });
});
