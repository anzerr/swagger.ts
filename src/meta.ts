
import { METADATA } from './enum';
import merge from './util';

/* tslint:disable:variable-name */
export const add = (obj?: any) => {
	return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
		const o = Reflect.getMetadata(METADATA.SWAGGER, descriptor.value) || {};
		Reflect.defineMetadata(METADATA.SWAGGER, merge(o, obj || {}), descriptor.value);
		return descriptor;
	};
};

export const responses = (status: number, desc: string) => add({ responses: { [status]: { description: desc } } });
export const description = (desc: string) => add({ description: desc });
export const headers = (key: string, meta: any) => add({ headers: { [key]: meta } });
export const tag = (tag: string[] | string) => add({ tag: Array.isArray(tag) ? tag : [tag] });
export const param = {
	query: (name: string, description?: string, required?: boolean) => add({
		parameters: [{
			name,
			description,
			in: 'query',
			required: required || false,
			type: 'string'
		}]
	}),
	header: (name: string, description?: string, required?: boolean) => add({
		parameters: [{
			name,
			description,
			in: 'header',
			required: required || false,
			type: 'string'
		}]
	}),
	formData: (name: string, description?: string, required?: boolean) => add({
		parameters: [{
			name,
			description,
			in: 'formData',
			required: required || false,
			type: 'string'
		}]
	}),
	body: (schema: any, description?: string, name?: string, required?: boolean) => add({
		parameters: [{
			description,
			schema,
			in: 'body',
			name: name || 'body',
			required: required || false,
		}]
	}),
	path: (name: string, description?: string, example?: string) => add({
		parameters: [{
			name,
			description,
			in: 'path',
			required: true,
			schema: {
				type: 'string',
				example: example || ''
			}
		}]
	}),
};
