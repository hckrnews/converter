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

customConverter: set a custom converter


## Test the package.

```
npm test
```

This will run all the tests in the test folder with mocha.

If you only want to check the eslint rules, just run.

```
npm run lint
```
