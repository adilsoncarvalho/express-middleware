const OrganizationLoader = require("../../middlewares/organizationLoader");

describe('OrganizationLoader', () => {
  beforeEach(() => {
    target   = OrganizationLoader({prefix: 'test'});
    request  = {};
    response = {};
  });

  afterEach(() => {
    target   = undefined;
    request  = undefined;
    response = undefined;
  });

  test('is not null', () => {
    expect(target).not.toBeNull()
  });

  test('middlewareHandler', done => {
    // a.b.c.givendomain.com
    // subdomains will contain it in a reverse order
    var request = { subdomains: ['c', 'b', 'a'] };
    var response = {};

    function callback() {
      expect(request.organization).toBe('test::c');
      done();
    };

    target.middlewareHandler(request, response, callback);
  });

  test('paramHandler', done => {
    var request = {};
    var response = {};

    function callback() {
      expect(request.organization).toBe('test::1234');
      done();
    };

    target.paramHandler(request, response, callback, '1234');
  });

});
