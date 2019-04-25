
import * as fs from 'fs.promisify';
import * as path from 'path';
import {Server} from 'http.ts';
import Swagger from './controller';
import { METADATA } from './enum';

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
		this._document = {
			swagger: '2.0',
			info: {
				title: json.name || 'mising',
				description: json.description  || 'mising',
				version: json.version  || 'mising',
				license: {
					name: 'Apache 2.0',
					url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
				}
			},
			host: 'localhost',
			basePath: '/',
			tags: [],
			schemes: ['https', 'http'],
			paths: {
				/*'/pet': {
					post: {
						tags: ['pet'],
						summary: 'Add a new pet to the store',
						description: '',
						operationId: 'addPet',
						consumes: ['application/json', 'application/xml'],
						produces: ['application/xml', 'application/json'],
						parameters: [{
							in: 'body',
							name: 'body',
							description: 'Pet object that needs to be added to the store',
							required: true,
							schema: {
								$ref: '#/definitions/Pet'
							}
						}],
						responses: {
							405: {
								description: 'Invalid input'
							}
						},
						security: [{
							petstore_auth: ['write:pets', 'read:pets']
						}]
					}
				}*/
			}
		};
	}

	withServer(server: Server): SwaggerDocument {
		const s: any = server, map = s.map;
		this._document.host = `localhost:${s.port}`;
		for (const i in map) {
			for (const x in map[i]) {
				if (map[i][x].class !== Swagger) {
					const path = map[i][x].path, param = path.match(/\{\w+\}/g);
					if (!this._document.paths[path]) {
						this._document.paths[path] = {};
					}
					const meta = Reflect.getMetadata(METADATA.SWAGGER, map[i][x].instance[map[i][x].action]);
					const doc = {description: '', responses: {200: {description: 'valid response'}}, parameters: []};
					for (const i in param) {
						doc.parameters.push({
							name: param[i].substr(1, param[i].length - 2),
							in: 'path',
							required: true,
							type: 'integer',
							format: 'int64'
						});
					}

					this._document.paths[path][i] = {...doc, ...meta};
				}
			}
		}
		return this;
	}

	package(json: any): SwaggerDocument {
		this._document.info.title = json.name || 'mising';
		this._document.info.description = json.description || 'mising';
		this._document.info.version = json.version || 'mising';
		return this;
	}

	toJson(): any {
		return this._document;
	}

}
