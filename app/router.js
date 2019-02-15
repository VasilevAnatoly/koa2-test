const route = require('koa-router');
const router = new route();

const books = require('../database/controllers/books');

router.get('/books', books.get);
router.post('/books', books.add);
router.put('/books/:id', books.update);

module.exports = router;