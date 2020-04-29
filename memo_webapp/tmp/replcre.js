"use strict";

const mongoose = require("mongoose"),
      Course = require("./models/course"),
      Subscriber = require("./models/subscriber"),
      User = require("./models/user");

// インスタンスの中、代入されて以降の範囲で使えるローカル変数を
// インスタンスの外側で定義する。
var tmpCourse, tmpSubscriber, tmpUser;

mongoose.connect(
  "mongodb://localhost:27017/recipi_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

mongoose.Promise = global.Promise;

// /////////////////////////////////////////////
// // create Course model

let course_sets = [
  {
    title: "トマトのソースパスタ",
    cost: 800,
    discription: "無農薬トマトのソースパスタ。",
    items: ["トマト", "玉ねぎ"],
    zip_code: 1234
  },
  {
    title: "とんかつ丼",
    cost: 700,
    discription: "黒豚のとんかつ。",
    items: ["黒豚肉", "玉ねぎ", "卵"],
    zip_code: 2345
  },
  {
    title: "揚げそば",
    cost: 900,
    discription: "広東風野菜たっぷりの揚げそば。",
    items: ["白菜", "そば", "玉ねぎ"],
    zip_code: 3456
  }
],
commands = [];

Course.deleteMany()
  .exec()
  .then(() => {
    console.log("Course model collection delete!")
  })
  .then(() => {
    course_sets.forEach(cs => {
      commands.push(Course.create({
        title: cs.title,
        cost: cs.cost,
        discription: cs.discription,
        items: cs.items,
        zip_code: cs.zip_code
      }))
    });
    Promise.all(commands)
    .then(rt => {
      console.log(JSON.stringify(rt));
      mongoose.connection.close();
    })
  })
  // // ここも非同期の罠にひっかかる。
  // .then(() => {
  //   Course.find(query, function (err, data) {
  //     console.log(`${ data }\n\n\n\n\n`)
  //   });
  // })
  .catch(err => {
    console.log(err)
  });




// Course.create({
  //   title: "トマトの国",
  //   discription: "トマトソースで和えたパスタ。",
  //   zip_code: 626,
  //   items: ["トマト", "パスタ"]
  // })
  //   .then(query => tmpCourse = query);

  // Subscriber.findOne({})
  //   .then(query => tmpSubscriber = query);

  // tmpSubscriber.courses.push(tmpCourse);
  // tmpSubscriber.save();
  // Subscriber.populate(tmpSubscriber, "courses")
  //   .then(query => console.log(query));

// /////////////////////////////////////////////
// // create User model
// User.deleteMany({})
//   .exec()
//   .then(docs => console.log(`\n>>>> User document Delete: ${docs.n}`))
//   .then(() => {
//     return Subscriber.deleteMany({});
//   })
//   .then(docs => console.log(`>>>> Subscriber document Delete ${docs.n}`))
//   .then(() => {
//     return User.create({
//       name: {
//         last: "John",
//         first: "Lennon",
//       },
//       email: "john@lennon.com",
//       password: "pw123",
//     });
//   })
//   // .then(user => { tmpUser = user; })
//   .then(user => tmpUser = user)
//   .then(() => {
//     return Subscriber.create({
//       name: "Jonny",
//       email: "john@lennon.com",
//       zip_code: 1009
//     })
//   })
//   .then(() => {
//     // return Subscriber[0];
//     return Subscriber.findOne({ email: tmpUser.email });
//   })
//   .then(subscriber => {
//     tmpUser.subscribed_account = subscriber;
//     tmpUser.save().then(() => console.log(`${ tmpUser }\n>>>> Data updated!`));
//   })
// ///////////////////////////////// // なぜローカル変数が展開されないのか？
// ///////////////////////////////// // なぜ、非同期処理のワナにひっかかっているのか？
// // .then(tmpCourse => {
// //   tmpCourse = "Greeting Hello, tmplate Course model!";
// // })
// // .then(() => { console.log(`hellohello ${ tmpCourse }`); })
// .catch((error) => console.log(error.message));