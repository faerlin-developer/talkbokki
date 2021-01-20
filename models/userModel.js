const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'A user must have a username'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'A user must have an email'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'A user must have a password'],
            minlength: 4,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
);

userSchema.pre('save', async function (next) {
    const numRounds = 12;
    this.password = await bcrypt.hash(this.password, numRounds);
    next();
});

userSchema.methods.isPasswordCorrect = async function (plaintextPassword, hashedPassword) {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
};

const User = mongoose.model('users', userSchema);

module.exports = User;