const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

exports.disconnect = socket => {
    socket.on('disconnect', async () => {
        console.log(`user disconnected with id: ${socket.id}`);
    });
};

exports.authenticate = async (socket, next) => {

    if (socket.handshake.query && socket.handshake.query.jwt) {
        const decoded = jwt.verify(socket.handshake.query.jwt, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            next();
        }
    }

    next(new Error('Connection failed'));
};

exports.message = (io, socket) => {
    socket.on('message', async (message) => {
        await Message.create(message);
        io.in(`chat:${message.from}`).emit('message', message);
        io.in(`chat:${message.to}`).emit('message', message);
    });
}

exports.find = socket => {
    socket.on('find', async (query) => {
        const results = await User.find({ username: new RegExp(query.trim(), 'i') }, { '_id': 1, 'username': 1 });
        socket.emit('find', results);
    });
};

exports.join = socket => {
    socket.on('join', async (room) => {
        socket.join(room);
        console.log(`Socket ID ${socket.id} joined ${room}`);
    });
};