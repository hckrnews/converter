import File from '../file.js';

describe('Converter file model test', () => {
    it('It should generate the file model', () => {
        const file = File.create({
            filePath: 'test/OPW 733 Tienduizend redenen.pdf'
        });

        expect(file.path).toBe('test/OPW 733 Tienduizend redenen.pdf');
        expect(file.directory).toBe('test');
        expect(file.base).toBe('OPW 733 Tienduizend redenen.pdf');
        expect(file.extension).toBe('.pdf');
        expect(file.name).toBe('OPW 733 Tienduizend redenen');
    });

    it('It should throw an error if the pathpath doesnt exists', () => {
        expect(() => {
            File.create({
                filePath: '42'
            });
        }).toThrowError('File path doesnt exists');
    });

    it('It should throw an error if the pathpath isnt a string', () => {
        expect(() => {
            File.create({
                filePath: 42
            });
        }).toThrowError('File path should be a string');
    });

    it('It should throw an error if the pathpath isnt a string', () => {
        expect(() => {
            File.create({
                filePath: 'output/'
            });
        }).toThrowError('File path doesnt exists');
    });
});
