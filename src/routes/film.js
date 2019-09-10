import { Router } from 'express';
import FilmService from '../service/film';
import { oapi } from '../middlewares/validator';
import fs from 'fs';

const router = Router();

router.post('/add', oapi.validate('post', '/add'), async (req, res, next) => {
  try {
    const result = await FilmService.addFilm(req.body, req.app.get('filmModel'));

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await FilmService.deleteFilm(req.params.id, req.app.get('filmModel'));

    const responseMessage = result.deletedCount === 1 ? 
      { message: 'Film successfully deleted', status: true } : 
      { message: 'Film has not been deleted', status: false };

    res.json(responseMessage);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { sortBy, name, stars } = req.query;
    const result = await FilmService.getAll(Number(sortBy), { name, stars }, req.app.get('filmModel'));

    res.json(result);
  } catch(err) {
    next(err);
  }
});

router.post('/upload', async (req, res, next) => {
  try {
    const file = fs.createWriteStream(process.env.FILE_TXT);

    req.pipe(file);

    req.on('end', async () => {
      const result = await FilmService.saveList(req.app.get('filmModel'));

      res.json(result.  ops.length > 1 ? { message: 'File successfully uploaded', data: result.ops, status: true } : { message: 'something went wrong, try again', status: false } );
    });
  } catch(err) {
    next(err);
  }
});


export default router;