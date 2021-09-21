const connect = require('../database');

const boardModels = {
  create: async (boardInfo) => {
    let { nickname, thumbnail, title, content } = boardInfo;

    try {
      // TODO : 카드에 정보 입력 해주기
      const conn = await connect();
      const insertSql = `
        INSERT INTO board 
        (nickname, thumbnail, title, content)
        VALUES (?, ?, ?, ?);
      `;

      await conn.query(insertSql, [nickname, thumbnail, title, content]);

      return true;
    } catch (err) {
      return err;
    }
  },
  totalList: async () => {
    const conn = await connect();
    try {
      const getList = `
      SELECT * FROM board;
      `;
      const totalList = await conn.query(getList);

      const parseList = JSON.parse(JSON.stringify(totalList[0]));

      return parseList;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  boardDetail: async (id) => {
    const conn = await connect();
    try {
      const infoCardDetailListSql = `
      SELECT * FROM board WHERE id = ?
      `;
      const detailList = await conn.query(infoCardDetailListSql, id);

      const parseDetail = JSON.parse(JSON.stringify(detailList[0]));
      return parseDetail;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  search: async (title) => {
    const conn = await connect();
    try {
      const searchTitleSql = `
      SELECT * FROM board WHERE title LIKE ?
      `;
      const searchList = await conn.query(searchTitleSql, [`%${title}%`]);

      const list = JSON.parse(JSON.stringify(searchList[0]));
      return list;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  modify: async (modifyInfo) => {
    const conn = await connect();
    try {
      const { id, title, thumbnail, content } = modifyInfo;

      const modifySql = `
        UPDATE board SET title = ?, thumbnail = ?, content = ? WHERE id = ?;
      `;
      await conn.query(modifySql, [title, thumbnail, content, id]);

      return 'Success Modify';
    } catch (err) {
      return err;
    }
  },
  delete: async (id) => {
    const conn = await connect();

    try {
      const deleteSql = `
      DELETE FROM board WHERE id = ?
      `;

      await conn.query(deleteSql, id);

      return 'Success Delete';
    } catch (err) {
      return err;
    }
  },
};

module.exports = boardModels;
