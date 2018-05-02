var zauth = require('../zauth-node');

module.exports = function(req, res, next) {
  if (req.headers && req.headers['x-identity'] && req.headers['x-signature']) {
    // Check signature is valid
    // First construct data to check signature on
    var fullUrl = req.protocol + '://' + req.get('host') + req.url;
    var data = fullUrl + req.rawBody;

    zauth.verifySignature(data, req.headers['x-identity'], req.headers['x-signature'], function(err, result) {
      if (err || !result) {
        return res.send(400, {
          error: 'Invalid signature'
        });
      }

      // Get the SIN from the public key
      var sin = zauth.getSinFromPublicKey(req.headers['x-identity']);
      if (!sin) return res.send(400, {
        error: 'Bad public key from identity'
      });
      req.sin = sin;
      next();
    });
  } else {
    next();
  }
};
