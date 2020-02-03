import {altit256} from './altit256';
import {GeneratedResult} from './result'

/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-03 12:41:58 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-03 17:44:10
 */

 /**
 * @file 
 * @description entry point
 */

//import {himalaya} from './himalaya';

/** @desc himalaya lib */
// exports.himalaya = himalaya;

// export {himalaya};



//////////////

// const index = (() => {

//     const generate = (passphrase:string):GeneratedResult => {
//         return himalaya.generateSHA256PassphraseHash(passphrase);
//     };

//     const verify = (givenPassphrase:string, salt:string, hash:string):boolean => {
//         return himalaya.verify(givenPassphrase,salt,hash);
//     };

//     return {
//         generate: generate,
//         verify:verify,
//     }

// })();

// export {index};


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