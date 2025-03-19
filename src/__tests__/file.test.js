// eslint-disable-next-line n/no-unsupported-features/node-builtins
import test from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import File from '../file.js'

const testFilePath = path.join('test', 'OPW 733 Tienduizend redenen.pdf')

test('Converter file model test', async (t) => {
  await t.test('It should generate the file model', () => {
    const file = File.create({
      filePath: testFilePath
    })

    assert.strictEqual(file.path, testFilePath)
    assert.strictEqual(file.directory, path.dirname(testFilePath))
    assert.strictEqual(file.base, path.basename(testFilePath))
    assert.strictEqual(file.extension, path.extname(testFilePath))
    assert.strictEqual(file.name, path.basename(testFilePath, path.extname(testFilePath)))
  })

  await t.test('It should throw an error if the file path doesnt exist', () => {
    try {
      File.create({
        filePath: '42'
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File path doesnt exist')
    }
  })

  await t.test('It should throw an error if the file path isnt a string', () => {
    try {
      File.create({
        filePath: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File path should be a string')
    }
  })

  await t.test('It should throw an error if the file path isnt a string 2', () => {
    try {
      File.create({
        filePath: path.join('output', '')
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File path doesnt exist')
    }
  })
})
