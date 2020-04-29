const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipi_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection;

var contacts = [
  {
    name: "john lennon",
    email: "john@lennon.com",
    zip_code: 1234
  }, {
    name: "paul Mac",
    email: "paul@mac.com",
    zip_code: 2345
  }, {
    name: "george harrison",
    email: "george@harri.com",
    zip_code: 3456
  }
];
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data delete!")
  });

  var commands = [];

  contacts.forEach(c => {
    commands.push(Subscriber.create({
      name: c.name,
      email: c.email,
      zip_code: c.zip_code
    }));
  });

  Promise.all(commands)
    .then(r => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(`ERROR: ${err }`);
    });

