
import 'reflect-metadata';
import {Server, Controller, Get} from 'http.ts';
import * as fs from 'fs';
import * as path from 'path';
import page from './page';
import {METADATA} from './enum';

@Controller()
export default class Swagger extends Server.Controller {

	static json = {}; // require('./swagger.json');
	static indexPage = '';
	static source = METADATA.SOURCE;

	@Get()
	index(): any {
		if (!Swagger.indexPage) {
			Swagger.indexPage = page('./swagger', {url: './swagger.json'});
		}
		return this.status(200).set({
			'Content-Type': this.response.type('html')
		}).send(Swagger.indexPage);
	}

	@Get('swagger/:file')
	css(): any {
		const file = this.param.file;
		if (Swagger.source[file]) {
			return this.status(200).set({
				'Content-Type': this.response.type(path.extname(file))
			}).pipe(fs.createReadStream(path.join(__dirname, `../swagger/${file}`)));
		}
		return this.status(404).send('');
	}

	@Get('swagger.json')
	json(): any {
		return this.status(200).json(Swagger.json);
	}

}
