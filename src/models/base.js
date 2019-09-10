import { ObjectId } from 'mongodb';

class BaseModel {

  async insertOne(data) {
    try {      
      return this.model.insertOne(data);
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id) {
    try {
      return this.model.deleteOne({ _id: ObjectId(id) });
    } catch(err) {
      throw err;
    }
  }

  async getAll(sortBy, filters) {
    try {
      const { name, stars } = filters;
      const query = {};

      name ? query.title = name : null;
      stars && stars.length >= 1 ? query.stars = { $in: stars } : null;

      return this.model.find(query).sort({ title: sortBy ? sortBy : 1 }).toArray();
    } catch(err) {
      throw err;
    }
  }

  async insertMany(data) {
    try {
      return this.model.insertMany(data);
    } catch(err) {
      throw err;
    }
  } 

  async getByField(fields) {
    try {
      return this.model.findOne(fields);
    } catch(err) {
      throw err;
    }
  }
}

export default BaseModel;