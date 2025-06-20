/* eslint-disable sonarjs/no-duplicate-string */

import test from 'node:test'
import assert from 'node:assert'
import { Converter } from '../converter.js'
import { fileExists } from '../fs.js'

test('Converter test', async (t) => {
  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/'
    })

    assert.strictEqual(
      converter.oldFile.path,
      'test/OPW 733 Tienduizend redenen.pdf'
    )
    assert.strictEqual(converter.sync, true)
    assert.strictEqual(converter.convertMethod.name, 'execSync')
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      sync: false
    })

    assert.strictEqual(
      converter.oldFile.path,
      'test/OPW 733 Tienduizend redenen.pdf'
    )
    assert.strictEqual(converter.sync, false)
    assert.strictEqual(converter.convertMethod.name, 'exec')
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/'
    })

    converter.convert()

    assert.strictEqual(
      fileExists('output/OPW 733 Tienduizend redenen.pdf'),
      true
    )
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      customConverter: 'cp'
    })

    converter.convert()

    assert.strictEqual(
      fileExists('output/OPW 733 Tienduizend redenen.pdf'),
      true
    )
  })

  await t.test('It should return the default converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/'
    })

    const result = converter.converter

    assert.strictEqual(result, 'cp')
  })

  await t.test('It should return the custom converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      customConverter: 'example'
    })

    const result = converter.converter

    assert.strictEqual(result, 'example')
  })

  await t.test('It should throw an error if the file isnt a string', () => {
    try {
      Converter.create({
        file: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File should be a string')
    }
  })

  await t.test('It should throw an error if the output isnt a string', () => {
    try {
      Converter.create({
        file: 'test/OPW 733 Tienduizend redenen.pdf',
        output: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output should be a string')
    }
  })

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'unknownfolder/'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'test/OPW 733 Tienduizend redenen.ppt'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the converter isnt a string',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          customConverter: 42
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Converter should be a string'
        )
      }
    }
  )

  await t.test('It should throw an error if the sync isnt a boolean', () => {
    try {
      Converter.create({
        file: 'test/OPW 733 Tienduizend redenen.pdf',
        output: 'output/',
        sync: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Sync should be a boolean')
    }
  })
})
