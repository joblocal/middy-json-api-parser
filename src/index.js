const createError = require('http-errors');
const contentTypeLib = require('content-type');

module.exports = (passedOpts) => ({
  before: (handler, next) => {
    const opts = passedOpts || {};
    const { headers } = handler.event;

    if (!headers) {
      return next();
    }

    const contentType = headers['Content-Type'] || headers['content-type'];

    if (contentType) {
      const { type } = contentTypeLib.parse(contentType)
      if (type === 'application/vnd.api+json') {
        try {
          const parsedBody = JSON.parse(handler.event.body, opts.reviver)
          handler.event.body = parsedBody;
          handler.event.data = parsedBody.data;
        } catch (err) {
          throw new createError.UnprocessableEntity('Content type defined as JSON but an invalid JSON was provided')
        }
      }
    }
    next()
  }
})
