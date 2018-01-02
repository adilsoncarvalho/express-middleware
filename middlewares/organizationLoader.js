const _ = require("underscore");

function OrganizationLoader(options) {
  const prefix = options.prefix;

  const handler = function(request, response, next, slug) {
    request.organization = `${prefix}::${slug}`;
    next();
  };

  this.middlewareHandler = function(request, response, next) {
    console.log("middleware");
    // http a.b.c.cpadmin.dev:3000
    // require("underscore")=> ['c', 'b', 'a']
    // all non-array elements return undefined (except strings)
    handler(request, response, next, _.first(request.subdomains));
  };

  this.paramHandler = function(request, response, next, slug) {
    console.log("param");
    handler(request, response, next, slug);
  };
};

module.exports = function(options) {
  return new OrganizationLoader(options);
};
