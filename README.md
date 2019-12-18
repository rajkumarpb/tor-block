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

Changes from : v2.0:
---------------------
- If you need to log attacks in DB, need to specify the required database details like below.


```
var tor = require('tor-block');

// 1. To Block Tor Request
const tor_config = {
    dbHost:process.env.HOST,
    dbDialect:process.env.DIALECT,
    dbName:process.env.DATABASE,
    dbUser:process.env.USERNAME,
    dbPass:process.env.PASSWORD,
    tableName: tableName,
    trackLocation: true
};

app.use(tor(tor_config));
```

This plugin use sequelize for inserting log data in DB.

- If you need to track the Location of Request, need to enable trackLocation property to true in tor_config (Refer above config)
