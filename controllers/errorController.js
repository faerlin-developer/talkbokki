const AppError = require("../util/appError");

const sendError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        })
    }
};

const handleDuplicateFields = err => {
    const value = JSON.stringify(err.keyValue);
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400);
};

const handleValidationError = err => {
    return new AppError(err.message, 400);
};

const handleTokenExpireError = err => {
    return new AppError(err.message, 400);
};

const handleJsonWebTokenError = err => {
    return new AppError(err.message, 400);
}

const handleIncorrectLoginCredentials = err => {
    const message = 'Incorrect login credentials';
    return new AppError(message, 400);
}

const handleMissingJsonWebToken = err => {
    const message = 'missing json web token';
    return new AppError(message, 400);
};

const handleInvalidJsonWebTokenID = err => {
    const message = 'invalid id in jwt';
    return new AppError(message, 400);
};

const handleCannotAddSelfAsFriend = err => {
    const message = 'cannot add self as a friend';
    return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    console.log(err);

    if (err.code === 11000) err = handleDuplicateFields(err);
    if (err.name === 'ValidationError') err = handleValidationError(err);
    if (err.name === 'TokenExpiredError') err = handleTokenExpireError(err);
    if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError(err);
    if (err.message === 'IncorrectLoginCredentials') err = handleIncorrectLoginCredentials(err);
    if (err.message === 'MissingJsonWebToken') err = handleMissingJsonWebToken(err);
    if (err.message === 'InvalidJsonWebTokenID') err = handleInvalidJsonWebTokenID(err);
    if (err.messsage === 'CannotAddSelfAsFriend') err = handleCannotAddSelfAsFriend(err);

    sendError(err, res);
};