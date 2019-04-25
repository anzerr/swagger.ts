"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs.promisify");
const path = require("path");
const controller_1 = require("./controller");
const enum_1 = require("./enum");
class SwaggerDocument {
    constructor() {
        let base = process.cwd(), json = {};
        for (let i = 0; i < 5; i++) {
            try {
                json = JSON.parse(fs.readFileSync(path.join(base, 'package.json')).toString());
                break;
            }
            catch (e) {
                base = path.join(base, '..');
            }
        }
        this._document = {
            swagger: '2.0',
            info: {
                title: json.name || 'mising',
                description: json.description || 'mising',
                version: json.version || 'mising',
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
    withServer(server) {
        const s = server, map = s.map;
        this._document.host = `localhost:${s.port}`;
        for (const i in map) {
            for (const x in map[i]) {
                if (map[i][x].class !== controller_1.default) {
                    const path = map[i][x].path, param = path.match(/\{\w+\}/g);
                    if (!this._document.paths[path]) {
                        this._document.paths[path] = {};
                    }
                    const meta = Reflect.getMetadata(enum_1.METADATA.SWAGGER, map[i][x].instance[map[i][x].action]);
                    const doc = { description: '', responses: { 200: { description: 'valid response' } }, parameters: [] };
                    for (const i in param) {
                        doc.parameters.push({
                            name: param[i].substr(1, param[i].length - 2),
                            in: 'path',
                            required: true,
                            type: 'integer',
                            format: 'int64'
                        });
                    }
                    this._document.paths[path][i] = Object.assign({}, doc, meta);
                }
            }
        }
        return this;
    }
    package(json) {
        this._document.info.title = json.name || 'mising';
        this._document.info.description = json.description || 'mising';
        this._document.info.version = json.version || 'mising';
        return this;
    }
    toJson() {
        return this._document;
    }
}
exports.default = SwaggerDocument;
//# sourceMappingURL=document.js.map