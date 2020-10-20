const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
    app.use( createProxyMiddleware( '/api', {
        target: 'http://apis.data.go.kr',
        changeOrigin: true,
        pathRewrite: {
            '^/api/':'/'
        }
    }))
}