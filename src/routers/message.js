const express = require('express');

const auth = require('../middleware/auth');
const Message = require('../models/message');

const router = new express.Router();

router.get('/messages/all', auth, async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).send({ messages });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
