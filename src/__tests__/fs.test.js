// eslint-disable-next-line n/no-unsupported-features/node-builtins
import test from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import {
  copyFile,
  deleteFile,
  exists,
  fileExists,
  folderExists
} from '../fs.js'

const expectTestCases = [
  {
    description: 'It should return true for the exists and fileExists',
    input: path.join('test', 'OPW 733 Tienduizend redenen.pdf'),
    expectedExists: true,
    expectedFolderExists: false,
    expectedFileExists: true
  },
  {
    description: 'It should return true for the exists and folderExists',
    input: path.join('output'),
    expectedExists: true,
    expectedFolderExists: true,
    expectedFileExists: false
  },
  {
    description: 'It should return false for all methods',
    input: path.join('unknownfolder'),
    expectedExists: false,
    expectedFolderExists: false,
    expectedFileExists: false
  }
]

test('FS helper test', async (t) => {
  await Promise.all(
    expectTestCases.map(
      async ({
        description,
        input,
        expectedExists,
        expectedFolderExists,
        expectedFileExists
      }) => {
        await t.test(description, () => {
          assert.strictEqual(exists(input), expectedExists)
          assert.strictEqual(
            folderExists(input),
            expectedFolderExists
          )
          assert.strictEqual(fileExists(input), expectedFileExists)
        })
      }
    )
  )
})

test('FS helper test', async (t) => {
  await t.test('It should copy the file', () => {
    const fromFile = path.join('test', 'OPW 733 Tienduizend redenen.pdf')
    const toFile = path.join('output', 'test.pdf')

    assert.strictEqual(fileExists(fromFile), true)
    assert.strictEqual(fileExists(toFile), false)
    copyFile(fromFile, toFile)
    assert.strictEqual(fileExists(fromFile), true)
    assert.strictEqual(fileExists(toFile), true)
  })

  await t.test('It should return false if the file doesnt exists', () => {
    const fromFile = path.join('test', 'test.pdf')
    const toFile = path.join('output', 'test.pdf')

    assert.strictEqual(fileExists(fromFile), false)
    assert.strictEqual(copyFile(fromFile, toFile), false)
  })

  await t.test('It should remove the file', () => {
    const exampleFile = path.join('output', 'test.pdf')

    assert.strictEqual(fileExists(exampleFile), true)
    deleteFile(exampleFile)
    assert.strictEqual(fileExists(exampleFile), false)
  })

  await t.test('It should return false if the file doesnt exists', () => {
    const exampleFile = path.join('output', 'test.pdf')

    assert.strictEqual(fileExists(exampleFile), false)
    assert.strictEqual(deleteFile(exampleFile), false)
  })
})
