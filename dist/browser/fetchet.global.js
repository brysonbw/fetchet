/*! fetchet | (c) 2025 Bryson Ward | MIT License */ "use strict";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var fetchet = function() {
    var formDataToJson = // src/utils.ts
    function formDataToJson(formData) {
        if (formData == null || !_instanceof(formData, FormData)) return void 0;
        var formDataObject = {};
        formData.forEach(function(value, key) {
            formDataObject[key] = value;
        });
        return JSON.stringify(formDataObject);
    };
    var isPlainObject = function isPlainObject(obj) {
        return getTypeof(obj) === "object" && obj !== null && Object.prototype.toString.call(obj) === "[object Object]";
    };
    var getURLSearchParamsString = function getURLSearchParamsString(parameters) {
        var isObject = isPlainObject(parameters);
        var isURLSearchParams = _instanceof(parameters, URLSearchParams);
        var searchParams = "";
        if (!parameters || !isObject && !isURLSearchParams) {
            throw new TypeError("Cannot read undefined or invalid properties (reading 'parameters')");
        }
        if (isObject) {
            var parametersObj = parameters;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.keys(parametersObj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var key = _step.value;
                    if (getTypeof(parametersObj[key]) !== "string") {
                        throw new TypeError("Cannot read undefined or invalid properties (reading 'parameters' [object])");
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            searchParams = new URLSearchParams(parametersObj).toString();
        }
        if (isURLSearchParams) {
            searchParams = parameters.toString();
        }
        return "?".concat(searchParams);
    };
    var getTypeof = function getTypeof(input) {
        return typeof input === "undefined" ? "undefined" : _type_of(input);
    };
    var fetchet = // src/fetchet.ts
    function fetchet(_0) {
        return _async_to_generator(function(url) {
            var _ref, parameters, _ref_method, method, body, headers, _ref_json, json, config, URL, methodWhitelist, payload, response, error;
            var _arguments = arguments;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _ref = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {}, parameters = _ref.parameters, _ref_method = _ref.method, method = _ref_method === void 0 ? "GET" /* GET */  : _ref_method, body = _ref.body, headers = _ref.headers, _ref_json = _ref.json, json = _ref_json === void 0 ? true : _ref_json, config = _ref.config;
                        URL = parameters ? "".concat(url).concat(getURLSearchParamsString(parameters)) : url;
                        method = method.toUpperCase();
                        methodWhitelist = Object.keys(FetchetRequestMethod).map(function(key) {
                            return FetchetRequestMethod[key];
                        });
                        if (methodWhitelist.indexOf(method) === -1) {
                            throw new Error("Cannot read HTTP method: Unsupported '".concat(method, "'"));
                        }
                        try {
                            headers = new Headers(headers);
                        } catch (error) {
                            throw new TypeError("Cannot read Headers [".concat(_instanceof(headers, Headers) ? "Unreadable Headers" : getTypeof(headers), "]"));
                        }
                        payload = body;
                        if (json && payload !== void 0) {
                            if (_instanceof(payload, FormData)) {
                                payload = formDataToJson(payload);
                            } else if (isPlainObject(payload)) {
                                payload = JSON.stringify(payload);
                            }
                        }
                        if (json && payload !== void 0 && [
                            "POST" /* POST */ ,
                            "PUT" /* PUT */ ,
                            "PATCH" /* PATCH */ 
                        ].indexOf(method) !== -1) {
                            headers.delete("content-type");
                            headers.set("content-type", "application/json");
                        }
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            fetch(URL, _object_spread({
                                method: method,
                                body: payload,
                                headers: headers
                            }, config))
                        ];
                    case 2:
                        response = _state.sent();
                        if (!response.ok) {
                            throw new Error("".concat(response.status));
                        }
                        return [
                            2,
                            response
                        ];
                    case 3:
                        error = _state.sent();
                        console.error(error.message);
                        return [
                            2,
                            error
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        }).apply(this, arguments);
    };
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = function(target, all) {
        for(var name in all)__defProp(target, name, {
            get: all[name],
            enumerable: true
        });
    };
    var __copyProps = function(to, from, except, desc) {
        if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                var _loop = function() {
                    var key = _step.value;
                    if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                        get: function() {
                            return from[key];
                        },
                        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                    });
                };
                for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        return to;
    };
    var __toCommonJS = function(mod) {
        return __copyProps(__defProp({}, "__esModule", {
            value: true
        }), mod);
    };
    // src/index.ts
    var src_exports = {};
    __export(src_exports, {
        FetchetErrorMessage: function() {
            return FetchetErrorMessage;
        },
        FetchetRequestMethod: function() {
            return FetchetRequestMethod;
        },
        fetchet: function() {
            return fetchet;
        }
    });
    // src/types.ts
    var FetchetRequestMethod = /* @__PURE__ */ function(FetchetRequestMethod2) {
        FetchetRequestMethod2["GET"] = "GET";
        FetchetRequestMethod2["POST"] = "POST";
        FetchetRequestMethod2["PUT"] = "PUT";
        FetchetRequestMethod2["DELETE"] = "DELETE";
        FetchetRequestMethod2["PATCH"] = "PATCH";
        FetchetRequestMethod2["OPTIONS"] = "OPTIONS";
        FetchetRequestMethod2["HEAD"] = "HEAD";
        return FetchetRequestMethod2;
    }(FetchetRequestMethod || {});
    var FetchetErrorMessage = /* @__PURE__ */ function(FetchetErrorMessage2) {
        FetchetErrorMessage2["HeadersInvalid"] = "Cannot read Headers";
        FetchetErrorMessage2["UndefinedOrInvalidProperty"] = "Cannot read undefined or invalid properties";
        FetchetErrorMessage2["UnsupportedHTTPMethod"] = "Cannot read HTTP method";
        return FetchetErrorMessage2;
    }(FetchetErrorMessage || {});
    return __toCommonJS(src_exports);
}();
