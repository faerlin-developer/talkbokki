const catchAsync = require('../util/catchAsync');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Friend = require('../models/friendModel');

exports.user = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.id);

    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            username: user.username,
            friends: user.friends,
        }
    });
});

exports.addFriend = io => {
    return catchAsync(async (req, res, next) => {

        const username = req.username;
        const friendUsername = req.body.friendUsername;

        if (username === friendUsername) {
            next(new Error('CannotAddSelfAsFriend'));
        }

        const docs = await Friend.find({
            $or: [
                { $and: [{ A: username }, { B: friendUsername }] },
                { $and: [{ A: friendUsername }, { B: username }] }
            ]
        });

        if (docs.length > 0) {
            return res.status(200).json({
                status: 'success'
            });
        }

        await Friend.create({ A: username, B: friendUsername });

        io.sockets.in(`friends:${username}`).emit('friend', friendUsername);
        io.sockets.in(`friends:${friendUsername}`).emit('friend', username);

        res.status(200).json({
            status: 'success',
            message: `${username} added ${friendUsername} as a friend`
        });
    });
}

exports.friends = catchAsync(async (req, res, next) => {

    const username = req.username;

    const docs = await Friend.find({
        $or: [
            { A: username },
            { B: username }
        ]
    });

    const friends = [];
    docs.forEach(doc => {
        const friend = doc.A === username ? doc.B : doc.A;
        friends.push(friend);
    });


    res.status(200).json({
        status: 'success',
        data: friends
    });

});

exports.messages = catchAsync(async (req, res, next) => {

    const username = req.username;
    const { friendUsername } = req.body;

    const docs = await Message
        .find({
            $or: [
                { $and: [{ from: username }, { to: friendUsername }] },
                { $and: [{ from: friendUsername }, { to: username }] }
            ]
        })
        .sort({ createdAt: 1 });

    res.status(200).json({
        status: 'success',
        data: docs
    });

});
