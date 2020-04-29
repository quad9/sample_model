"use strict";

const User = require("../models/user");

module.exports = {
  new: (req, res) => {
    res.render("users/new");
  },
  validate: (req, res, next) => {
    console.log(req.body);
    console.log(req.body.email);
    // req.sanitizeBody("email").nomalizeEmail({
    //   all_lowcase: true
    // }).trim();
    // req.check("email", "Email is invalid").isEmail();
    // req.getValidationResult().then((err) => {
    //   if (!err.isEmpty()) {
    //     let messages = err.array().map(e => e.msg);
    //     req.skip = true;
    //     res.locals.redirect = "/user/new";
    //     next();
    //   } else {
    //     next();
    //   }
    // });
  },
  create: (req, res, next) => {
    let userParams = {
      name: {
        last: req.body.last,
        first: req.body.first,
      },
      email: req.body.email,
      password: req.body.password,
      zip_code: req.body.zip_code,
    };
    User.create(userParams)
      .then((user) => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(`Error saving user: ${err.message}`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let user_id = req.params.id;
    User.findById(user_id)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(err => {
        console.log(`Error fetching user by ID: ${ err.message }`);
        next(err);
      });
  },
  showView: (req,res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let user_id = req.params.id;
    User.findById(user_id)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(err => {
        console.log(`Error feching user by ID: ${ err.message }`);
        next(err);
      });
  },
  update: (req, res, next) => {
    let user_id = req.params.id,
      userParams = {
        name: {
          last: req.body.last,
          first: req.body.first,
        },
        email: req.body.email,
        password: req.body.password,
        zip_code: req.body.zip_code,
      };
    User.findByIdAndUpdate(user_id, {
      $set: userParams
    })
    .then(user => {
      res.locals.redirect = `/users/${ user_id }`;
      res.locals.user = user;
      next();
    })
    .catch(err => {
      console.log(`Error updating user by ID: ${ err.message }`);
      next(err);
    });
  },
  delete: (req, res, next) => {
    let user_id = req.params.id;
    User.findByIdAndRemove(user_id)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(err => {
        console.log(`Error deleting user by ID: ${ err.message }`);
        next;
      });
  },
  index: (req, res, next) => {
    User.find({})
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching users: ${err.message}`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  }
};
