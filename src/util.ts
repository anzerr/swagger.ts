
import is from 'type.util';
import * as zlib from 'zlib';

class Util {

	static _cache: {[key: string]: any} = {};

	merge(a: any, b: any): any {
		const o = {};
		let empty = true;
		if (is.object(a)) {
			for (const i in a) {
				o[i] = a[i];
			}
			empty = false;
		}

		if (is.object(b)) {
			for (const i in b) {
				if (is.object(b[i]) && is.object(a[i])) {
					o[i] = this.merge(a[i], b[i]);
				} else {
					o[i] = (is.array(a[i]) && is.array(b[i])) ? a[i].concat(b[i]) : b[i];
				}
			}
			empty = false;
		}
		if (is.array(a) && is.array(b)) {
			return b.concat(a);
		}
		return empty ? b || a : o;
	}

	run(caller: any, obj: any): any {
		if (is.object(obj)) {
			for (const i in obj) {
				if (is.object(obj[i])) {
					obj[i] = this.run(caller, obj[i]);
				} else if (is.function(obj[i])) {
					obj[i] = (function() {
						return obj[i].apply(caller);
					}).apply(caller);
				}
			}
		}
		return obj;
	}

	compress(data: Buffer | string): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			zlib.deflate(data, (err, buffer) => {
				if (!err) {
					resolve(buffer);
				} else {
					reject(new Error('failed to compress'));
				}
			});
		});
	}

	cache(controller: any, key: string, type: string, data: () => any, time = 60): any {
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

export default new Util();
