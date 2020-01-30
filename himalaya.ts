/*
 * @Author: rach@rach.colley 
 * @Date: 2020-01-30 14:42:19 
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-30 19:01:30
 */

import { randomBytes, pseudoRandomBytes, createHmac } from "crypto";
import { isNumber } from 'lodash';

const himalaya = (() => {


    const HASH = {
        SHA256_ALG: 'SHA256',
    }
    Object.freeze(HASH)

    const PASSWORD = {
        LEN_MIN: 8,
    }
    Object.freeze(PASSWORD)

    const SALT = {
        BYTE_LENGTH: 32,
    }
    Object.freeze(SALT)

    const generateSalt = (): string => {
        const buffer: Buffer = randomBytes(SALT.BYTE_LENGTH);
        const saltStr: string = buffer.toString('hex')
        return saltStr;
    }

    const generateSaltedPassword = (salt: string, password: string): string => {
        var hash_saltedPasswordHash: string = createHmac(HASH.SHA256_ALG, salt).update(password).digest('hex');
        return hash_saltedPasswordHash;
    }

    /**
     * @public 
     * generate256BitPaswordHash('password') => [32 byte salt, 256 bit hash]
     * generate256BitPaswordHash('passwor') => RangeError
     * generate256BitPaswordHash() => TypeError
     * @param password 
     */
    const generate256BitPaswordHash = (password: string): string[] => {
        let pair: string[] = [];

        if (!password)
            throw new TypeError(typeErrorMessage(`Password argument required.`));
        if (password.length < PASSWORD.LEN_MIN)
            throw new RangeError(rangeErrorMessage(`Password length must be >= ${PASSWORD.LEN_MIN}`));

        const salt = generateSalt();
        pair[0] = salt;
        pair[1] = generateSaltedPassword(salt, password);

        return pair
    }

    const authenticate = (givenPassword:string, salt:string, hash:string) => {

        if (!givenPassword || !salt || !hash ) throw new TypeError(typeErrorMessage(`givenPassword, salt and hash arguments required.`));

        if (hash == createHmac('SHA256', salt).update(givenPassword).digest('hex')) {
            return true;
        } 
        return false;
    }

    const typeErrorMessage = (src: string): string => {
        return `Error: ${src}`
    }

    const rangeErrorMessage = (src: string): string => {
        return `Error ${src}`
    }

    return {
        generate256BitPaswordHash: generate256BitPaswordHash,
        authenticate:authenticate,
    }

})();

export { himalaya };