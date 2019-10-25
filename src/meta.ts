
import {METADATA} from './enum';
import util from './util';

export const add = (obj?: any) => {
	return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
		const o = Reflect.getMetadata(METADATA.SWAGGER, descriptor.value) || {};
		Reflect.defineMetadata(METADATA.SWAGGER, util.merge(o, obj || {}), descriptor.value);
		return descriptor;
	};
};

export const responses = (status: number, desc: string, content?: any): any => {
	const out: any = {description: desc};
	if (content) {
		out.schema = content;
	}
	return add({responses: {[status]: out}});
};
export const description = (desc: string): any => add({description: desc});
export const headers = (key: string, meta: any): any => add({headers: {[key]: meta}});
export const tag = (t: string[] | string): any => add({tag: Array.isArray(t) ? t : [t]});

export const param = {
	query: (name: string, desc?: string, example?: string | number, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'query',
			required: false,
			type: 'string',
			schema: {
				type: 'string',
				example: String(example || '')
			},
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
	path: (name: string, desc?: string, example?: string | number, option?: any) => add({
		parameters: [{
			name: name,
			description: desc,
			in: 'path',
			required: true,
			schema: {
				type: 'string',
				example: String(example || '')
			},
			...(option || {})
		}]
	}),
};
