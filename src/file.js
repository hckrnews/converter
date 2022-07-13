import path from 'path';
import { fileExists } from './fs.js';

/**
 * File model
 */
class File {
    /**
     * Define the path
     */
    constructor() {
        this.path = null;
    }

    /**
     * Set the path
     *
     * @param {string} filePath
     */
    setPath(filePath) {
        if (!filePath || filePath.constructor !== String) {
            throw new Error('File path should be a string');
        }

        if (!fileExists(filePath)) {
            throw new Error('File path doesnt exists');
        }

        this.path = filePath;
    }

    /**
     * Get the file info.
     *
     * @return {object}
     */
    get info() {
        return path.parse(this.path);
    }

    /**
     * Get the file directory.
     *
     * @return {string}
     */
    get directory() {
        return this.info.dir;
    }

    /**
     * Get the file extension.
     *
     * @return {string}
     */
    get extension() {
        return this.info.ext;
    }

    /**
     * Get the file name.
     *
     * @return {string}
     */
    get base() {
        return this.info.base;
    }

    /**
     * Get the file name.
     *
     * @return {string}
     */
    get name() {
        return this.info.name;
    }

    /**
     * Create a file model
     *
     * @param {string} filePath
     *
     * @return {object}
     */
    static create({ filePath }) {
        const file = new File();

        file.setPath(filePath);

        return file;
    }
}

export default File;
