require('dotenv').config();
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;


server.use(middlewares);
server.use(router);
server.listen(port);
server.use(jsonServer.rewriter({
    '/api/blogs': '/blogs'
}));
console.log("server started in http://localhost:" + port);