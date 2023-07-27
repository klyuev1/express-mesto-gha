const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const express = require('express');

const { PORT = 3000 } = process.env;

const ERROR_NOT_FOUND = 404;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth, require('./routes/users'));
app.use(auth, require('./routes/cards'));

// остановился на пункте --6 (5ый надо проверить)

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});