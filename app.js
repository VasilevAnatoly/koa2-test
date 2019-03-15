require('babel-register')({
    presets: ['env']
});
require('babel-polyfill');
require('dotenv').config();

const initDB = require('./init/index');
initDB.init();

const koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./app/router');
const app = new koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');