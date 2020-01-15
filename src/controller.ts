
import {Server, Controller, Get} from 'http.ts';
import * as fs from 'fs.promisify';
import * as path from 'path';
import page from './page';
import util from './util';
import {METADATA} from './enum';

@Controller()
export default class Swagger extends Server.Controller {

	static _data: Buffer = null;
	static json: any = {};

	static compressIndex: Buffer = null;
	static indexPage: string = null;
	static source = METADATA.SOURCE;

	@Get()
	index(): any {
		return util.cache(this, 'index', 'html', () => {
			return page('./swagger', {url: './swagger.json'});
		});
	}

	@Get('swagger/:file')
	css(): any {
		const file = this.param.file;
		if (Swagger.source[file]) {
			const p = path.join(__dirname, `../swagger/${file}`);
			return fs.access(p).then(() => {
				return this.status(200).set({
					'Content-Type': this.response.type(path.extname(file))
				}).pipe(fs.createReadStream(p));
			}).catch(() => {
				return this.status(404).send('');
			})
		}
		return this.status(404).send('');
	}

	@Get('swagger.json')
	json(): any {
		return util.cache(this, 'swagger', 'json', () => {
			return JSON.stringify(Swagger.json);
		});
	}

}
