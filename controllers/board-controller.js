const boardModel = require('../models/boardModel');

const BoardModule = {
  create: async (req, res) => {
    await boardModel.create(req.body);

    res.send('good');
  },
  getList: async (rqe, res) => {
    const lists = await boardModel.totalList();
    return res.status(200).send(lists);
  },

  search: async (req, res) => {
    const { title } = req.body;

    const lists = await boardModel.search(title);

    return res.status(200).send(lists);
  },

  detail: async (req, res) => {
    const boardId = req.url.slice(1);
    const boardInfo = await boardModel.boardDetail(boardId);

    return res.status(200).send(...boardInfo);
  },

  update: async (req, res) => {
    const { id, title, thumbnail, content } = req.body;

    const message = await boardModel.modify({
      id,
      title,
      thumbnail,
      content,
    });

    return res.status(200).send(message);
  },
  delete: async (req, res) => {
    const id = req.url.slice(1);

    const message = await boardModel.delete(id);

    return res.status(200).send(message);
  },
};

module.exports = BoardModule;
