const redis = require('redis'),
    client = redis.createClient();
const {
    promisify
} = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

var db = require('../../connection');

module.exports.get = async (ctx, next) => {
    await new Promise(async (resolve, reject) => {
        try {
            const limit = ctx.request.query.limit || 10;
            const offset = ctx.request.query.offset || 0;
            const orderBy = ctx.request.query.orderBy || null;
            const order = ctx.request.query.order || 'ASC';
            const groupBy = ctx.request.query.groupBy || null;

            const cached = await getAsync(`limit=${limit}&offset=${offset}` + (orderBy ? `&orderBy=${orderBy}` : '') + (groupBy ? `&groupBy=${groupBy}` : '') + `&order=${order}`);
            if (cached) {
                ctx.body = JSON.parse(cached);
                resolve();
            }

            let dbrequest = `SELECT * FROM books as books`;;

            if (groupBy) {
                dbrequest += ` GROUP BY ${groupBy}`;
            }

            if (orderBy) {
                dbrequest += ` ORDER BY ${orderBy} ${order}`;
            }

            dbrequest += ` LIMIT ${limit} OFFSET ${offset};`;

            const result = await db.query(dbrequest);

            await setAsync(`limit=${limit}&offset=${offset}` + (orderBy ? `&orderBy=${orderBy}` : '') + (groupBy ? `&groupBy=${groupBy}` : '') + `&order=${order}`,
                JSON.stringify(result));

            ctx.body = result;
            resolve();
        } catch (err) {
            ctx.status = 500;
            ctx.body = err.message;
            reject(new Error(err.message));
        }
    });
};

module.exports.add = async (ctx, next) => {
    await new Promise(async (resolve, reject) => {
        try {
            let book = null;
            book = {
                title: ctx.request.body.title || "",
                date: ctx.request.body.date ? (new Date(ctx.request.body.date)).toISOString().substring(0, 10) : (new Date()).toISOString().substring(0, 10),
                author: ctx.request.body.author || "",
                description: ctx.request.body.description || "",
                image: ctx.request.body.image || ""
            };

            const result = await db.query(`INSERT into books (title, date, author, description, image) 
            VALUES ('${book.title}','${book.date}','${book.author}','${book.description}','${book.image}');`);

            ctx.body = {
                id: result.insertId
            };
            resolve();
        } catch (err) {
            ctx.status = 500;
            ctx.body = err.message;
            reject(new Error(err.message));
        }
    });
};

module.exports.update = async (ctx, next) => {
    await new Promise(async (resolve, reject) => {
        try {
            const bookId = ctx.params.id;
            let book = null;

            book = {
                title: ctx.request.body.title || null,
                date: ctx.request.body.date ? (new Date(ctx.request.body.date)).toISOString().substring(0, 10) : null,
                author: ctx.request.body.author || null,
                description: ctx.request.body.description || null,
                image: ctx.request.body.image || null
            };

            let dbrequest = `UPDATE books SET `;
            if (book.title || book.date || book.author || book.description || book.image) {
                dbrequest += `${book.title ? `title='${book.title}',`: ''}`;
                dbrequest += `${book.date ? `date='${book.date}',`: ''}`;
                dbrequest += `${book.author ? `author='${book.author}',`: ''}`;
                dbrequest += `${book.description ? `description='${book.description}',`: ''}`;

                dbrequest = dbrequest.substring(0, dbrequest.length - 1) + ` WHERE id = ${bookId};`;

                await db.query(dbrequest);
                ctx.body = "ok";
                resolve();
            } else {
                throw new Error("No request body");
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = err.message;
            reject(new Error(err.message));
        }
    });
};