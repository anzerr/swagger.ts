import { Server } from 'http.ts';
export default class SwaggerDocument {
    private _document;
    constructor();
    withServer(server: Server): SwaggerDocument;
    package(json: any): SwaggerDocument;
    toJson(): any;
}
