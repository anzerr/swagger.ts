import { Server } from 'http.ts';
export default class SwaggerDocument {
    private _document;
    constructor();
    withServer(server: Server): SwaggerDocument;
    setTitle(title: string): SwaggerDocument;
    setDescription(description: string): SwaggerDocument;
    setVersion(version: string): SwaggerDocument;
    addTag(tag: string): SwaggerDocument;
    build(): any;
    toJson(): any;
}
