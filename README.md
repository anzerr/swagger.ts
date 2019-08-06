
### `Intro`
Add swagger decorator to build the swagger.json in the controller.

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/swagger.ts.git
```

### `Example`
``` javascript
import 'reflect-metadata';
import {Swagger, SwaggerDocument, Meta} from 'swagger.ts';
import {Server, Controller, Get} from 'http.ts';
import {Injectable, Inject, Module} from 'inject.ts';

@Controller('user')
class Test extends Server.Controller {

	@Get()
	list() {
		this.res.status(200).send('1');
	}

	@Put()
	@Meta.responses(200, 'create/update')
	@Meta.responses(400, 'wrong param sent in body')
	@Meta.responses(500, 'something wen\'t wrong')
	@Meta.param.body({
		type: 'object',
		required: ['users'],
		properties: {
			users: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						name: {type: 'string'},
						password: {type: 'string'}
						code: {type: 'number'}
					}
				}
			}
		}
	})
	create() {
		this.res.status(200).send('3');
	}

}

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger, Controller]);

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	return s;
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
```