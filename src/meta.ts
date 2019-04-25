
import { METADATA } from './enum';

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
			} else {
				o[i] = b[i];
			}
		}
		empty = false;
	}
	return empty ? b || a : o;
};

/* tslint:disable:variable-name */
export const add = (obj?: any) => {
	return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
		const o = Reflect.getMetadata(METADATA.SWAGGER, descriptor.value) || {};
		Reflect.defineMetadata(METADATA.SWAGGER, merge(o, obj || {}), descriptor.value);
		return descriptor;
	};
};

export const responses = (status: number, desc: string) => add({responses: {[status]: {description: desc}}});
