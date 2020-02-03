/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:19 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-03 17:45:38
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
        BYTE_LENGTH = 32,
    }

    enum PASSPHRASE {
        LEN_MIN = 8,
    }

    enum SALT {
        BYTE_LENGTH = 32,
    }

    enum FORMAT {
        HEX = 'hex',
    }

    const generateSalt = (): string => {
        const buffer: Buffer = randomBytes(SALT.BYTE_LENGTH);
        const saltStr: string = buffer.toString(FORMAT.HEX)
        return saltStr;
    }

    const generateSaltedPassphrase = (salt: string, passphrase: string): string => {
        var hash: string = createHmac(HASH.SHA256_ALG, salt).update(passphrase).digest(FORMAT.HEX);
        return hash;
    }

/**
     * Generates a 32 byte salt and SHA-256 hash.
     * Usage:
     * - generateSHA256PassphraseHash( 'passphrase') => [32 byte salt, 256 bit hash] 
     * - generateSHA256PassphraseHash( 'passwor') => RangeError for string length < 8 
     * - generateSHA256PassphraseHash( notAString123) => TypeError for type other than string 
     * generateSHA256PassphraseHash() => TypeError for falsey (null, undefined)
     * 
     * @param {string} passphrase given password for which the hashes will be created.
     * @return {GeneratedResult} generated salt and hash wrapped in {@link Hashes} instance.
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
     * @description Verifies the given passphrase against the given salt and hash.
     - authenticate( 'passphrase', 64 character hex encoded salt, 64 character hex encoded hash) => true/false 
     - authenticate() => TypeError when any argument is not provided
     - authenticate( 'passphrase' , not 64 character string, not 64 character string) => RangeError
     * @param {string} givenPassphrase given password for which the hashes will be verified.
     * @param {string} salt 64 character length hex encoded salt
     * @param {string} hash 64 character length hex encoded hash
     * @return {boolean} true if the given password can be reconcilled to the given salt and hash, or else false.
     */
    const verify = (givenPassphrase:string, salt:string, hash:string):boolean => {

        if (!givenPassphrase || !salt || !hash ) throw new TypeError(typeErrorMessage(`givenPassphrase, salt and hash arguments required.`));

        if(salt.length != (SALT.BYTE_LENGTH * 2)) throw new RangeError(typeErrorMessage(`salt is not ${SALT.BYTE_LENGTH} bytes.`));

        if(hash.length != (HASH.BYTE_LENGTH * 2)) throw new RangeError(typeErrorMessage(`hash is not ${HASH.BYTE_LENGTH} bytes.`));

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