import fs from 'fs';

const exists = (path) => {
    return fs.existsSync(path);
};

const folderExists = (path) => {
    if(!exists(path)) {
        return false;
    }

    return fs.statSync(path).isDirectory();
};

const fileExists = (path) => {
    if(!exists(path)) {
        return false;
    }

    return fs.statSync(path).isFile();
};

const getFileName = (path) => {
    return path.split('/').pop();
};

const copyFile = (from, to) => {
    if (!fileExists(from)) {
        return false;
    }

    return fs.copyFileSync(from, to);
};
const deleteFile = (path) => {
    if (!fileExists(path)) {
        return false;
    }

    return fs.unlinkSync(path);
};

export {
    exists,
    folderExists,
    fileExists,
    getFileName,
    deleteFile,
    copyFile
};
