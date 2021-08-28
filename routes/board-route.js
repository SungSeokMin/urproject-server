const express = require('express');
const router = express.Router();

const BoardModule = require('../controllers/board-controller');

router.get('/', BoardModule.getList);
router.get('/:id', BoardModule.detail);
router.post('/', BoardModule.create);
router.post('/search', BoardModule.search);
router.patch('/:id', BoardModule.update);
router.delete('/:id', BoardModule.delete);

module.exports = router;
