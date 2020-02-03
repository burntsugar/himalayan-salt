# himalayan-salt

## Cryptographically strong password salting and hashing library for Node.js

![Photo by Autri Taheri https://unsplash.com/@ataheri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText](cover.jpg)

<br>

# Status: Beta

I maintain this library for use in my own projects. It is built upon Node.js [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto) which is easy to integrate. You may like to look though this **himalayan-salt** integration in order to make your own - or **install** it and use it :)

## Features in this version

<hr>

### + generate(passphrase) 

Returns cryptographically strong, unique 64 character hex encoded salt, and SHA-256 hash for a given passphrase. Returned in an instance of **Hashes**.

**Usage:**

- **generateSHA256PassphraseHash**( 'passphrase') => **Hashes** instance containing generated salt and hash

**Error handling:**

- generateSHA256PassphraseHash( 'passwor') => RangeError for string length < 8 
- generateSHA256PassphraseHash( 123) => TypeError when argument is other than string
- generateSHA256PassphraseHash() => TypeError when argument is falsey (null, undefined)

Generated strings are returned in a **Hashes** instance. You can choose to return them separately or combined, depending on your requirements.

+ getSalt() => 64 character hex encoded salt result
+ getHash() => 64 character hex encoded hash result
+ getCombined() => 128 character hex encoded result where the first 64 characters are the salt and the remaining 64 characters are the hash. 

<hr>

### + verify(passphrase, salt, hash)

Verifies a given passphrase against a given salt and hash.

**Usage:**

- **verify**( 'passphrase', 64 character hex encoded salt, 64 character hex encoded hash) => true/false 

**Error handling:**

- verify() => TypeError when any argument is not provided
- verify( 'passphrase', 123, 123) => RangeError when salt or hash is not a 64 character string.


<hr>

<br>

## Overview

- Built upon [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto).
- SHA-256 unique 32 byte salt generated for each call
- SHA-256 salted passphrase hash
- Salt and hash returned as 64 character hex encoded strings - separate or combined.

````javascript
// demo.js

// ES6 import
import {himalayanSalt} from './himalayan-salt.js';
// or require
// const hs = require('./himalayan-salt.js');
// const himalayanSalt = hs.himalayanSalt;

const passphrase1 = 'testY9O/<2uWguEU';
console.log(`passphrase is: ${passphrase1}`);
const result1 = himalayanSalt.generate(passphrase1);
console.log(`SALT >>>  ${result1.getSalt()}`);
console.log(`HASH >>>  ${result1.getHash()}`);
console.log(`COMBINED >>>  ${result1.getCombined()}`);
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase1, result1.getSalt(), result1.getHash())}`);

const passphrase2 = 'testY9O/<2uWguEU'; // same passphrase
console.log(`passphrase is: ${passphrase2}`);
const result2 = himalayanSalt.generate(passphrase2);
console.log(`SALT >>>  ${result2.getSalt()}`); // unique salt,
console.log(`HASH >>>  ${result2.getHash()}`); // and hash
console.log(`COMBINED >>>  ${result2.getCombined()}`);
console.log(`VERIFICATION >>>  ${himalayanSalt.verify(passphrase2, result2.getSalt(), result2.getHash())}`);
````

Output...

````
passphrase is: testY9O/<2uWguEU
SALT >>>  e4f4b47ac78e90c647cb78f30dff5f07517a6a9a11ff896dcf8b3c9946039f1f
HASH >>>  1f2b189c0991287baa5ac597229aa6626d79c6f4201d8fb869697fd30f1f2f89
COMBINED >>>  e4f4b47ac78e90c647cb78f30dff5f07517a6a9a11ff896dcf8b3c9946039f1f1f2b189c0991287baa5ac597229aa6626d79c6f4201d8fb869697fd30f1f2f89
VERIFICATION >>>  true

passphrase is: testY9O/<2uWguEU
SALT >>>  1450c8044a9334b83bbe77dbfe858c455051f709162275c107519d573e9210d0
HASH >>>  42a6e24e481fdc100b6447d3ae1a935ea455f578f43ad7be2b6cf059233be0f8
COMBINED >>>  1450c8044a9334b83bbe77dbfe858c455051f709162275c107519d573e9210d042a6e24e481fdc100b6447d3ae1a935ea455f578f43ad7be2b6cf059233be0f8
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
