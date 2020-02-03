/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:19 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 09:50:07
 */

import { randomBytes, createHmac } from "crypto";
import {GeneratedResult, Hashes} from './result';

/**
 * @module
 * @desc Provides salt, hash and verification facilities, using {@link https://nodejs.org/api/crypto.html#crypto_crypto|Crypto}
 */
const altit256 = (() => {

    enum HASH {
        SHA256_ALG = 'SHA256',
        BYTE_LENGTH_32 = 32,
    }

    enum PASSPHRASE {
        LEN_MIN = 8,
    }

    enum SALT {
        BYTE_LENGTH_32 = 32,
    }

    enum FORMAT {
        HEX = 'hex',
    }

    const generateSalt = (): string => {
        const buffer: Buffer = randomBytes(SALT.BYTE_LENGTH_32);
        const saltStr: string = buffer.toString(FORMAT.HEX)
        return saltStr;
    }

    const generateSaltedPassphrase = (salt: string, passphrase: string): string => {
        var hash: string = createHmac(HASH.SHA256_ALG, salt).update(passphrase).digest(FORMAT.HEX);
        return hash;
    }

/**
     @desc Returns cryptographically strong, unique 64 character hex encoded salt, and SHA-256 hash for a given passphrase. Returned in an instance of Hashes.
        - generateSHA256PassphraseHash( 'passphrase') => {Hashes} instance containing generated salt and hash
        - generateSHA256PassphraseHash( 'passwor') => RangeError for string length < 8 
        - generateSHA256PassphraseHash( 123) => TypeError when argument is other than string
        - generateSHA256PassphraseHash() => TypeError when argument is falsey (null, undefined)
     * @param {string} passphrase given passphrase for which the hashes will be generated
     * @return {Hashes} instance containing generated salt and hash
     */
    const generateSHA256PassphraseHash = (passphrase: string): GeneratedResult => {

        if (!passphrase)
            throw new TypeError(typeErrorMessage(`passphrase argument required.`));

        if (!(typeof(passphrase) === 'string'))throw new TypeError(typeErrorMessage(`passphrase argument must be a string.`));

        if (passphrase.length < PASSPHRASE.LEN_MIN)
            throw new RangeError(rangeErrorMessage(`passphrase length must be >= ${PASSPHRASE.LEN_MIN}`));

            const genSalt = generateSalt();
            const genHash = generateSaltedPassphrase(genSalt, passphrase);

            return new Hashes(genSalt, genHash);
           
    }

    /**
     * @desc Verifies a given passphrase against a given salt and hash.
     - verify( 'passphrase', 64 character hex encoded salt, 64 character hex encoded hash) => true/false 
     - verify() => TypeError when any argument is not provided
     - verify( 'passphrase', 123, 123) => RangeError when salt or hash is not a 64 character string.
     * @param {string} givenPassphrase given passphrase for which the hashes will be verified.
     * @param {string} salt the 64 character length hex encoded salt
     * @param {string} hash the 64 character length hex encoded hash
     * @return {boolean} true if the given passphrase can be reconcilled to the given salt and hash, or else false.
     */
    const verify = (givenPassphrase:string, salt:string, hash:string):boolean => {

        if (!givenPassphrase || !salt || !hash ) throw new TypeError(typeErrorMessage(`givenPassphrase, salt and hash arguments required.`));

        if(salt.length != (SALT.BYTE_LENGTH_32 * 2)) throw new RangeError(typeErrorMessage(`salt is not ${SALT.BYTE_LENGTH_32} bytes.`));

        if(hash.length != (HASH.BYTE_LENGTH_32 * 2)) throw new RangeError(typeErrorMessage(`hash is not ${HASH.BYTE_LENGTH_32} bytes.`));

        if (hash == createHmac(HASH.SHA256_ALG, salt).update(givenPassphrase).digest(FORMAT.HEX)) {
            return true;
        } 
        return false;
    }

    const typeErrorMessage = (src: string): string => {
        return `TypeError: ${src}`
    }

    const rangeErrorMessage = (src: string): string => {
        return `RangeError ${src}`
    }

    return {
        generateSHA256PassphraseHash: generateSHA256PassphraseHash,
        verify:verify,
    }

})();

export {altit256};