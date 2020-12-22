import File from './file.js';
import {
    folderExists,
    getFileName
} from './fs.js';
import {
    execSync
} from 'child_process';
import path from 'path';
import {
    platform
} from 'process';

/**
 * Converter
 */
class Converter {
    /**
     * Define the files array
     */
    constructor() {
        this.oldFile = null;
        this.output = null;
        this.customConverter = null;
    }

    /**
     * Get the converter.
     *
     * @return {string}
     */
    get converter() {
        if (this.customConverter) {
            return this.customConverter;
        }

        return 'cp';
    }

    /**
     * Set the custom converter.
     *
     * @param {string} converter
     */
    setConverter(converter) {
        if (!converter) {
            return;
        }

        if (converter.constructor !== String) {
            throw new Error('Converter should be a string');
        }

        this.customConverter = converter;
    }

    /**
     * Set the files
     *
     * @param {string} file
     */
    setFile(file) {
        if (!file || file.constructor !== String) {
            throw new Error('File should be a string');
        }

        this.oldFile = File.create({
            filePath: file
        });
    }

    /**
     * Set the output path
     *
     * @param {string} output
     */
    setOutput(output) {
        if (!output || output.constructor !== String) {
            throw new Error('Output should be a string');
        }

        if (!folderExists(output)) {
            throw new Error('Output folder doesnt exists');
        }

        this.output = output;
    }

    /**
     * Get the path of the new file.
     *
     * @return {string}
     */
    get newFile() {
        const fileInfo = path.parse(this.oldFile.path);

        return this.output + fileInfo.name + fileInfo.ext;
    }

    /**
     * Get the exec path
     *
     * @return {string}
     */
    get execPath() {
        return this.converter + ' "' + this.oldFile.path + '" "' + this.newFile + '"';
    }

    /**
     * Convert pdf files to png files.
     *
     * @return {array}
     */
    convert() {
        const fileName = getFileName(this.oldFile.path);

        const output = execSync(this.execPath);

        return {
            file: this.pdfFile,
            fileName,
            output
        };
    }

    /**
     * Create the converter
     *
     * @param {string} file
     * @param {string} output
     * @param {string} customConverter
     *
     * @return {object}
     */
    static create({
        file,
        output,
        customConverter
    }) {
        const converter = new Converter();

        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default Converter;
