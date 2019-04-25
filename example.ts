
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import Swagger from './src/controller';
import SwaggerDocument from './src/document';
import * as Meta from './src/meta';

@Controller('user')
class Test extends Server.Controller {
	@Get()
	list() {
		return `cat_${this.query.name || ''}`;
	}

	@Post()
	create() {
		return this.data().then((res) => {
			return res;
		});
	}

	@Get('error')
	error() {
		throw new Error('cat');
	}

	@Get(':id')
	@Meta.responses(200, 'valid test')
	@Meta.responses(405, 'invalid params')
	getUser() {
		return {
			id: this.param.id,
			type: 'getUser'
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
