import { MongoClient } from 'mongodb';

export const uri = process.env.DB_URI ? process.env.DB_URI : 'mongodb://localhost:27017/films';

const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

const connect = async () => {
  try {
    const client = await mongoClient.connect();
    const db = client.db('films');
    return db;
  } catch(err) {
    throw err;
  }
};

export default connect;
