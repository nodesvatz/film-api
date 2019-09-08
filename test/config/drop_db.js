import connect from '../../src/database';

const dropDatabase = () => {
  try {
    beforeEach(async () => {
      const db = await connect();
      await db.dropDatabase();
    });
  } catch(err) {
    throw err;
  }
};

export default dropDatabase;