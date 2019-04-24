import 'reflect-metadata';
import { Server } from 'http.ts';
export default class Swagger extends Server.Controller {
    static json: {};
    static indexPage: string;
    static source: {
        'swagger-ui.css': boolean;
        'favicon-32x32.png': boolean;
        'favicon-64x64.png': boolean;
        'swagger-ui-bundle.js': boolean;
        'swagger-ui-standalone-preset.js': boolean;
        'swagger-ui-standalone-preset.js.map': boolean;
    };
    index(): any;
    css(): any;
    json(): any;
}
