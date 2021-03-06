/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:33 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 09:20:26
 */

 /**
 * @file 
 * @description Demo
 */

import {himalayanSalt} from './himalayan-salt';
import {GeneratedResult} from './result';


console.log(`%c                         ____
                  /^\   / -- )
                 / | \ (____/
                / | | \ / /
               /_|_|_|_/ /
                |     / /
 __    __    __ |    / /__    __    __
[  ]__[  ]__[  ].   / /[  ]__[  ]__[  ]
|__            ____/ /___           __|
   |          / .------  )         |
   |         / /        /          |
   |        / /        /           |
~~~~~~~~~~~~-----------~~~~~~~~himalayan-salt Demo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, "font-family:monospace")

console.log();
const passphrase1 = 'testY9O/<2uWguEU';
console.log(`passphrase is: ${passphrase1}`);
const result1: GeneratedResult = himalayanSalt.generate(passphrase1);
console.log(`SALT >>>  ${result1.getSalt()}`);
console.log(`HASH >>>  ${result1.getHash()}`);
console.log(`COMBINED >>>  ${result1.getCombined()}`);
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase1, result1.getSalt(), result1.getHash())}`);

console.log();
const passphrase2 = 'testY9O/<2uWguEU'; // same passphrase
console.log(`passphrase is: ${passphrase2}`);
const result2: GeneratedResult = himalayanSalt.generate(passphrase2);
console.log(`SALT >>>  ${result2.getSalt()}`); // unique salt,
console.log(`HASH >>>  ${result2.getHash()}`); // and hash
console.log(`COMBINED >>>  ${result2.getCombined()}`);
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase2, result2.getSalt(), result2.getHash())}`);
console.log
(`~~~~~~~~~~~~-----------~~~~~~~~fin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);