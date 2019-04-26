"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const util_1 = require("./util");
/* tslint:disable:variable-name */
exports.add = (obj) => {
    return (target, propertyKey, descriptor) => {
        const o = Reflect.getMetadata(enum_1.METADATA.SWAGGER, descriptor.value) || {};
        Reflect.defineMetadata(enum_1.METADATA.SWAGGER, util_1.default(o, obj || {}), descriptor.value);
        return descriptor;
    };
};
exports.responses = (status, desc) => exports.add({ responses: { [status]: { description: desc } } });
exports.description = (desc) => exports.add({ description: desc });
exports.headers = (key, meta) => exports.add({ headers: { [key]: meta } });
exports.tag = (tag) => exports.add({ tag: Array.isArray(tag) ? tag : [tag] });
exports.param = {
    query: (name, description, required) => exports.add({
        parameters: [{
                name,
                description,
                in: 'query',
                required: required || false,
                type: 'string'
            }]
    }),
    header: (name, description, required) => exports.add({
        parameters: [{
                name,
                description,
                in: 'header',
                required: required || false,
                type: 'string'
            }]
    }),
    formData: (name, description, required) => exports.add({
        parameters: [{
                name,
                description,
                in: 'formData',
                required: required || false,
                type: 'string'
            }]
    }),
    body: (name, schema, description, required) => exports.add({
        parameters: [{
                name,
                description,
                schema,
                in: 'body',
                required: required || false,
            }]
    })
};
//# sourceMappingURL=meta.js.map