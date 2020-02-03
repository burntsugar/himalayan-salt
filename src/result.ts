/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-03 11:33:45 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-03 17:35:11
 */

 /**
 * @file 
 * @description RMP
 */

/** @description Defines behaviour for a class which contains hash generation
    results. */
interface GeneratedResult {
    getSalt(): string
    getHash(): string
    getCombined(): string
}

/**
 * @class
 * @implements {GeneratedResult}
 */
class Hashes implements GeneratedResult  {

    salt: string;
    hash: string;

    /**
     * @param {string} salt
     * @param {string} hash
     */
    constructor(salt:string, hash:string){
        this.salt = salt;
        this.hash = hash;
    }

    /** @return {string} 64 character hash. */
    getHash():string{
        return this.hash;
    }

    /** @return {string} 64 character salt. */
    getSalt():string{
        return this.salt;
    }

    /** @return {string} where the first 64 characters contain the salt and the     remaing characters contain the hash. */
    getCombined():string{
        return `${this.salt}${this.hash}`;
    }

}

export {GeneratedResult, Hashes};
