require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/phonebook');

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(morgan(':body'));
app.use(express.static('build'));
app.get('/api/persons', (req, res) => {
  console.log('-> request recieved');

  Person.find({}).then((result) => {
    console.log('--> fetched data');
    result.forEach((obj) => console.log(obj));
    res.json(result).end();
  });
});

app.get('/info', (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<p>Phonebook has info for ${
        result.length
      } people</p><p>${new Date().toUTCString()}</p>`
    );
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((result) => {
      res.json(result).end();
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).json(result).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name } = req.body;
  const { number } = req.body;

  if (!name || !number) {
    console.log('--> missing fields');
    return res.status(400).json({ error: 'name or number is missing' });
  }

  const contact = new Person({
    name,
    number,
  });

  // contacts = contacts.concat(contact);

  contact
    .save()
    .then((result) => {
      console.log('--> saving new contact');
      res.json(result).end();
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  const newPerson = {
    number: req.body.number,
  };

  Person.findByIdAndUpdate(id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      console.log('--> replaced contact successfully');
      res.json(result).end();
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'malformed id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message });
  }

  next();
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
