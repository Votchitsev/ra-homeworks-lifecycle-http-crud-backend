const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const data = require('./data');

const app = new Koa();

app.use(koaBody());

app.use(cors());

app.use(async ctx => {
  if (ctx.url = 'http://localhost:7777/notes') {
    if (ctx.method === 'GET') {
      ctx.body = data;
      ctx.status = 200;
    }

    if (ctx.method === 'POST') {
      data.push(JSON.parse(ctx.request.body));
      ctx.status = 200;
    }

    if (ctx.method === 'DELETE') {
      const id = ctx.originalUrl.match(/\d/)[0];
      const deletedNote = data.find(note => note.id === Number(id));
      data.splice(data.indexOf(deletedNote), 1);
      ctx.status = 200;
    }
  }
})

app.listen(7777);