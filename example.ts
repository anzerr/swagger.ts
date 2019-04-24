
import 'reflect-metadata';
import {Server, Controller, Get, Post} from 'http.ts';
import Swagger from './src/controller';

const s = new Server(3000)
	.withController([Swagger]);

s.start().then(() => {
	console.log('started');
});
