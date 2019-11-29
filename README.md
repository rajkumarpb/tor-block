# tor-block
Secure your Application by blocking requests from tor-browsers. Need 'request-ip' npm to be defined before calling this module.


Installation
=====

```bash
npm install tor-block --save
```

Usage
=====
Blocking Tor Request (sends 403 Forbidden):
```javascript
var tor = require('tor-block');

....

app.use(tor());
```
