
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import {Injectable, Inject, Module} from 'inject.ts';
import * as fs from 'fs.promisify';
import * as path from 'path';
import page from './page';

@Controller()
export default class Swagger extends Server.Controller {
	static json = require('./swagger.json');
	static indexPage: string = '';
	static source = {
		'swagger-ui.css': true,
		'favicon-32x32.png': true,
		'favicon-64x64.png': true,
		'swagger-ui-bundle.js': true,
		'swagger-ui-standalone-preset.js': true,
		'swagger-ui-standalone-preset.js.map': true
	};

	@Get()
	index() {
		if (!Swagger.indexPage) {
			Swagger.indexPage = page('./swagger', {url: './swagger.json'});
		}
		return this.status(200).set({
			'Content-Type': this.response.type('html')
		}).send(Swagger.indexPage);
	}

	@Get('swagger/:file')
	css() {
		const file = this.param.file;
		if (Swagger.source[file]) {
			return this.status(200).set({
				'Content-Type': this.response.type(path.extname(file))
			}).pipe(fs.createReadStream(path.join(__dirname, `../swagger/${file}`)));
		}
		return this.status(404).send('');
	}

	@Get('swagger.json')
	json() {
		return this.status(200).json(Swagger.json);
	}

}
