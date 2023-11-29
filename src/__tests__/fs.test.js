import test from 'node:test';
import assert from 'node:assert';
import {
    exists,
    folderExists,
    fileExists,
    copyFile,
    deleteFile,
} from '../fs.js';

const expectTestCases = [
    {
        description: 'It should return true for the exists and fileExists',
        input: 'test/OPW 733 Tienduizend redenen.pdf',
        expectedExists: true,
        expectedFolderExists: false,
        expectedFileExists: true,
    },
    {
        description: 'It should return true for the exists and folderExists',
        input: 'output/',
        expectedExists: true,
        expectedFolderExists: true,
        expectedFileExists: false,
    },
    {
        description: 'It should return false for all methods',
        input: 'unknownfolder/',
        expectedExists: false,
        expectedFolderExists: false,
        expectedFileExists: false,
    },
];

test('FS helper test', async (t) => {
    await Promise.all(
        expectTestCases.map(
            async ({
                description,
                input,
                expectedExists,
                expectedFolderExists,
                expectedFileExists,
            }) => {
                await t.test(description, () => {
                    assert.strictEqual(exists(input), expectedExists);
                    assert.strictEqual(
                        folderExists(input),
                        expectedFolderExists
                    );
                    assert.strictEqual(fileExists(input), expectedFileExists);
                });
            }
        )
    );
});

test('FS helper test', async (t) => {
    await t.test('It should copy the file', () => {
        const fromFile = 'test/OPW 733 Tienduizend redenen.pdf';
        const toFile = 'output/test.pdf';

        assert.strictEqual(fileExists(fromFile), true);
        assert.strictEqual(fileExists(toFile), false);
        copyFile(fromFile, toFile);
        assert.strictEqual(fileExists(fromFile), true);
        assert.strictEqual(fileExists(toFile), true);
    });

    await t.test('It should return false if the file doesnt exists', () => {
        const fromFile = 'test/test.pdf';
        const toFile = 'output/test.pdf';

        assert.strictEqual(fileExists(fromFile), false);
        assert.strictEqual(copyFile(fromFile, toFile), false);
    });

    await t.test('It should remove the file', () => {
        const exampleFile = 'output/test.pdf';

        assert.strictEqual(fileExists(exampleFile), true);
        deleteFile(exampleFile);
        assert.strictEqual(fileExists(exampleFile), false);
    });

    await t.test('It should return false if the file doesnt exists', () => {
        const exampleFile = 'output/test.pdf';

        assert.strictEqual(fileExists(exampleFile), false);
        assert.strictEqual(deleteFile(exampleFile), false);
    });
});
