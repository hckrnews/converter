import fs from 'node:fs'
import path from 'node:path'

const exists = (filePath) => fs.existsSync(filePath)

const folderExists = (filePath) => {
  if (!exists(filePath)) {
    return false
  }

  return fs.statSync(filePath).isDirectory()
}

const fileExists = (filePath) => {
  if (!exists(filePath)) {
    return false
  }

  return fs.statSync(filePath).isFile()
}

const getFileName = (filePath) => path.basename(filePath)

const copyFile = (from, to) => {
  if (!fileExists(from)) {
    return false
  }

  return fs.copyFileSync(from, to)
}

const deleteFile = (filePath) => {
  if (!fileExists(filePath)) {
    return false
  }

  return fs.unlinkSync(filePath)
}

export { exists, folderExists, fileExists, getFileName, deleteFile, copyFile }
