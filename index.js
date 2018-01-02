// NOTE: http://expressjs.com/en/api.html#router.param
const express = require("express");
const app = express(exports);
const organizationLoader = require("./middlewares/organizationLoader")({prefix: 'teste'});

app.use(organizationLoader.middlewareHandler);
app.param('organization_slug', organizationLoader.paramHandler);

app.get('/', (request, response) => {
  response.end(`Hello world! (v2) - ${request.organization}`);
});

app.get('/org/:organization_slug', (request, response) => {
  response.end(`/org/:organization_slug -> ${request.organization}`);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
