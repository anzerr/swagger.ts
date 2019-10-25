
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import {FormPipe} from 'form.pipe';
import * as fs from 'fs';
import * as path from 'path';
import Swagger from './src/controller';
import SwaggerDocument from './src/document';
import * as Meta from './src/meta';
import {Writable} from 'stream';

const write = (): Writable => {
	return new Writable({
		objectMode: true,
		write: function(file, encoding, callback) {
			file.stream.pipe(fs.createWriteStream(path.join(__dirname, file.filename))).on('close', () => {
				callback();
			});
		}
	});
};

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
	@Meta.responses(200, 'valid test', {
		type: 'object',
		properties: {
			id: {type: 'string', description: 'cat', example: 'her'},
			type: {type: 'string', description: 'dog', example: 'getUser version: "test"'}
		}
	})
	@Meta.param.path('id', 'id of the given user', 'cat')
	@Meta.responses(405, 'invalid params')
	@Meta.description('get users')
	@Meta.param.query('version', 'versionRef', 'test')
	getUser(): {id: string; type: string} {
		return {
			id: this.param.id,
			type: `getUser version: "${this.query.version}"`
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
	@Meta.param.formData('afile', 'file to upload', {type: 'file', format: 'binary'})
	@Meta.param.formData('bfile', 'file to upload', {type: 'file', format: 'binary'})
	import(): any {
		this.pipe(new FormPipe()).pipe(write()).once('finish', () => {
			this.status(200).send('done');
		});
	}

}

const document = new SwaggerDocument();

const s = new Server(3123)
	.withController([Swagger, Test]);

s.on('error', (err) => {
	console.log('request error', err);
});

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	console.log('started on port "3123"');
}).catch(console.log);
