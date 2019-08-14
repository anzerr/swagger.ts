
import * as fs from 'fs.promisify';
import * as path from 'path';
import {Server} from 'http.ts';
import Swagger from './controller';
import { METADATA } from './enum';
import merge from './util';

export default class SwaggerDocument {

	private _document: any;

	constructor() {
		let base = process.cwd(), json: any = {};
		for (let i = 0; i < 5; i++) {
			try {
				json = JSON.parse(fs.readFileSync(path.join(base, 'package.json')).toString());
				break;
			} catch (e) {
				base = path.join(base, '..');
			}
		}
		const license = (json.license && json.homepage);
		this._document = {
			swagger: '2.0',
			info: {
				title: json.name || 'mising',
				description: json.description  || '',
				version: json.version  || 'mising',
				license: {
					name: (license ? json.license : '') || 'Apache 2.0',
					url: license ? json.homepage.replace('#readme', '/blob/master/LICENSE') : 'http://www.apache.org/licenses/LICENSE-2.0.html'
				}
			},
			// host: 'localhost',
			basePath: '/',
			schemes: ['http'],
			paths: {}
		};
	}

	withServer(server: Server): SwaggerDocument {
		const s: any = server, map = s.map;
		// this._document.host = `localhost:${s.port}`;
		for (const i in map) {
			for (const x in map[i]) {
				if (map[i][x].class !== Swagger) {
					const path = map[i][x].path, param = path.match(/\{\w+\}/g);
					if (!this._document.paths[path]) {
						this._document.paths[path] = {};
					}
					const meta = Reflect.getMetadata(METADATA.SWAGGER, map[i][x].instance[map[i][x].action]);
					const doc = {
						consumes: ['application/json'],
						produces: ['application/json'],
						description: '',
						responses: {200: {description: 'valid response'}},
						parameters: []
					};
					for (const i in param) {
						const name = param[i].substr(1, param[i].length - 2);
						let found = false;
						for (const x in doc.parameters) {
							if (doc.parameters[x].name === name) {
								found = true;
								break;
							}
						}
						if (found) {
							doc.parameters.push({
								name,
								in: 'path',
								required: true,
								type: 'string'
							});
						}
					}

					this._document.paths[path][i] = merge(doc, meta);
				}
			}
		}
		return this;
	}

	setTitle(title: string): SwaggerDocument {
		this._document.info.title = title;
		return this;
	}

	setDescription(description: string): SwaggerDocument {
		this._document.info.description = description;
		return this;
	}

	setVersion(version: string): SwaggerDocument {
		this._document.info.version = version;
		return this;
	}

	addTag(tag: string): SwaggerDocument {
		this._document.info.tag = Array.isArray(tag) ? tag : [tag];
		return this;
	}

	build(): any {
		return this._document;
	}

	toJson(): any {
		return this.build();
	}

}
