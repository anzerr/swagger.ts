"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs.promisify");
const path = require("path");
const controller_1 = require("./controller");
const enum_1 = require("./enum");
const util_1 = require("./util");
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
        const license = (json.license && json.homepage);
        this._document = {
            swagger: '2.0',
            info: {
                title: json.name || 'mising',
                description: json.description || '',
                version: json.version || 'mising',
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
    withServer(server) {
        const s = server, map = s.map;
        // this._document.host = `localhost:${s.port}`;
        for (const i in map) {
            for (const x in map[i]) {
                if (map[i][x].class !== controller_1.default) {
                    const path = map[i][x].path, param = path.match(/\{\w+\}/g);
                    if (!this._document.paths[path]) {
                        this._document.paths[path] = {};
                    }
                    const meta = Reflect.getMetadata(enum_1.METADATA.SWAGGER, map[i][x].instance[map[i][x].action]);
                    const doc = {
                        consumes: ['application/json'],
                        produces: ['application/json'],
                        description: '',
                        responses: { 200: { description: 'valid response' } },
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
                    this._document.paths[path][i] = util_1.default(doc, meta);
                }
            }
        }
        return this;
    }
    setTitle(title) {
        this._document.info.title = title;
        return this;
    }
    setDescription(description) {
        this._document.info.description = description;
        return this;
    }
    setVersion(version) {
        this._document.info.version = version;
        return this;
    }
    addTag(tag) {
        this._document.info.tag = Array.isArray(tag) ? tag : [tag];
        return this;
    }
    build() {
        return this._document;
    }
    toJson() {
        return this.build();
    }
}
exports.default = SwaggerDocument;
//# sourceMappingURL=document.js.map