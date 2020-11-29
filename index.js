const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

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
	res.json(contacts);
});

app.get('/info', (req, res) => {
	res.send(
		`<p>Phonebook has info for ${
			contacts.length
		} people</p><p>${new Date().toUTCString()}</p>`
	);
});

app.get('/api/persons/:id', (req, res) => {
	if (contacts.find((n) => Number(req.params.id) === n.id) === undefined) {
		console.log(`--> Id not found!`);
		return res.status(400).json({
			error: 'no person with such id',
		});
	} else {
		console.log(`Got ya, coming through with your response`);
		res.json(contacts.find((n) => Number(req.params.id) === n.id)).end();
	}
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	contacts = contacts.filter((n) => n.id !== id);

	res.status(204).json({ message: 'Resource deleted successfully' }).end();
});

app.post('/api/persons', (req, res) => {
	let name = req.body.name;
	let number = req.body.number;

	if (!name || !number) {
		console.log(`--> missing fields`);
		return res.json({ error: `name or number is missing` });
	}
	if (contacts.find((n) => n.name === name)) {
		console.log(`--> resource exists`);
		return res.status(409).json({ error: `name already exists` });
	}

	let contact = {
		id: Math.round(Math.random() * 10000),
		name,
		number,
	};

	contacts = contacts.concat(contact);

	console.log(`-->got here, should work now`);
	res.json(contact).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
