import { parser } from '../helpers/parse_txt';

class FilmService {

  async addFilm(data, model) {
    try {
      data.title = data.title.toLowerCase();


      const film = await model.getByField({ title: data.title });

      if (film) throw new Error('Film already exists');
      
      const result = await model.insertOne(data);

      return { data: result.ops[0], insertedCount: result.insertedCount };
    } catch (err) {
      throw err;
    }
  }

  async deleteFilm(title, model) {
    try {
      const result = await model.deleteOne(title);

      return result;
    } catch (err) {
      throw err;
    }
  } 

  async getAll(sortBy, filters, model) {
    try {
      const result = await model.getAll(sortBy, filters);

      return result;
    } catch(err) {
      throw err;
    }
  }

  async saveList(model) {
    try {
      const preparedData = await parser(process.env.FILE_TXT);

      return preparedData.length >= 1 ? await model.insertMany(preparedData) : null;

    } catch(err) {
      throw err;
    }
  }
}

export default new FilmService();