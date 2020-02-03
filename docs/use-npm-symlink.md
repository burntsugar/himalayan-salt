# How to use: Use via symlink to local npm


1. **Compile** sources...

````bash
user $ cd himalayan-salt
user/himalayan-salt $ npm run tsc
````

2. **Symlink** to local npm

````bash
user/himalayan-salt $ npm link
````

3. **Link** your project with himalaya-salt npm symlink

````bash
user/your-project $ npm link himalaya-salt
````

4. **Import** himalayan-salt library into your project

````javascript
// your.js
const him = require('himalayan-salt-sat');

const output = him.himalaya.generateSHA256PassphraseHash('mypassphrase');
console.log(output);
````

5. **Unlink** when you're done

````
user/your-project $ npm unlink himalaya-salt
````

...and remove himalayan-salt npm symlink

````bash
user/himalayan-salt $ npm unlink
````