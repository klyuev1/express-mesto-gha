const User = require('../models/user');

const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK = 200;
const OK_CREATED = 201;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK_CREATED).send({ data: user }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send({ users }))
    .catch((err) => { res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' }); });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Ресурс не найден' });
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const opts = { runValidators: true, new: true };

  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Ресурс не найден' });
      }
      return res.status(OK_CREATED).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const opts = { runValidators: true, new: true };

  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Ресурс не найден' });
      }
      return res.status(OK_CREATED).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};
