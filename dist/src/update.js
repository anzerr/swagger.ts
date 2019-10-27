"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs.promisify");
const fs_remove_1 = require("fs.remove");
const child_process_1 = require("child_process");
const path = require("path");
const run = (cmd, o) => {
    return new Promise((resolve) => {
        const ls = child_process_1.spawn('sh', ['-c', cmd], o);
        ls.stdout.pipe(process.stdout);
        ls.stderr.pipe(process.stdout);
        ls.on('close', resolve);
    });
};
const dir = path.join(__dirname, '../swagger'), key = Math.random().toString(36).substr(2);
Promise.all([
    fs_remove_1.default(dir),
    fs_remove_1.default(path.join(__dirname, `../${key}`))
]).then(() => {
    return run(`git clone https://github.com/anzerr/swagger-ui.git ${key}`, { cwd: path.join(__dirname, '../') });
}).then(() => {
    return fs.rename(path.join(__dirname, `../${key}/dist`), dir);
}).then(() => {
    return Promise.all([
        fs_remove_1.default(path.join(__dirname, `../${key}`)),
        fs_remove_1.default(path.join(dir, 'index.html')),
        fs_remove_1.default(path.join(dir, 'oauth2-redirect.html'))
    ]);
}).catch((e) => {
    throw e;
});
//# sourceMappingURL=update.js.map