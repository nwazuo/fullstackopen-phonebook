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

let contacts = [
	{
		name: 'Dan Abramov',
		number: '214566411',
		id: 7,
	},
	{
		name: 'Ada Lovelace',
		number: '0928508901',
		id: 8,
	},
	{
		name: 'Alan Kay',
		number: '091498090580',
		id: 9,
	},
	{
		name: 'David Mathis',
		number: '021940918-198',
		id: 10,
	},
];

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

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;

	Person.findById(id)
		.then((result) => {
			res.json(result).end();
		})
		.catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndRemove(id)
		.then((result) => {
			res.status(204).json(result).end();
		})
		.catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
	let name = req.body.name;
	let number = req.body.number;

	if (!name || !number) {
		console.log(`--> missing fields`);
		return res.status(400).json({ error: `name or number is missing` });
	}

	let contact = new Person({
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
	const id = req.params.id;
	const newPerson = {
		number: req.body.number,
	};

	Person.findByIdAndUpdate(id, newPerson, { new: true, runValidators: true, context: 'query' })
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
