"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_util_1 = require("type.util");
const zlib = require("zlib");
class Util {
    merge(a, b) {
        const o = {};
        let empty = true;
        if (type_util_1.default.object(a)) {
            for (const i in a) {
                o[i] = a[i];
            }
            empty = false;
        }
        if (type_util_1.default.object(b)) {
            for (const i in b) {
                if (type_util_1.default.object(b[i]) && type_util_1.default.object(a[i])) {
                    o[i] = this.merge(a[i], b[i]);
                }
                else {
                    o[i] = (type_util_1.default.array(a[i]) && type_util_1.default.array(b[i])) ? a[i].concat(b[i]) : b[i];
                }
            }
            empty = false;
        }
        if (type_util_1.default.array(a) && type_util_1.default.array(b)) {
            return b.concat(a);
        }
        return empty ? b || a : o;
    }
    compress(data) {
        return new Promise((resolve, reject) => {
            zlib.deflate(data, (err, buffer) => {
                if (!err) {
                    resolve(buffer);
                }
                else {
                    reject(new Error('failed to compress'));
                }
            });
        });
    }
    cache(controller, key, type, data, time = 60) {
        if (!Util._cache[key]) {
            Util._cache[key] = [data(), null];
        }
        const headers = {
            'content-type': controller.response.type(type),
            'cache-control': `max-age=${time}, public`
        };
        if (!controller.headers['accept-encoding'] || !controller.headers['accept-encoding'].match('deflate')) {
            return controller.status(200).set(headers).send(Util._cache[key][0]);
        }
        headers['content-encoding'] = 'deflate';
        if (!Util._cache[key][1]) {
            return this.compress(Util._cache[key][0]).then((res) => {
                return controller.status(200).set(headers).send(Util._cache[key][1] = res);
            });
        }
        return controller.status(200).set(headers).send(Util._cache[key][1]);
    }
}
Util._cache = {};
exports.default = new Util();
//# sourceMappingURL=util.js.map