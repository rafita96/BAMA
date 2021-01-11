const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');

var opts = {
  storeClient: mongoose.connection,
  points: 10, // Number of points
  duration: 1, // Per second(s)
};

var rateLimiter = new RateLimiterMongo(opts);

const rateLimiterMiddleware = (req, res, next) => {
  if(rateLimiter != null){
    rateLimiter.consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
  }
};

module.exports = rateLimiterMiddleware;