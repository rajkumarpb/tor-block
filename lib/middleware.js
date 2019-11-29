var tor = require('./tor');
var regex = new RegExp('\\b' + tor.join('\\b|\\b') + '\\b', 'i');

module.exports = exports = function (options) {
    return blockTor;
};

var blockMsg = "Hi human! Looks like you are using Tor! In that case, please get the hell out of here!";

var blockTor = function (req, res, next) {
    var ua = req.ip;

    if (regex.test(ua.toLowerCase())) return res.status(403).send(blockMsg);
    else return next();
};