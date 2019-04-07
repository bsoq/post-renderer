const packageJson = require('../package.json');
const path = require('path');
const rollup = require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var handlebars = require('rollup-plugin-handlebars-plus');

const projectRoot = path.join(__dirname, '..');
const dest = path.join(projectRoot, 'dest');

function makeValidName(name) {
    return name.replace(/-([A-z])/g, ($0, $1) => {
        return $1.toUpperCase();
    });
}

const inputOptions = {
    input: path.join(projectRoot, 'src', 'index.js'),
    plugins: [
        nodeResolve(),
        commonjs({
            include: 'node_modules/**',
        }),
        handlebars({
            handlebars: {
                options: {
                    sourceMap: false
                }
            }
        })
    ]
};
const outputOptions = {
    name: makeValidName(packageJson.name),
    file: path.join(dest, 'bundle.js'),
    format: 'umd'
};

async function build() {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

build();
