/*
 * @Author: rach@rach.colley 
 * @Date: 2020-01-30 14:42:51 
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-30 19:12:20
 */

import { himalaya } from '../out/himalaya.js'

const LEN_32_BYTE_SALT_HEX = 64;
const LEN_256_BIT_HASH_HEX = 64;

describe('himalaya#generate256BitPaswordHash', () => {

    describe('when called with a password', () => {

        it('that is valid, returns an array of salt, hash', () => {
            const pwordTest = 'testY9O/<2uWguEU';
            expect(himalaya.generate256BitPaswordHash(pwordTest).length).toEqual(2);
            expect(himalaya.generate256BitPaswordHash(pwordTest)[0].length).toEqual(LEN_32_BYTE_SALT_HEX);
            expect(himalaya.generate256BitPaswordHash(pwordTest)[1].length).toEqual(LEN_256_BIT_HASH_HEX);
        });

        it('that is less than the minimum length, throws RangeError', () => {
            expect(() => {
                himalaya.generate256BitPaswordHash('1234567')
            }).toThrowError(RangeError)
        });

        it('that is falsey, throws TypeError', () => {
            expect(() => {
                himalaya.generate256BitPaswordHash(false)
            }).toThrowError(TypeError)
        });

    });

});


describe('himalaya#authenticate', () => {

    describe('when called with a password', () => {

        it('that is valid, returns true', () => {
            const password = 'testY9O/<2uWguEU';
            const salt = 'c868f62ec8e354cc9e5e15f08cd984d05407feba1d489aeed31647ce9551234b'
            const hash = '8e4c5f231078cee1d178560d814d88ab277c025433954c0c2bfd07b89c687cfd'
            expect(himalaya.authenticate(password, salt, hash)).toBe(true);
        });

        it('that is not valid, returns false', () => {
            const password = 'testY9O';
            const salt = 'c868f62ec8e354cc9e5e15f08cd984d05407feba1d489aeed31647ce9551234b'
            const hash = '8e4c5f231078cee1d178560d814d88ab277c025433954c0c2bfd07b89c687cfd'
            expect(himalaya.authenticate(password, salt, hash)).toBe(false);
        });


    });

    describe('it throws TypeError when called with', () => {

        it('a null password', () => {
            const salt = 'c868f62ec8e354cc9e5e15f08cd984d05407feba1d489aeed31647ce9551234b'
            const hash = '8e4c5f231078cee1d178560d814d88ab277c025433954c0c2bfd07b89c687cfd'
            expect(() => {
                himalaya.authenticate(null, salt, hash)
            }).toThrowError(TypeError)
        });

        it('a null salt', () => {
            const password = 'testY9O/<2uWguEU';
            const hash = '8e4c5f231078cee1d178560d814d88ab277c025433954c0c2bfd07b89c687cfd'
            expect(() => {
                himalaya.authenticate(password, null, hash)
            }).toThrowError(TypeError)
        });

        it('a null hash', () => {
            const password = 'testY9O/<2uWguEU';
            const salt = 'c868f62ec8e354cc9e5e15f08cd984d05407feba1d489aeed31647ce9551234b'
            expect(() => {
                himalaya.authenticate(password, salt, null)
            }).toThrowError(TypeError)
        });

        it('null args', () => {
            expect(() => {
                himalaya.authenticate(null, null, null)
            }).toThrowError(TypeError)
        });

    });

    describe('it throws RangeException when called with', () => {

        it('a salt string less than 64 length', () => {

        });

        it('a salt string greater than 64 length', () => {

        });

        it('a hash string less than 64 length', () => {

        });

        it('a hash string greater than 64 length', () => {

        });

    });

});
