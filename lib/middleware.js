var fs = require('fs');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
//var dns = require('dns');
var filePath = 'NA';

const Sequelize = require('sequelize');
var tableName = "NA";
var isDBPassed = false;
var trackLocation = false;

var sequelize;

module.exports = exports = function (options) {
	if(!options) {
		filePath = __dirname+'/tor_ips.txt';
		return blockTor;
	} else {
		if(!options.filePath)
			filePath = __dirname+'/tor_ips.txt';

		if(typeof options.dbHost != 'undefined' && options.dbHost != "" 
            && typeof options.dbName != 'undefined' && options.dbName != ""
            && typeof options.dbUser != 'undefined' && options.dbUser != ""
            && typeof options.dbPass != 'undefined' && options.dbPass != ""
            && typeof options.dbDialect != 'undefined' && options.dbDialect != "") {
             sequelize = new Sequelize(options.dbName, options.dbUser, options.dbPass, {
              host: options.dbHost,
              dialect: options.dbDialect,
              logging: false,
              define: {
                timestamps: false
              }
            });
            isDBPassed = true;
        }
        if(typeof options.tableName != 'undefined' && options.tableName != "") {
            tableName = options.tableName;
        }

        if(typeof options.trackLocation != 'undefined' && options.trackLocation != "") {
            trackLocation = options.trackLocation;
        }
		return blockTor;
	}
};

var blockMsg = "Hi human! Looks like you are using Tor! In that case, please get the hell out of here!";

var blockTor = function (req, res, next) {

	var contents = fs.readFileSync(filePath, 'utf8');

    var ip = requestIp.getClientIp(req);

    if (contents.indexOf(ip)!=-1) {
    	// If DB Settings are passed and valid, then log the attack in DB
        if(isDBPassed && tableName!="NA") {
            var replacements = {ip: req.headers.host, query: req.url, type:"Tor Request!", ua: req.get('User-Agent'), created_at : new Date()};
            var params = "ip_address, query, type, user_agent, created_at";
            var bindings = ":ip, :query, :type, :ua, :created_at";

            if(trackLocation) {
                const geoinfo = geoip.lookup(req.ip);
                if(typeof geoinfo != "undefined" && geoinfo!=null) {
                    replacements.city = geoinfo.city;
                    replacements.country = geoinfo.country;
                    replacements.latitude = geoinfo.ll[0];
                    replacements.longitude = geoinfo.ll[1];
                    replacements.timezone = geoinfo.timezone;
                    params = params+", city, country, latitude, longitude, timezone";
                    bindings = bindings+", :city, :country, :latitude, :longitude, :timezone";
                }
            } 

            sequelize.query(
                "INSERT INTO "+tableName+" ("+params+") values ("+bindings+")",
                { 
                    replacements: replacements,
                    type: sequelize.QueryTypes.INSERT 
                }
            ).then(function (clientInsertId) {
                //Do Something if you need to do in callback!
            });
        }
    	return res.status(403).send(blockMsg);
    } 
    else return next();
};

/* function reverseLookup(ip) {
	dns.reverse(ip,function(err,domains){
		if(err!=null)	console.log(err);

		domains.forEach(function(domain){
			dns.lookup(domain,function(err, address, family){
				return domain;
			});
		});
	});
} */