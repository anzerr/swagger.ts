
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import Swagger from './src/controller';
import SwaggerDocument from './src/document';

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger]);

Swagger.json = document.toJson();

s.start().then(() => {
	console.log(s);
	console.log('started');
});
