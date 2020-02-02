/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:19 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-03 10:01:32
 */

import { randomBytes, createHmac } from "crypto";

/**
 * RMP
 */
const himalaya = (() => {

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
     * @public 
     * - generateSHA256PassphraseHash('passphrase') => [32 byte salt, 256 bit hash]
     * - generateSHA256PassphraseHash('passwor') => RangeError for string length < 8
     * - generateSHA256PassphraseHash(notAString123) => TypeError for type other than string
     * - generateSHA256PassphraseHash() => TypeError for falsey (null, undefined)
     * @param {string} passphrase  
     * @param {boolean} combined When true, values are returned as a single string where the first 64 characters is the salt and the remaining 64 characters is the hash. When false, values are returned in an array where the first index is the salt and the remaining index is the hash. Set to false by default.
     * @return {object}
     */
    const generateSHA256PassphraseHash = (passphrase: string, combined: boolean = false): object => {

        if (!passphrase)
            throw new TypeError(typeErrorMessage(`passphrase argument required.`));

        if (!(typeof(passphrase) === 'string'))throw new TypeError(typeErrorMessage(`passphrase argument must be a string.`));

        if (passphrase.length < PASSPHRASE.LEN_MIN)
            throw new RangeError(rangeErrorMessage(`passphrase length must be >= ${PASSPHRASE.LEN_MIN}`));

            const genSalt = generateSalt();
            const genHash = generateSaltedPassphrase(genSalt, passphrase);

            if (combined)return {hashes: `${genSalt}${genHash}`};
            return {salt: genSalt, hash: genHash};
    }

    /**
     * Authenticates a given passphrase against a 32 byte salt and hash.
     * @public
     * - authenticate('passphrase',32 byte salt, 32 byte hash) => true/false
     * - authenticate() => TypeError when any argument is not provided.
     * - authenticate('passphrase', not 32 byte salt, not 32 byte hash) => RangeError when salt and/or hash not 32 bytes.
     * @param {string} givenPassphrase 
     * @param {string} salt 
     * @param {string} hash 
     * @return {boolean}
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

export { himalaya };