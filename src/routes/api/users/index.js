const express = require('express');
const User = require('../../../models/User');

const router = express.Router();

/**
 * Get User by specific ID
 * Access at GET http://localhost:8080/api/users/:id
 */
router.get('/:id', (req, res) => {
  // Get User from instance User model by ID
  User.findById(req.params.id, (err, user) => {
    if (err) {
      // Handle error from User.findById
      res.status(400).json(err);
    }
    res.json(user);
  });
});

router.get('/', (req, res) => {
  const filters = {};
  if (req.query.name) {
    filters.name = req.query.name;
  }
  if (req.query.age) {
    filters.age = req.query.age;
  } else if (req.query.age_gt) {
    filters.age = { $gt: req.query.age_gt, $lt: req.query.age_lt };
  }
  if (req.query.type) {
    filters.type = req.query.type;
  }
  try {
    let query = User.find(filters);
    const sort = {};
    if (req.query.sort) {
      req.query.sort.split(',').forEach((sortField) => {
        if (sortField[0] === '-') {
          sort[sortField.substr(1)] = -1;
        } else {
          sort[sortField.substr(0)] = 1;
        }
      });
    }
    if (sort) {
      query.sort(sort);
    }
    if (req.query.select) {
      query.select(req.query.select);
    }
    if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit, 10));
    }
    if (req.query.skip) {
      query = query.skip(parseInt(req.query.skip, 10));
    }
    query.exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(users);
      }
    });
  } catch (error) {
    res.send(error);
  }
});
/**
* Create User
* Access at POST http://localhost:8080/api/users
*/
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
});
// update specific user
router.put('/:id', (req, res) => {
  const user = {};

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.gender = req.body.gender;
  user.age = req.body.age;
  user.type = req.body.type;
  // console.log(req.params.id);
  User.update({ _id: req.params.id }, user, { upsert: true }, (err, users) => {
    res.json(users);
  });
});
router.post('/', (req, res) => {
  // Create a new instance of the User model
  const user = new User();

  // Set field value (comes from the request)
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.gender = req.body.gender;
  user.age = req.body.age;
  user.type = req.body.type;

  // Save User and check for error
  user.save((err, _user) => {
    if (err) {
      // Handle error from save
      return res.send(err);
    }

    res.status(300).json({
      message: 'Create User successfull',
      user: _user
    });
  });
});
/**
* Get User by specific ID
* Access at GET http://localhost:8080/api/users/:id
*/
router.get('/:id', (req, res) => {
  // Get User from instance User model by ID
  User.findById(req.params.id, (err, user) => {
    if (err) {
      // Handle error from User.findById
      res.end(err);
    }

    res.json(user);
  });
});

module.exports = router;
