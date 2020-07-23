"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.param = exports.tag = exports.headers = exports.description = exports.responses = exports.add = void 0;
const enum_1 = require("./enum");
const type_util_1 = require("type.util");
const util_1 = require("./util");
exports.add = (obj) => {
    return (target, propertyKey, descriptor) => {
        const o = Reflect.getMetadata(enum_1.METADATA.SWAGGER, descriptor.value) || {};
        Reflect.defineMetadata(enum_1.METADATA.SWAGGER, util_1.default.merge(o, obj || {}), descriptor.value);
        return descriptor;
    };
};
exports.responses = (status, desc, content) => {
    const out = { description: desc };
    if (content) {
        if (type_util_1.default.string(content)) {
            out.schema = {
                type: 'string',
                properties: content
            };
        }
        else if (type_util_1.default.object(content)) {
            out.schema = {
                type: 'object',
                properties: content
            };
        }
        else {
            out.schema = content;
        }
    }
    return exports.add({ responses: { [status]: out } });
};
exports.description = (desc) => exports.add({ description: desc });
exports.headers = (key, meta) => exports.add({ headers: { [key]: meta } });
exports.tag = (t) => exports.add({ tag: Array.isArray(t) ? t : [t] });
exports.param = {
    query: (name, desc, example, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'query', required: true, type: 'string', schema: {
                    type: 'string',
                    example: example
                } }, (option || {}))]
    }),
    header: (name, desc, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'header', required: true, type: 'string' }, (option || {}))]
    }),
    formData: (name, desc, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'formData', required: true, type: 'string' }, (option || {}))]
    }),
    body: (schema, desc, name, option) => exports.add({
        parameters: [Object.assign({ description: desc, schema: schema, in: 'body', required: true, name: name || 'body' }, (option || {}))]
    }),
    path: (name, desc, example, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'path', required: true, schema: {
                    type: 'string',
                    example: example
                } }, (option || {}))]
    }),
};
//# sourceMappingURL=meta.js.map