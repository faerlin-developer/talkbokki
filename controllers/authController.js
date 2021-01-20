const jwt = require('jsonwebtoken');
const catchAsync = require('../util/catchAsync');
const User = require('../models/userModel');
const AppError = require("../util/appError");

exports.signup = catchAsync(async (req, res, next) => {

    const doc = await User.create(req.body);

    res.status(200).json({
        status: 'success',
    });
});

exports.login = catchAsync(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new Error('IncorrectLoginCredentials'));
    }

    console.log(email, password);

    const isCorrect = await user.isPasswordCorrect(password, user.password);
    if (!isCorrect) {
        return next(new Error('IncorrectLoginCredentials'));
    }

    // JWT
    const payload = { id: user._id };
    const expiresIn = { expiresIn: process.env.JWT_EXPIRES_IN };
    const token = jwt.sign(payload, process.env.JWT_SECRET, expiresIn);

    // Set-Cookie
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: false
    }

    res.cookie('jwt', token, cookieOptions);
    res.status(200).json({
        status: 'success'
    });
});

exports.logout = catchAsync(async (req, res, next) => {
    res.clearCookie('jwt');
    res.status(200).json({
        status: 'success',
        message: 'response should remove token'
    });
});

exports.protect = catchAsync(async (req, res, next) => {

    const token = req.cookies.jwt
    if (!token) {
        return next(new Error('MissingJsonWebToken'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new Error('InvalidJsonWebTokenID'));
    }

    req.id = user.id;
    req.username = user.username;

    next();
});

exports.protectRedirect = catchAsync(async (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.redirect('/');
    }

    next();
});

exports.autoLogin = catchAsync(async (req, res, next) => {

    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            return res.redirect('/friends.html');
        } else {
            res.clearCookie();
        }
    }

    next();
});

// https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt