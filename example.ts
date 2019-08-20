
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import * as fs from 'fs';
import Swagger from './src/controller';
import SwaggerDocument from './src/document';
import * as Meta from './src/meta';

@Controller('user')
class Test extends Server.Controller {

	@Get()
	@Meta.param.query('name')
	@Meta.tag('get')
	list(): string {
		return `cat_${this.query.name || ''}`;
	}

	@Post()
	@Meta.param.body({
		type: 'object',
		required: ['shard', 'key'],
		properties: {
			shard: {type: 'string'},
			key: {type: 'string'}
		}
	})
	create(): Promise<{shard: string; key: string}[]> {
		return this.data().then((res) => {
			return res;
		});
	}

	@Get('error')
	@Meta.description('endpoint to throw errors')
	@Meta.responses(500, 'valid response')
	error(): void {
		throw new Error('cat');
	}

	@Get(':id')
	@Meta.responses(200, 'valid test')
	@Meta.responses(405, 'invalid params')
	@Meta.description('get users')
	@Meta.param.query('version', 'versionRef')
	getUser(): {id: string; type: string} {
		return {
			id: this.param.id,
			type: 'getUser ' + this.query.version
		};
	}

	@Get(':id/json')
	getFriendsJson(): any {
		this.status(200).json([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	}

	@Get(':id/friends')
	getFriends(): any {
		this.status(200).send('3');
	}

	@Post('import')
	@Meta.param.formData('afile', 'file to upload', {type: 'file'})
	@Meta.param.formData('bfile', 'file to upload', {type: 'file'})
	import(): any {
		return this.data().then((res) => {
			fs.writeFileSync('out.dump', res);
			return this.status(200).send('4');
		});
	}

}

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger, Test]);

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	console.log('started');
}).catch(console.log);
