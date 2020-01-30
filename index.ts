/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-01-30 14:42:33 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-01-31 10:35:54
 */

 import {himalaya} from './himalaya'

 const pwordTest = 'testY9O/<2uWguEU';
 const pair: string[] = himalaya.generate256BitPaswordHash(pwordTest);
 console.log('SALT >>> ' + pair[0]);
 console.log('HASH >>> ' + pair[1]);
 console.log();


// For Test
// PASSWORD >>> testY9O/<2uWguEU
// SALT >>> c868f62ec8e354cc9e5e15f08cd984d05407feba1d489aeed31647ce9551234b
// HASH >>> 8e4c5f231078cee1d178560d814d88ab277c025433954c0c2bfd07b89c687cfd
