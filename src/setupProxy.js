// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // All requests to /api will be forwarded
    createProxyMiddleware({
      target: 'scotusapi.doesntexist.com',  // The API server
      changeOrigin: true,
      secure: false, // Use 'true' if the target API is HTTPS
    })
  );
};
