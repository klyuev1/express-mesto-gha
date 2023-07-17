const Card = require('../models/card');

const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK = 200;
const OK_CREATED = 201;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send({ cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card)=> {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: `Ресурс не найден`});
      }
      res.status(OK).send({ message: "Карточка удалена" });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) =>  {
  Card.findByIdAndUpdate( req.params.cardId, { $addToSet: { likes: req.user._id } },{ new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: `Ресурс не найден`});
      }
      res.status(OK_CREATED).send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: `Ресурс не найден`});
      }
      res.status(OK_CREATED).send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
      }
    });
}



