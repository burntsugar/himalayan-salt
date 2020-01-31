/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:19 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-01 09:57:23
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

    enum PASSWORD {
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

    const generateSaltedPassword = (salt: string, password: string): string => {
        var hash: string = createHmac(HASH.SHA256_ALG, salt).update(password).digest(FORMAT.HEX);
        return hash;
    }

    /**
     * @public 
     * - generate256BitPaswordHash('password') => [32 byte salt, 256 bit hash]
     * - generate256BitPaswordHash('passwor') => RangeError for string length < 8
     * - generate256BitPaswordHash(notAString123) => TypeError for type other than string
     * - generate256BitPaswordHash() => TypeError for falsey (null, undefined)
     * @param {string} password  
     * @return {string[]}
     */
    const generate256BitPaswordHash = (password: string): string[] => {
        let pair: string[] = [];

        if (!password)
            throw new TypeError(typeErrorMessage(`Password argument required.`));

        if (!(typeof(password) === 'string'))throw new TypeError(typeErrorMessage(`Password argument must be a string.`));

        if (password.length < PASSWORD.LEN_MIN)
            throw new RangeError(rangeErrorMessage(`Password length must be >= ${PASSWORD.LEN_MIN}`));

        const salt = generateSalt();
        pair[0] = salt;
        pair[1] = generateSaltedPassword(salt, password);

        return pair
    }

    /**
     * Authenticates a given password against a 32 byte salt and hash.
     * @public
     * - authenticate('password',32 byte salt, 32 byte hash) => true/false
     * - authenticate() => TypeError when any argument is not provided.
     * - authenticate('password', not 32 byte salt, not 32 byte hash) => RangeError when salt and/or hash not 32 bytes.
     * @param {string} givenPassword 
     * @param {string} salt 
     * @param {string} hash 
     * @return {boolean}
     */
    const authenticate = (givenPassword:string, salt:string, hash:string) => {

        if (!givenPassword || !salt || !hash ) throw new TypeError(typeErrorMessage(`givenPassword, salt and hash arguments required.`));

        if(salt.length != (SALT.BYTE_LENGTH * 2)) throw new RangeError(typeErrorMessage(`salt is not ${SALT.BYTE_LENGTH} bytes.`));

        if(hash.length != (HASH.BYTE_LENGTH * 2)) throw new RangeError(typeErrorMessage(`hash is not ${HASH.BYTE_LENGTH} bytes.`));

        if (hash == createHmac(HASH.SHA256_ALG, salt).update(givenPassword).digest(FORMAT.HEX)) {
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
        generate256BitPaswordHash: generate256BitPaswordHash,
        authenticate:authenticate,
    }

})();

export { himalaya };