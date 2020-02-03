# himalayan-salt

## Cryptographically strong password salting and hashing library for Node.js

![Pink salt](cover.jpg)

Photo by [Autri Taheri](https://unsplash.com/@ataheri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

<br>

# Status: 👷🏽‍♀️ Development | Active

## Overview

- Built upon [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto).
- SHA-256 unique 32 byte salt generated for each call
- SHA-256 salted passphrase hash
- Salt and hash returned as 64 character hex encoded strings

````javascript
// demo.js

// ES6 import
import {himalayanSalt} from './himalayan-salt.js';
// or
// require
// const hs = require('./himalayan-salt.js');
// const himalayanSalt = hs.himalayanSalt;

const passphrase1 = 'testY9O/<2uWguEU';
console.log(`passphrase is: ${passphrase1}`);
const result1 = himalayanSalt.generate(passphrase1);
console.log(`SALT >>>  ${result1.getSalt()}`);
console.log(`HASH >>>  ${result1.getHash()}`);
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase1, result1.getSalt(), result1.getHash())}`);

const passphrase2 = 'testY9O/<2uWguEU'; // same passphrase
console.log(`passphrase is: ${passphrase2}`);
const result2 = himalayanSalt.generate(passphrase2);
console.log(`SALT >>>  ${result2.getSalt()}`); // unique salt,
console.log(`HASH >>>  ${result2.getHash()}`); // and hash
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase2, result2.getSalt(), result2.getHash())}`);
````

Output...

````
passphrase is: testY9O/<2uWguEU
SALT >>>  1ef7deaab5508cdd0b5c7077adfb9ca662e924633ffddb3a8f248cdddc48c04b
HASH >>>  a87526da147916ff087f888bef3e62f29687414c0201d125bd6ce2e57002147f
VERIFICATION >>>  true

passphrase is: testY9O/<2uWguEU
SALT >>>  e65aad482bc39a0f4ed711c5a4e061de9a9ce2c3d826755284c04e50207aafbf
HASH >>>  e77e5d7823e59dc8130f8cacc0575a9a2a3cc3d878c5da8d4963b41726861ba0
VERIFICATION >>>  true
````

<br>

## Download

**Prerequisite**: [Node.js 13.5x](https://github.com/nvm-sh/nvm#install--update-script) installation.

````bash 
user $ git clone git@github.com:burntsugar/himalayan-salt.git
user $ cd himalayan-salt
user/himalayan-salt $ npm install
````

### Compile TypeScript

Compile .ts to .js in ./out

````bash
user/himalayan-salt $ npm run tsc
````

### Test 

(compile first!)

Run [Jest](https://jestjs.io/docs/en/getting-started) test suites.

````bash
user/himalayan-salt $ npm test
````

### Run demo

(compile first!)

````bash
user/himalayan-salt $ npm run demo
````

<br>

## Install

````bash
npm install --save himalayan-salt
````

````javascript
// your.js

// ES6 import
import {himalayanSalt} from 'himalayan-salt';
````

...or...

````javascript
// your.js

// require
const hs = require('himalayan-salt');
````

<br>

## Modern password security for system designers

This project is guided by [Modern password security for system designers](https://cloud.google.com/solutions/modern-password-security-for-system-designers.pdf).

Passwords...

> *Allow the largest character set possible, such as
UTF-8, including emoji.*

> *Have a long minimum length and allow very long
passwords.*

<br>

## What's next...
* Implement [Scrypt password-based key derivation function](https://tools.ietf.org/html/rfc7914.html) version.

<br>


## What's inside

* [TDD](https://www.agilealliance.org/?s=TDD#q=~(infinite~false~filters~(postType~(~)~categories~(~))~searchTerm~'TDD~sort~false~sortDirection~'asc~page~1))
* [TypeScript](https://www.typescriptlang.org/)
* [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [Jest](https://jestjs.io/en/)
* [ES6](https://tc39.es/ecma262/)

<br>

<hr>

*rrr@<span></span>burntsugar.rocks*
