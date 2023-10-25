// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'http://35.160.4.251:5000', // Specify the target server
      changeOrigin: true, // Needed for virtual hosted sites
    })
  );
};
