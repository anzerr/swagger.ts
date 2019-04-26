
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import Swagger from './src/controller';
import SwaggerDocument from './src/document';
import * as Meta from './src/meta';

@Controller('user')
class Test extends Server.Controller {
	@Get()
	@Meta.param.query('name')
	@Meta.tag('get')
	list() {
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
	create() {
		return this.data().then((res) => {
			return res;
		});
	}

	@Get('error')
	@Meta.description('endpoint to throw errors')
	@Meta.responses(500, 'valid response')
	error() {
		throw new Error('cat');
	}

	@Get(':id')
	@Meta.responses(200, 'valid test')
	@Meta.responses(405, 'invalid params')
	@Meta.description('get users')
	@Meta.param.query('version', 'versionRef')
	getUser() {
		return {
			id: this.param.id,
			type: 'getUser ' + this.query.version
		};
	}

	@Get(':id/json')
	getFriendsJson() {
		this.status(200).json([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	}

	@Get(':id/friends')
	getFriends() {
		this.status(200).send('3');
	}

}

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger, Test]);

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	console.log('started');
}).catch(console.log);
