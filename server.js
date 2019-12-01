const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env file
dotenv.config({ path: './config/config.env' });

// Bring in routers files
const bootcamps = require('./routes/bootcamps');

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev Logger using morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Router
app.use('/api/v1/bootcamps', bootcamps);

// Mount error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// For Unhandeled Rejection of promise
process.on('unhandledRejection', (err, promise) => {
  // @ts-ignore
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
