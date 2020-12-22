import {
    fileExists
} from './fs.js';
import path from 'path';

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
     * @param {string} path
     */
    setPath(path) {
        if (!path || path.constructor !== String) {
            throw new Error('File path should be a string');
        }

        if (!fileExists(path)) {
            throw new Error('File path doesnt exists');
        }

        this.path = path;
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
    static create({
        filePath
    }) {
        const file = new File();

        file.setPath(filePath);

        return file;
    }
}

export default File;
