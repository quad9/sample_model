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



// #1
// let query = {
//   $and: [
//     { title: "トマトのソースパスタ" },
//     { title: "揚げそば" }
//   ]
// };

// Course.find(query, function (err, data) {
//   data.forEach(ins => {
//     console.log(ins)
//   })
// });