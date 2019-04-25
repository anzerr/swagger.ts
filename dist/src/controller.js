"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Swagger_1;
require("reflect-metadata");
const http_ts_1 = require("http.ts");
const fs = require("fs.promisify");
const path = require("path");
const page_1 = require("./page");
const enum_1 = require("./enum");
let Swagger = Swagger_1 = class Swagger extends http_ts_1.Server.Controller {
    index() {
        if (!Swagger_1.indexPage) {
            Swagger_1.indexPage = page_1.default('./swagger', { url: './swagger.json' });
        }
        return this.status(200).set({
            'Content-Type': this.response.type('html')
        }).send(Swagger_1.indexPage);
    }
    css() {
        const file = this.param.file;
        if (Swagger_1.source[file]) {
            return this.status(200).set({
                'Content-Type': this.response.type(path.extname(file))
            }).pipe(fs.createReadStream(path.join(__dirname, `../swagger/${file}`)));
        }
        return this.status(404).send('');
    }
    json() {
        return this.status(200).json(Swagger_1.json);
    }
};
Swagger.json = {}; // require('./swagger.json');
Swagger.indexPage = '';
Swagger.source = enum_1.METADATA.SOURCE;
__decorate([
    http_ts_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Swagger.prototype, "index", null);
__decorate([
    http_ts_1.Get('swagger/:file'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Swagger.prototype, "css", null);
__decorate([
    http_ts_1.Get('swagger.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Swagger.prototype, "json", null);
Swagger = Swagger_1 = __decorate([
    http_ts_1.Controller()
], Swagger);
exports.default = Swagger;
//# sourceMappingURL=controller.js.map