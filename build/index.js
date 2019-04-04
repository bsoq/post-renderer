const path = require('path');
const rollup = require('rollup');
const rollupPluginHtml = require('rollup-plugin-html');

const projectRoot = path.join(__dirname, '..');
const dest = path.join(projectRoot, 'dest');

const inputOptions = {
    input: path.join(projectRoot, 'src', 'index.js'),
    plugins: [
        rollupPluginHtml()
    ]
};
const outputOptions = {
    file: path.join(dest, 'bundle.js'),
    format: 'cjs'
};

async function build() {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

build();
