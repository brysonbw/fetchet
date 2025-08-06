# fetchet

The compact, Promise-based, and browser-native HTTP fetch wrapper.

[![github tag](https://img.shields.io/github/v/tag/brysonbw/fetchet?style=flat&color=blue&label=npm)](https://www.npmjs.com/package/fetchet?activeTab=versions) [![npm downloads](https://img.shields.io/npm/dm/fetchet?style=flat&label=npm%20downloads)](https://www.npmjs.com/package/fetchet) [![ci (test)](https://img.shields.io/github/actions/workflow/status/brysonbw/fetchet/test.yml?branch=main&style=flat&logo=github&label=CI)](https://github.com/brysonbw/fetchet/actions/workflows/test.yml)

## Documentation

For more detailed documentation, please visit the dedicated [fetchet API Reference](docs/api-reference/README.md).

## Installation

Fetchet is intended for client-side use and is available as a NPM package.

```bash
npm install fetchet
```

## Usage

```javaScript
const response = await fetchet("https://dummyjson.com/posts");
const data = await response.json();
console.log(data);
```

> `GET` is the default HTTP method if no method is specified in the options, similar to the native fetch API.

## Why use fetchet?

Fetchet is a lightweight wrapper around the native fetch API. It enhances convenience by extending the options object with features like automatic JSON parsing and support for passing query parameters as an object.

### Features

#### `options.parameters`

The `parameters` option (an object) in the request options is automatically parsed into URL search params string and appended to the request URL.

```javaScript
const parameters = { limit: "10", skip: "10", select: "name,ingredients,instructions" };
const response = await fetchet("https://dummyjson.com/recipes", { parameters });
const data = await response.json();
console.log(data);
```

> Request URL: `https://dummyjson.com/recipes?limit=10&skip=10&select=name,ingredients,instructions`

#### `options.json`

The `json` option (a boolean) is set to true by default. This means you don't need to manually set headers: `{ 'Content-Type': 'application/json' }` or use `JSON.stringify(body)` for POST, PUT, or PATCH requests. If you want to send the body in a non-JSON format, set `json` to false.

```javaScript
const response = await fetchet('https://dummyjson.com/posts/add', {
  method: 'POST',
  body: {
    title: 'How can AI and/or AGI be leveraged to improve the well-being and future of humanity?',
    userId: 5,
    /* other post data */
  }
});
const data = await response.json();
console.log(data);
```

## Contributing

If you have suggestions for how this project could be improved, or want to report a bug, feel free to open an issue! We welcome all contributions.

Likewise, before contributing please read the [contribution guide](CONTRIBUTING.md).

## Credits

Fetchet is heavily inspired by [axios](https://github.com/axios/axios) and of course [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Motivation

I wrote a fetch wrapper for a small side project. Rather than copying and pasting it into other projects, I decided to publish it as a public package.

## Resources

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [API Reference](docs/api-reference/README.md)

## License

[MIT](LICENSE)
