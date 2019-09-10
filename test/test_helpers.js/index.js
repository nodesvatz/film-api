import FilmService from '../../src/service/film';
import FilmModel from '../../src/models/film';
import connect from '../../src/database';

export const createFilm = async (title = 'Test', stars = ['John Doe']) => {
  try {
    const db = await connect();
    const model = new FilmModel(db);
    return await FilmService.addFilm(
      {
        title,
        release: '1970',
        format: 'VHS',
        stars
      },
      model
    );
  } catch(err) {
    throw err;
  }
};

export const getFilm = async (title) => {
  try {
    const db = await connect();
    const model = new FilmModel(db);

    return await FilmService.getAll(null, { title }, model);
  } catch(err) {
    throw err;
  }
};