const connect = require('../database');

const userModels = {
  findUser: async (email) => {
    try {
      const conn = await connect();
      const emailCheckSql = `
         SELECT * FROM users where email = ?;
      `;
      const emailCheck = await conn.query(emailCheckSql, email);
      if (emailCheck[0].toString().length) {
        // 이미 존재하기 때문에 true 를 내보내줌
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  findNickname: async (nickname) => {
    try {
      const conn = await connect();
      const emailCheckSql = `
         SELECT * FROM users where nickname = ?;
      `;
      const emailCheck = await conn.query(emailCheckSql, nickname);
      if (emailCheck[0].toString().length) {
        // 이미 존재하기 때문에 true 를 내보내줌
        return true;
      }
      return false;
    } catch (err) {
      return err;
    }
  },
  loginUser: async (args) => {
    try {
      const conn = await connect();

      const loginSql = `SELECT * FROM users where email = ? and password = ?`;

      const loginReq = await conn.query(loginSql, [args.email, args.password]);

      if (loginReq[0].toString().length) {
        const { nickname } = JSON.parse(JSON.stringify(loginReq[0]))[0];

        return nickname;
      }
    } catch (err) {
      return err;
    }
  },
  signup: async (userInfo) => {
    const conn = await connect();
    try {
      const { email, password, nickname } = userInfo;

      const insertUserInfoSql = `
        INSERT INTO users SET email=?, password=?, nickname=?, createdAt = now(), updatedAt = now()
      `;
      await conn.query(insertUserInfoSql, [email, password, nickname]);
      return { message: 'Success' };
    } catch (err) {
      return { message: 'Fail' };
    }
  },
};

module.exports = userModels;
