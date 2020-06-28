const mongoose = require('mongoose');
const _ = require('lodash');

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

messageSchema.method.toJSON = function () {
  const message = this;
  const messageObject = message.toObject();
  return _.pick(messageObject, ['_id', 'text', 'owner']);
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
