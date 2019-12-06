const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Load DB models
const Bootcamp = require('./models/Bootcamp');

// Conenct to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read json
const bootcamps = JSON.parse(
  fs.readFileSync('./_data/bootcamps.json', 'utf-8')
);

// Import Data
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported Successfully..'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data Removed Successfully..'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

/**
 * @desc argv[2] refers to second argument passed after
 *       node from the console.
 */
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-r') {
  deleteData();
}