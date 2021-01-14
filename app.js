const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/* Configure Environment */
dotenv.config({ path: './config.env' });

const AppError = require('./util/appError');
const userRouter = require('./routes/authRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/************
 * Database *
 ************/

/***************
 * HTTP Routes *
 ***************/

app.use(express.static(`${__dirname}/public`));
app.use('/api/users', userRouter);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/login.html`);
});

app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

/**************************
 * Socket Event Listeners *
 **************************/




/************
 * Database *
 ************/

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful!');
});