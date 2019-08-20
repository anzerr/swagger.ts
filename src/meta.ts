
import {METADATA} from './enum';
import merge from './util';

export const add = (obj?: any) => {
	return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
		const o = Reflect.getMetadata(METADATA.SWAGGER, descriptor.value) || {};
		Reflect.defineMetadata(METADATA.SWAGGER, merge(o, obj || {}), descriptor.value);
		return descriptor;
	};
};

export const responses = (status: number, desc: string): any => add({responses: {[status]: {description: desc}}});
export const description = (desc: string): any => add({description: desc});
export const headers = (key: string, meta: any): any => add({headers: {[key]: meta}});
export const tag = (t: string[] | string): any => add({tag: Array.isArray(t) ? t : [t]});

export const param = {
	query: (name: string, desc?: string, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'query',
			required: false,
			type: 'string',
			...(option || {})
		}]
	}),
	header: (name: string, desc?: string, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'header',
			required: false,
			type: 'string',
			...(option || {})
		}]
	}),
	formData: (name: string, desc?: string, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'formData',
			required: false,
			type: 'string',
			...(option || {})
		}]
	}),
	body: (schema: any, desc?: string, name?: string, option?: any) => add({
		parameters: [{
			description: desc,
			schema: schema,
			in: 'body',
			required: false,
			name: name || 'body',
			...(option || {})
		}]
	}),
	path: (name: string, desc?: string, example?: string, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'path',
			required: true,
			schema: {
				type: 'string',
				example: example || ''
			},
			...(option || {})
		}]
	}),
};
