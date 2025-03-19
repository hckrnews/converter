// eslint-disable-next-line n/no-unsupported-features/node-builtins
import test from 'node:test'
import assert from 'node:assert'
import File from '../file.js'

test('Converter file model test', async (t) => {
  await t.test('It should generate the file model', () => {
    const file = File.create({
      filePath: 'test/OPW 733 Tienduizend redenen.pdf'
    })

    assert.strictEqual(file.path, 'test/OPW 733 Tienduizend redenen.pdf')
    assert.strictEqual(file.directory, 'test')
    assert.strictEqual(file.base, 'OPW 733 Tienduizend redenen.pdf')
    assert.strictEqual(file.extension, '.pdf')
    assert.strictEqual(file.name, 'OPW 733 Tienduizend redenen')
  })

  await t.test(
    'It should throw an error if the pathpath doesnt exists',
    () => {
      try {
        File.create({
          filePath: '42'
        })
      } catch (error) {
        assert.strictEqual(error.message, 'File path doesnt exists')
      }
    }
  )

  await t.test(
    'It should throw an error if the pathpath isnt a string',
    () => {
      try {
        File.create({
          filePath: 42
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'File path should be a string'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the pathpath isnt a string 2',
    () => {
      try {
        File.create({
          filePath: 'output/'
        })
      } catch (error) {
        assert.strictEqual(error.message, 'File path doesnt exists')
      }
    }
  )
})
