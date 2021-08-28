const userModel = require('../models/userModel');

const UserModule = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const emailCheck = await userModel.findUser(email);

    if (emailCheck === false) {
      return res.send({ message: 'email check' });
    }

    const getNickname = await userModel.loginUser({ email, password });
    console.log(getNickname);
    if (getNickname === false) {
      return res.send({ message: 'password check' });
    } else {
      const nickname = getNickname;

      req.session.user = nickname;

      req.session.save(function (err) {
        if (err) throw err;
        return res.status(200).send({ message: 'login Ok', nickname });
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
    });

    return res.status(200).send({
      message: 'logout Ok',
    });
  },

  signUp: async (req, res) => {
    const { email, password, nickname } = req.body;

    const findNickname = await userModel.findNickname(nickname);

    if (findNickname === true) {
      // 이미 존재하는 닉네임
      return res.send({
        message: 'nickname already exist',
      });
    }

    try {
      const insertUser = await userModel.signup({ email, password, nickname });

      const { message } = insertUser;

      if (message === 'Success') {
        res.status(201).send({
          message: 'signup Ok',
        });
      } else {
        return res.send({
          message: 'email already exist',
        });
      }
    } catch (err) {
      return err;
    }
  },
};

module.exports = UserModule;
