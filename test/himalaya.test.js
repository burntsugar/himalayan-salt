/*
 * @Author: rach@rach.colley 
 * @Date: 2020-01-30 14:42:51 
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-30 17:33:37
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
