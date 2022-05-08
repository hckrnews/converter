import {
    expect, describe, it
} from '@jest/globals';
import Converter from '../converter.js';
import {
    fileExists
} from '../fs.js';

describe('Converter test', () => {
    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        expect(converter.oldFile.path).toBe('test/OPW 733 Tienduizend redenen.pdf');
        expect(converter.sync).toBe(true);
        expect(converter.convertMethod.name).toBe('execSync');
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
            sync:   false
        });

        expect(converter.oldFile.path).toBe('test/OPW 733 Tienduizend redenen.pdf');
        expect(converter.sync).toBe(false);
        expect(converter.convertMethod.name).toBe('exec');
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        converter.convert();

        expect(fileExists('output/OPW 733 Tienduizend redenen.pdf')).toBe(true);
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'cp'
        });

        converter.convert();

        expect(fileExists('output/OPW 733 Tienduizend redenen.pdf')).toBe(true);
    });

    it('It should return the default converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        const result = converter.converter;

        expect(result).toBe('cp');
    });

    it('It should return the custom converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'example'
        });

        const result = converter.converter;

        expect(result).toBe('example');
    });

    it('It should throw an error if the file isnt a string', () => {
        expect(() => {
            Converter.create({
                file: 42
            });
        }).toThrowError('File should be a string');
    });

    it('It should throw an error if the output isnt a string', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 42
            });
        }).toThrowError('Output should be a string');
    });

    it('It should throw an error if the output folder doesnt exists', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'unknownfolder/'
            });
        }).toThrowError('Output folder doesnt exists');
    });

    it('It should throw an error if the output folder doesnt exists', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'test/OPW 733 Tienduizend redenen.ppt'
            });
        }).toThrowError('Output folder doesnt exists');
    });

    it('It should throw an error if the converter isnt a string', () => {
        expect(() => {
            Converter.create({
                file:            'test/OPW 733 Tienduizend redenen.pdf',
                output:          'output/',
                customConverter: 42
            });
        }).toThrowError('Converter should be a string');
    });

    it('It should throw an error if the sync isnt a boolean', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'output/',
                sync:   42
            });
        }).toThrowError('Sync should be a boolean');
    });
});
