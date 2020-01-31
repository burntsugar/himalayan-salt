/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:33 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-01-31 12:22:29
 */

 import {himalaya} from './himalaya'
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
 const pwordTest = 'testY9O/<2uWguEU';
 console.log(`~~~~ Test password is: ${pwordTest}`);
 console.log(`~~~~ ~~~~ Generating salt and hash...`);
 const pair: string[] = himalaya.generate256BitPaswordHash(pwordTest);
 const salt = pair[0];
 const hash = pair[1];
 console.log(`~~~~ ~~~~ ~~~~ SALT >>>  ${salt}`);
 console.log(`~~~~ ~~~~ ~~~~ HASH >>>  ${hash}`);
 console.log();
 console.log(`~~~~ rad`);
 console.log();
 console.log(`~~~~ ~~~~ Autheticating password: ${pwordTest}...`);
 console.log(`~~~~ ~~~~ ~~~~ RESULT >>>  ${himalaya.authenticate(pwordTest,salt,hash)}`);
 console.log();
 console.log(`~~~~~~~~~~~~-----------~~~~~~~~fin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
 