import { exec, execSync } from 'node:child_process';
import File from './file.js';
import { folderExists, fileExists, getFileName } from './fs.js';

/**
 * @typedef {object} ConvertResult
 * @property {File} file
 * @property {string} fileName
 * @property {Buffer|string} output
 */

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
        this.sync = true;
    }

    /**
     * Get the converter.
     * @returns {string}
     */
    get converter() {
        if (this.customConverter) {
            return this.customConverter;
        }

        return 'cp';
    }

    /**
     * Set the sync
     * @param {boolean} sync
     */
    setSync(sync) {
        if (sync.constructor !== Boolean) {
            throw new Error('Sync should be a boolean');
        }

        this.sync = sync;
    }

    /**
     * Set the custom converter.
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
     * @param {string} file
     */
    setFile(file) {
        if (!file || file.constructor !== String) {
            throw new Error('File should be a string');
        }

        this.oldFile = File.create({
            filePath: file,
        });
    }

    /**
     * Set the output path
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
     * @returns {string}
     */
    get newFile() {
        return this.output + this.oldFile.name + this.oldFile.extension;
    }

    /**
     * Get the exec path
     * @returns {string}
     */
    get execPath() {
        return `${this.converter} "${this.oldFile.path}" "${this.newFile}"`;
    }

    /**
     * Get the convert method
     * @returns {Function}
     */
    get convertMethod() {
        return this.sync ? execSync : exec;
    }

    /**
     * Convert pdf files to png files.
     * @returns {ConvertResult}
     */
    convert() {
        const fileName = getFileName(this.oldFile.path);

        const output = this.convertMethod(this.execPath);

        return {
            file: this.oldFile,
            fileName,
            output,
        };
    }

    /**
     * Create the converter
     * @param {object} params
     * @param {string} params.file
     * @param {string} params.output
     * @param {string=} params.customConverter
     * @param {boolean=} params.sync
     * @returns {Converter}
     */
    static create({ file, output, customConverter, sync = true }) {
        const converter = new Converter();

        converter.setSync(sync);
        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default Converter;
export { Converter, File, folderExists, fileExists, getFileName };
