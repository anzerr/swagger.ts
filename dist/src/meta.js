"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
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
        out.schema = content;
    }
    return exports.add({ responses: { [status]: out } });
};
exports.description = (desc) => exports.add({ description: desc });
exports.headers = (key, meta) => exports.add({ headers: { [key]: meta } });
exports.tag = (t) => exports.add({ tag: Array.isArray(t) ? t : [t] });
exports.param = {
    query: (name, desc, example, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'query', required: false, type: 'string', schema: {
                    type: 'string',
                    example: String(example || '')
                } }, (option || {}))]
    }),
    header: (name, desc, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'header', required: false, type: 'string' }, (option || {}))]
    }),
    formData: (name, desc, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'formData', required: false, type: 'string' }, (option || {}))]
    }),
    body: (schema, desc, name, option) => exports.add({
        parameters: [Object.assign({ description: desc, schema: schema, in: 'body', required: false, name: name || 'body' }, (option || {}))]
    }),
    path: (name, desc, example, option) => exports.add({
        parameters: [Object.assign({ name: name, description: desc, in: 'path', required: true, schema: {
                    type: 'string',
                    example: String(example || '')
                } }, (option || {}))]
    }),
};
//# sourceMappingURL=meta.js.map