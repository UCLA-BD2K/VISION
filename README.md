# VISION

Setup
------------
Create config file for database connection and add to src/config, e.g.:
```js
// src/config/config.js

module.exports = {
    host: 'xx.xx.xxx.xxx',
    user: 'xxxxx',
    password: '*****'
};
```
Install dependencies and run
```js
$ npm install
$ bower install
// for jquery conflict, install latest version. 2.2.4 required by bootstrap is installed seperately.
$ npm start
```
View on http://localhost:5000
