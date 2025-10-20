import mongoose from 'mongoose';

const dbMongooseConect = async function (url) {
  await mongoose.connect(url);
  console.log('db connect');
};

export default dbMongooseConect;
