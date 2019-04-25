"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const merge = (a, b) => {
    const o = {};
    let empty = true;
    if (typeof a === 'object' && !Array.isArray(a)) {
        for (const i in a) {
            o[i] = a[i];
        }
        empty = false;
    }
    if (typeof b === 'object' && !Array.isArray(b)) {
        for (const i in b) {
            if (typeof b[i] === 'object' && !Array.isArray(b[i]) && typeof a[i] === 'object' && !Array.isArray(a[i])) {
                o[i] = merge(a[i], b[i]);
            }
            else {
                o[i] = b[i];
            }
        }
        empty = false;
    }
    return empty ? b || a : o;
};
/* tslint:disable:variable-name */
exports.add = (obj) => {
    return (target, propertyKey, descriptor) => {
        const o = Reflect.getMetadata(enum_1.METADATA.SWAGGER, descriptor.value) || {};
        Reflect.defineMetadata(enum_1.METADATA.SWAGGER, merge(o, obj || {}), descriptor.value);
        return descriptor;
    };
};
exports.responses = (status, desc) => exports.add({ responses: { [status]: { description: desc } } });
//# sourceMappingURL=meta.js.map