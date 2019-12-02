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

This plugin needs file which contains list of tor ips fetched from https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1. You should write a cron to fetch details from that URL and store it in file. And need to pass the file path as parameter in order to use latest tor-ips to be blocked. If not initialize path property (as shown above) plugin will use default list of IPs taken on Dec-2-2019!

```javascript
var tor = require('tor-block');

....

app.use(tor({path:'path_to_file'}));
```