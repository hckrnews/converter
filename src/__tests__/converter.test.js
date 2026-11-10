/* eslint-disable sonarjs/no-duplicate-string */

import test from 'node:test'
import assert from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Converter } from '../converter.js'
import { fileExists } from '../fs.js'

test('Converter command injection', async (t) => {
  const dir = mkdtempSync(path.join(tmpdir(), 'converter-'))
  const marker = path.join(dir, 'PWNED')
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  t.afterEach(() => rmSync(marker, { force: true }))

  const createFile = (name) => {
    const filePath = path.join(dir, name)
    writeFileSync(filePath, 'x')
    return filePath
  }

  const filenamePayloads = [
    '$(touch PWNED).pdf',
    '`touch PWNED`.pdf',
    '";touch PWNED #.pdf'
  ]

  await Promise.all(filenamePayloads.map((name) =>
    t.test(`It should not execute a filename payload: ${name}`, () => {
      const file = createFile(name)
      const output = `${path.join(dir, 'out')}/`
      mkdirSync(output, { recursive: true })

      const result = Converter.create({ file, output, customConverter: 'cp' })
      const cwd = process.cwd()
      process.chdir(dir)
      try {
        result.convert()
      } finally {
        process.chdir(cwd)
      }

      assert.strictEqual(fileExists(marker), false)
      assert.strictEqual(fileExists(path.join(output, name)), true)
    })
  ))

  await t.test('It should not execute an output directory payload', () => {
    const file = createFile('safe.pdf')
    const output = `${path.join(dir, '$(touch PWNED)')}/`
    mkdirSync(output, { recursive: true })

    const cwd = process.cwd()
    process.chdir(dir)
    try {
      Converter.create({ file, output }).convert()
    } finally {
      process.chdir(cwd)
    }

    assert.strictEqual(fileExists(marker), false)
    assert.strictEqual(fileExists(path.join(output, 'safe.pdf')), true)
  })

  await t.test('It should not chain a customConverter payload', () => {
    const file = createFile('safe.pdf')
    const converter = Converter.create({
      file,
      output: `${dir}/`,
      customConverter: `echo && touch ${marker}`
    })

    assert.throws(() => converter.convert())
    assert.strictEqual(fileExists(marker), false)
  })

  await t.test('It should pass paths as absolute arguments', () => {
    const file = createFile('-rf.pdf')
    const converter = Converter.create({ file, output: `${dir}/` })

    assert.deepStrictEqual(converter.args, [
      path.resolve(file),
      path.resolve(dir, '-rf.pdf')
    ])
  })
})

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
    assert.strictEqual(converter.convertMethod.name, 'execFileSync')
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
    assert.strictEqual(converter.convertMethod.name, 'execFile')
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
