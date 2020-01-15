/// <reference types="node" />
import { Server } from 'http.ts';
export default class Swagger extends Server.Controller {
    static _data: Buffer;
    static json: any;
    static compressIndex: Buffer;
    static indexPage: string;
    static source: {
        'swagger-ui.css': boolean;
        'swagger-ui.css.map': boolean;
        'swagger-ui.js': boolean;
        'swagger-ui.js.map': boolean;
        'favicon-32x32.png': boolean;
        'favicon-64x64.png': boolean;
        'swagger-ui-bundle.js': boolean;
        'swagger-ui-bundle.js.map': boolean;
        'swagger-ui-standalone-preset.js': boolean;
        'swagger-ui-standalone-preset.js.map': boolean;
    };
    index(): any;
    css(): any;
    json(): any;
}
