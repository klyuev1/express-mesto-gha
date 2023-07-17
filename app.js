const mongoose = require('mongoose');

const express = require('express');

const { PORT = 3000 } = process.env;

const ERROR_NOT_FOUND = 404;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64b3f96bb358e0a352721e3a',
  };

  next();
});

app.use(express.json());
app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: `Ресурс не найден`});
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Другие роуты карточек и пользователя