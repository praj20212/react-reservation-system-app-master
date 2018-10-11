const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./src/client/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(app);
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, './src/client/index.html'));
});

//Port Number
app.listen(port, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});

module.exports = app