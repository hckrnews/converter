import path from 'node:path'
import { fileExists } from './fs.js'

/**
 * File model
 */
class File {
  /**
   * Define the path
   */
  constructor () {
    this.path = null
  }

  /**
   * Set the path
   * @param {string} filePath
   */
  setPath (filePath) {
    if (!filePath || filePath.constructor !== String) {
      throw new Error('File path should be a string')
    }

    if (!fileExists(filePath)) {
      throw new Error('File path doesn\'t exist')
    }

    this.path = filePath
  }

  /**
   * Get the file info.
   * @returns {object}
   */
  get info () {
    return path.parse(this.path)
  }

  /**
   * Get the file directory.
   * @returns {string}
   */
  get directory () {
    return this.info.dir
  }

  /**
   * Get the file extension.
   * @returns {string}
   */
  get extension () {
    return this.info.ext
  }

  /**
   * Get the file name.
   * @returns {string}
   */
  get base () {
    return this.info.base
  }

  /**
   * Get the file name.
   * @returns {string}
   */
  get name () {
    return this.info.name
  }

  /**
   * Create a file model
   * @param {object} params
   * @param {string} params.filePath
   * @returns {object}
   */
  static create ({ filePath }) {
    const file = new File()

    file.setPath(filePath)

    return file
  }
}

export default File
