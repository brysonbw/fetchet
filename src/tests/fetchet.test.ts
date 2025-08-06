// @ts-nocheck
import { describe, expect, it } from "vitest";
import { fetchet } from "../fetchet.ts";
import { FetchetErrorMessage } from "../types.ts";
import { getTypeof } from "../utils.ts";

// TODO: Add local api/server for testing
const DUMMY_JSON_BASE_API_URL = "https://dummyjson.com";

// TODO: Move tests to execute in browsers (e.g Karma or something similar)
describe("fetchet()", () => {
  describe("GET", () => {
    it("gets all recipes", async () => {
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes`).then(
        (response) => response.json()
      );
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining(["recipes", "total", "skip", "limit"])
      );
      expect(response["recipes"].length).toBeGreaterThan(0);
      expect(response["recipes"][0]["id"]).toEqual(1);
      expect(response["recipes"][0]["name"]).toEqual(
        "Classic Margherita Pizza"
      );
    });

    it("gets a single recipe", async () => {
      const response = await fetchet(
        `${DUMMY_JSON_BASE_API_URL}/recipes/1`
      ).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(Object.keys(response).length).toBeGreaterThan(0);
      expect(response["id"]).toEqual(1);
      expect(response["name"]).toEqual("Classic Margherita Pizza");
    });

    it("gets queried recipe with search parameters in url", async () => {
      const response = await fetchet(
        `${DUMMY_JSON_BASE_API_URL}/recipes?limit=10&skip=10&select=name,ingredients,instructions`
      ).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining(["recipes", "total", "skip", "limit"])
      );
      expect(Object.keys(response["recipes"]).length).toBeGreaterThan(0);
      expect(Object.keys(response["recipes"]).length).toEqual(10);
      expect(response["total"]).toEqual(50);
      expect(response["skip"]).toEqual(10);
      expect(response["limit"]).toEqual(10);
    });

    it("gets queried recipe with search parameters from parameters (typeof object) argument", async () => {
      const parameters = {
        limit: "10",
        skip: "10",
        select: "name,ingredients,instructions"
      };
      expect(parameters).toBeTypeOf("object");
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes`, {
        parameters
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining(["recipes", "total", "skip", "limit"])
      );
      expect(Object.keys(response["recipes"]).length).toBeGreaterThan(0);
      expect(Object.keys(response["recipes"]).length).toEqual(10);
      expect(response["total"]).toEqual(50);
      expect(response["skip"]).toEqual(10);
      expect(response["limit"]).toEqual(10);
    });

    it("gets queried recipe with search parameters from parameters (instanceOf URLSearchParams) argument", async () => {
      const parameters = new URLSearchParams({
        limit: "10",
        skip: "10",
        select: "name,ingredients,instructions"
      });
      expect(parameters).toBeInstanceOf(URLSearchParams);
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes`, {
        parameters
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining(["recipes", "total", "skip", "limit"])
      );
      expect(Object.keys(response["recipes"]).length).toBeGreaterThan(0);
      expect(Object.keys(response["recipes"]).length).toEqual(10);
      expect(response["total"]).toEqual(50);
      expect(response["skip"]).toEqual(10);
      expect(response["limit"]).toEqual(10);
    });
  });
  describe("POST", () => {
    it("adds recipe - excluding headers", async () => {
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes/add`, {
        method: "POST",
        body: { name: "Tasty Pizza" }
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response["name"]).toEqual("Tasty Pizza");
    });
  });
  describe("PUT", () => {
    it("updates recipe - excluding headers", async () => {
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes/1`, {
        method: "PUT",
        body: { name: "Tasty Pizza" }
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response["name"]).toEqual("Tasty Pizza");
    });
  });
  describe("PATCH", () => {
    it("patches recipe - excluding headers", async () => {
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes/1`, {
        method: "PATCH",
        body: { name: "Tasty Pizza" }
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response["name"]).toEqual("Tasty Pizza");
    });
  });
  describe("DELETE", () => {
    it("deletes a recipe", async () => {
      const response = await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes/1`, {
        method: "DELETE"
      }).then((response) => response.json());
      expect(response).toBeDefined();
      expect(response).toBeTypeOf("object");
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("isDeleted");
      expect(response["isDeleted"]).toEqual(true);
      expect(response).toHaveProperty("deletedOn");
    });
  });
  // TODO: Describe HEAD
  // TODO: Describe OPTIONS
  describe("Unsupported HTTP method Error", () => {
    it("throws error for unsupported CONNECT HTTP method", async () => {
      const errorMessage = FetchetErrorMessage.UnsupportedHTTPMethod;
      const method = "connect";

      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes`, {
            method
          })
      ).rejects.toThrowError(
        `${errorMessage}: Unsupported '${method.toUpperCase()}'`
      );
    });
    it("throws error for unsupported TRACE HTTP method", async () => {
      const errorMessage = FetchetErrorMessage.UnsupportedHTTPMethod;
      const method = "trace";

      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/recipes`, {
            method
          })
      ).rejects.toThrowError(
        `${errorMessage}: Unsupported '${method.toUpperCase()}'`
      );
    });
  });
  describe("Headers TypeError", () => {
    it("throws error for invalid headers", async () => {
      // TODO: Test more invalid headers
      const invalidHeaders = {
        num: 1,
        arr: [["foo"], 1],
        obj: { [Symbol("foo")]: "1" },
        null: null
      };
      const errorMessage = FetchetErrorMessage.HeadersInvalid;
      const headersErrorTypeMessage = "Unreadable Headers";

      // TODO: Refactor sequential fetch/calls
      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/test`, {
            headers: invalidHeaders.num
          })
      ).rejects.toThrowError(
        `${errorMessage} [${
          invalidHeaders.num instanceof Headers
            ? `${headersErrorTypeMessage}`
            : getTypeof(invalidHeaders.num)
        }]`
      );
      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/test`, {
            headers: invalidHeaders.arr
          })
      ).rejects.toThrowError(
        `${errorMessage} [${
          invalidHeaders.arr instanceof Headers
            ? `${headersErrorTypeMessage}`
            : getTypeof(invalidHeaders.arr)
        }]`
      );
      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/test`, {
            headers: invalidHeaders.obj
          })
      ).rejects.toThrowError(
        `${errorMessage} [${
          invalidHeaders.obj instanceof Headers
            ? `${headersErrorTypeMessage}`
            : getTypeof(invalidHeaders.obj)
        }]`
      );
      await expect(
        async () =>
          await fetchet(`${DUMMY_JSON_BASE_API_URL}/test`, {
            headers: invalidHeaders.null
          })
      ).rejects.toThrowError(
        `${errorMessage} [${
          invalidHeaders.null instanceof Headers
            ? `${headersErrorTypeMessage}`
            : getTypeof(invalidHeaders.null)
        }]`
      );
    });
  });
});
