"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                console.log(a, b);
                if (Array.isArray(a[i]) && Array.isArray(b[i])) {
                    o[i] = a[i].concat(b[i]);
                }
                else {
                    o[i] = b[i];
                }
            }
        }
        empty = false;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        console.log(a, b);
        return b.concat(a);
    }
    return empty ? b || a : o;
};
exports.default = merge;
//# sourceMappingURL=util.js.map