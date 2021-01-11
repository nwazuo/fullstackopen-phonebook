const mongoose = require('mongoose');

if (process.argv.length < 4) {
  console.log(
    'Please provide all arguments. E.g - nodejs mongo.js name 2342342',
  );
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://chizo:${password}@cluster0.bf6vr.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('person', personSchema);

const newPerson = new Person({
  name,
  number,
});

// newPerson.save().then((doc) => {
// 	console.log(`Added ${name} number ${number} to phonebook`);
// 	mongoose.connection.close();
// });

Person.find({}).then((result) => {
  result.forEach((item) => console.log(item));
  mongoose.connection.close();
});
