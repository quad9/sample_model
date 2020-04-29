"use strict";

// expressをロードする。
const express = require("express"),
      app = express(),
      router = express.Router(),
      bodyParser = require("body-parser");

// portの確保（オプション--環境変数で指定がなければ3000番を使う。）
app.set("port", process.env.PORT || 3000);

// // POSTリクエストで渡されたbody・jsonのデータを
// // 利用するには『body-parser』モジュールが必要。
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// for DB
const mongoose = require("mongoose");

// DBに接続
mongoose.connect(
  // DB名：form
  "mongodb://localhost:27017/recipi_db",
  // エラーの対処
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true });
  mongoose.set("useCreateIndex", true);
  mongoose.set('useFindAndModify', false);


  //   mongoDBへ該当のDBを接続
  const db = mongoose.connection;
  //   接続確認のログを出力する
  db.once("open", () => {
    console.log("DBへの接続は成功しました。")
  });

// Promise
// mongooseのPromiseではなく、グローバルのpromiseを使う。
mongoose.Promise = global.Promise;

// 静的ファイルの関連付け
router.use(express.static("assets"));

// レイアウト
//   viewに関連するファイルの経路の起点となるディレクトリを有効にする
const layouts = require("express-ejs-layouts");
//   ejs形式ファイルの使用を設定
app.set("view engine", "ejs");
//   express-ejs-layoutsモジュールを使うことを宣言する
//   viewsディレクトリにファイルを配置する
//   レイアウトのための設計図であるlayouts.ejsが必須
router.use(layouts);

// controllerのメソッドをロードする    
const subscribersCtl = require("./controllers/subscribersCtl");
const usersCtl = require("./controllers/usersCtl");

// // PUTメソッドをエミュレートするためのモジュールをロードする
// const methodOverride = require("method-override");
// router.use(methodOverride("_method", {
//   methods: ["POST", "GET"]
// }));

// 経路
//   リクエストが来た時の反応をここでスイッチングしていく
//   for index.ejs
app.use("/", router);

router.get("/", (req, res) => {
  // 初期状態の様子をみるため、ブラウザに文字列を送信する
  // res.send("Here is ROOT.");
  res.render("index");
});

// for subscriber module
router.get("/subscribers", subscribersCtl.index, subscribersCtl.indexView);
router.get("/subscribers/new", subscribersCtl.new);
router.post("/subscribers/create", subscribersCtl.create, subscribersCtl.redirectView);
router.get("/subscribers/:id", subscribersCtl.show, subscribersCtl.showView);
router.get("/subscribers/:id/edit", subscribersCtl.edit);
router.put("/subscribers/:id/update", subscribersCtl.update, subscribersCtl.redirectView);
router.delete("/subscribers/:id/delete", subscribersCtl.delete, subscribersCtl.redirectView);

// for user module
// router.get("/users", usersCtl.index);
router.get("/users", usersCtl.index, usersCtl.indexView);
router.get("/users/new", usersCtl.new);
router.post("/users/create", usersCtl.create, usersCtl.redirectView);
router.get("/users/:id", usersCtl.show, usersCtl.showView);
router.get("/users/:id/edit", usersCtl.edit);
router.put("/users/:id/update", usersCtl.update, usersCtl.redirectView);
router.delete("/users/:id/delete", usersCtl.delete, usersCtl.redirectView);

// アプリがPORTを監視するための設定
app.listen(app.get("port"), () => {
  console.log(`サーバーはhttp://localhost:${ app.get("port") }で起動しています。`);
});