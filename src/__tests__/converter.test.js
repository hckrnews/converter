/* eslint-disable sonarjs/no-duplicate-string */

import test from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import { Converter } from '../converter.js'
import { fileExists } from '../fs.js'

const testFilePath = path.join('test', 'OPW 733 Tienduizend redenen.pdf')
const outputDir = path.join('output')
const outputFilePath = path.join(outputDir, 'OPW 733 Tienduizend redenen.pdf')

test('Converter test', async (t) => {
  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir
    })

    assert.strictEqual(converter.oldFile.path, testFilePath)
    assert.strictEqual(converter.sync, true)
    assert.strictEqual(converter.convertMethod.name, 'execSync')
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir,
      sync: false
    })

    assert.strictEqual(converter.oldFile.path, testFilePath)
    assert.strictEqual(converter.sync, false)
    assert.strictEqual(converter.convertMethod.name, 'exec')
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir
    })

    converter.convert()

    assert.strictEqual(fileExists(outputFilePath), true)
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir,
      customConverter: 'cp'
    })

    converter.convert()

    assert.strictEqual(fileExists(outputFilePath), true)
  })

  await t.test('It should return the default converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir
    })

    const result = converter.converter

    assert.strictEqual(result, 'cp')
  })

  await t.test('It should return the custom converter', () => {
    const converter = Converter.create({
      file: testFilePath,
      output: outputDir,
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
        file: testFilePath,
        output: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output should be a string')
    }
  })

  await t.test('It should throw an error if the output folder doesn\'t exist', () => {
    try {
      Converter.create({
        file: testFilePath,
        output: 'unknownfolder/'
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output folder doesn\'t exist')
    }
  })

  await t.test('It should throw an error if the output folder doesn\'t exist', () => {
    try {
      Converter.create({
        file: testFilePath,
        output: path.join('test', 'OPW 733 Tienduizend redenen.ppt')
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output folder doesn\'t exist')
    }
  })

  await t.test('It should throw an error if the converter isnt a string', () => {
    try {
      Converter.create({
        file: testFilePath,
        output: outputDir,
        customConverter: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Converter should be a string')
    }
  })

  await t.test('It should throw an error if the sync isnt a boolean', () => {
    try {
      Converter.create({
        file: testFilePath,
        output: outputDir,
        sync: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Sync should be a boolean')
    }
  })
})
