const catchAsync = require('../util/catchAsync');

exports.login = catchAsync(async function (req, res) {
    res.sendFile(`${__basedir}/public/unprotected/login.html`);
});
