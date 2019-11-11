const fs = require('fs');
// https://github.com/isaacs/node-glob
const glob = require('glob');

const output = {};

glob('apps/client/src/**/*.json', (error, files) => {
    files.forEach((filename) => {
        const contents = JSON.parse(fs.readFileSync(filename, 'utf8'));
        Object.assign(output, contents);
    });

    fs.writeFileSync('output.json', JSON.stringify(output, null, 4));
});
