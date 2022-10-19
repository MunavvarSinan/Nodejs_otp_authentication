import Mongoose from 'mongoose';
let database: Mongoose.Connection;

/** --------- MongoDB Connection ------------ */
export const connect = () => {
  const uri = process.env.MONGO_URI as string;
  if (database) {
    return;
  }
  Mongoose.connect(uri);
  database = Mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
