import {altit256} from './altit256';
import {GeneratedResult} from './result'

/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-03 12:41:58 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 09:43:06
 */

 /**
 * @file 
 * @description entry point
 */

const himalayanSalt = (() => {

    const generate = (passphrase:string):GeneratedResult => {
        return altit256.generateSHA256PassphraseHash(passphrase);
    };

    const verify = (givenPassphrase:string, salt:string, hash:string):boolean => {
        return altit256.verify(givenPassphrase,salt,hash);
    };

    return {
        generate: generate,
        verify:verify,
    }

})();

export {himalayanSalt};