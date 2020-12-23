import {
    exists,
    folderExists,
    fileExists,
    copyFile,
    deleteFile
} from '../fs.js';

const expectTestCases = [
    {
        description:          'It should return true for the exists and fileExists',
        input:                'test/OPW 733 Tienduizend redenen.pdf',
        expectedExists:       true,
        expectedFolderExists: false,
        expectedFileExists:   true
    },
    {
        description:          'It should return true for the exists and folderExists',
        input:                'output/',
        expectedExists:       true,
        expectedFolderExists: true,
        expectedFileExists:   false
    },
    {
        description:          'It should return false for all methods',
        input:                'unknownfolder/',
        expectedExists:       false,
        expectedFolderExists: false,
        expectedFileExists:   false
    }
];

describe.each(expectTestCases)(
    'FS helper test',
    ({
        description, input, expectedExists, expectedFolderExists, expectedFileExists
    }) => {
        it(description, () => {
            expect(exists(input)).toBe(expectedExists);
            expect(folderExists(input)).toBe(expectedFolderExists);
            expect(fileExists(input)).toBe(expectedFileExists);
        });
    }
);
describe('FS helper test', () => {
    it('It should copy the file', () => {
        const fromFile = 'test/OPW 733 Tienduizend redenen.pdf';
        const toFile = 'output/test.pdf';

        expect(fileExists(fromFile)).toBe(true);
        expect(fileExists(toFile)).toBe(false);
        copyFile(fromFile, toFile);
        expect(fileExists(fromFile)).toBe(true);
        expect(fileExists(toFile)).toBe(true);
    });

    it('It should return false if the file doesnt exists', () => {
        const fromFile = 'test/test.pdf';
        const toFile = 'output/test.pdf';

        expect(fileExists(fromFile)).toBe(false);
        expect(copyFile(fromFile, toFile)).toBe(false);
    });

    it('It should remove the file', () => {
        const exampleFile = 'output/test.pdf';

        expect(fileExists(exampleFile)).toBe(true);
        deleteFile(exampleFile);
        expect(fileExists(exampleFile)).toBe(false);
    });

    it('It should return false if the file doesnt exists', () => {
        const exampleFile = 'output/test.pdf';

        expect(fileExists(exampleFile)).toBe(false);
        expect(deleteFile(exampleFile)).toBe(false);
    });
});
