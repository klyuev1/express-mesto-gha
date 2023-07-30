// Подгружаем код
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

// Создаем сервер, подключаемся к БД

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Создаем роуты
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+\.[a-z]{2,}\/?([^\s]*)$/),
  }),
}), createUser);

app.use(auth, require('./routes/users'));
app.use(auth, require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

// Запускаем порт
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
