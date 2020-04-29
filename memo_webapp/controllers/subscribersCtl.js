"use strict";

// 1つ階層を上がったところにある『models』Dのcontacts.jsファイル
// modelを参照している、つまりmodelインスタンスを定数に格納
const Subscriber = require("../models/subscriber"),
  getSubscriberParams = (body) => {
    return {
      name: body.name,
      email: body.email,
      zip_code: parseInt(body.zip_code)
    };
  };

module.exports = {
  new: (req, res) => {
    res.render("subscribers/new");
  },
  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((err) => {
        console.log(`Error saving subscriber: ${err.message}`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findById(subscriber_id)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(err => {
        console.log(`Error fetching subscriber by ID: ${ err.message }`);
        next(err);
      });
  },
  showView: (req,res) => {
    res.render("subscribers/show");
  },
  edit: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findById(subscriber_id)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(err => {
        console.log(`Error feching subscriber by ID: ${ err.message }`);
        next(err);
      });
  },
  update: (req, res, next) => {
    let subscriber_id = req.params.id,
      subscriberParams = getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriber_id, {
      $set: subscriberParams
    })
    .then(subscriber => {
      res.locals.redirect = `/subscribers/${ subscriber_id }`;
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(err => {
      console.log(`Error updating subscriber by ID: ${ err.message }`);
      next(err);
    });
  },
  delete: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findByIdAndRemove(subscriber_id)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(err => {
        console.log(`Error deleting subscriber by ID: ${ err.message }`);
        next;
      });
  },
  index: (req, res, next) => {
    Subscriber.find({})
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching subscribers: ${err.message}`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("subscribers/index");
  }
}
