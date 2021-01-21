const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: [true, 'A message must have a from username'],
            trim: true,
        },
        to: {
            type: String,
            required: [true, 'A message must have a to username'],
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'A message must have a message'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;