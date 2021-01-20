const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
    {
        A: {
            type: String,
            required: [true, 'A friend must have A'],
            trim: true,
        },
        B: {
            type: String,
            required: [true, 'A friend must have B'],
            trim: true,
        },
    }
);

const Friend = mongoose.model('friends', friendSchema);

module.exports = Friend;