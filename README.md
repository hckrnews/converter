# @hckrnews/converter
Convert files.

If you want convert files, you can do it with this script.

## Installation

    npm install @hckrnews/converter

Debian/Ubuntu:

    sudo apt install imagemagick ghostscript

## Example usage

```
import Converter from '../src/converter.js';

const converter = Converter.create({
    file:  'test/xyz.pdf',
    output: 'output/',
    sync: true
});

const result = converter.convert();
```

## Props

file: path to the file.

output: Output folder.

customConverter: name of the binary to run instead of `cp` (e.g. `convert`). It is executed without a shell and receives the input and output paths as arguments, so it must not contain flags or shell syntax.


## Test the package.

```
npm test
```

This will run all the tests in the test folder with mocha.

If you only want to check the eslint rules, just run.

```
npm run lint
```
