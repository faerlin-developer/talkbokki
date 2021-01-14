const catchAsync = require('../util/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            message: 'working!'
        }
    });
});