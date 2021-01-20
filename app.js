const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


/* Configure Environment */
dotenv.config({ path: './config.env' });
global.__basedir = __dirname;

const AppError = require('./util/appError');
const authRouter = require('./routes/authRoutes');
const messengerRouter = require('./routes/messengerRoutes');
const pageRouter = require('./routes/pageRoutes');
const globalErrorHandler = require('./controllers/errorController');
const authController = require('./controllers/authController');
const socketController = require('./controllers/socketController');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Respond to options request
app.options('*', cors());

/***************
 * HTTP Routes *
 ***************/

app.use('/', pageRouter);
app.use('/api/auth', authRouter);
app.use('/api/messenger', messengerRouter(io));

app.use(express.static(`${__dirname}/public/unprotected`));
app.use(authController.protectRedirect);
app.use(express.static(`${__dirname}/public/protected`));

app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

/**************************
 * Socket Event Listeners *
 **************************/

io
    .use(socketController.authenticate)
    .on('connection', socket => {

        console.log(`user connected with id: ${socket.id}`);
        socketController.message(io, socket);
        socketController.find(socket);
        socketController.join(socket);
        socketController.disconnect(socket);
    });

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

const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
    console.log(`App running on port ${port}`);
});

/*
// Address unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED PROMISE REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Address uncaught exception
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
*/