const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const { HTTPS_PORT } = require('./config.json');

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../sslcert/server.key'),
  'utf8'
);
const certificate = fs.readFileSync(
  path.resolve(__dirname, '../sslcert/server.cert'),
  'utf8'
);
const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = process.env.PORT || 17000;

//TODO: use for whitelist only
app.use(cors());
const routes = require('./routes/index.route');
const cli = require('./cli/index.route');

app.get('/', (req, res) => res.send('Hello World!'));
app.use(routes);
app.use('/cli', cli);

// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(HTTP_PORT);
app.listen(port);
console.log(`server listening at port ${port}`);

module.exports = { app };
