const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/user/create', async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/user/verify', auth, (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
