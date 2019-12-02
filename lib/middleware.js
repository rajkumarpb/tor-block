var tor = require('./tor');
var fs = require('fs');
const requestIp = require('request-ip');
var dns = require('dns');
var filePath = 'NA';

module.exports = exports = function (options) {
	if(!options) {
		filePath = __dirname+'/tor_ips.txt';
		return blockTor;
	} else {
		return blockTor;
	}
};

var blockMsg = "Hi human! Looks like you are using Tor! In that case, please get the hell out of here!";

var blockTor = function (req, res, next) {

	var contents = fs.readFileSync(filePath, 'utf8');

    var ip = requestIp.getClientIp(req);
    var domain = reverseLookup(ip);

    if (contents.indexOf(ip)!=-1) return res.status(403).send(blockMsg);
    else return next();
};

function reverseLookup(ip) {
	dns.reverse(ip,function(err,domains){
		if(err!=null)	callback(err);

		domains.forEach(function(domain){
			dns.lookup(domain,function(err, address, family){
				return domain;
			});
		});
	});
}