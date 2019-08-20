
import * as fs from 'fs.promisify';
import * as remove from 'fs.remove';
import {spawn} from 'child_process';
import * as path from 'path';

const run = (cmd, o): Promise<void> => {
	return new Promise((resolve) => {
		const ls = spawn('sh', ['-c', cmd], o);
		ls.stdout.pipe(process.stdout);
		ls.stderr.pipe(process.stdout);
		ls.on('close', resolve);
	});
};

const dir = path.join(__dirname, '../swagger'),
	key = Math.random().toString(36).substr(2);

Promise.all([
	remove(dir),
	remove(path.join(__dirname, `../${key}`))
]).then(() => {
	return run(`git clone https://github.com/anzerr/swagger-ui.git ${key}`, {cwd: path.join(__dirname, '../')});
}).then(() => {
	return fs.rename(path.join(__dirname, `../${key}/dist`), dir);
}).then(() => {
	remove(path.join(__dirname, `../${key}`));
}).catch((e) => {
	throw e;
});
