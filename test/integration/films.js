import assert from 'assert';
import request from 'supertest';
import { ObjectId } from 'mongodb';
import app from '../../src/app';
import dropDatabase from '../config/drop_db';
import { createFilm, getFilm } from '../test_helpers.js.js';

describe('Film API', () => {
  dropDatabase();

  describe('Create film', () => {

    it('Should be valid response with status 201', async () => {
      const { body } = await request(app)
        .post('/v1/film/add')
        .send({
          title: 'Test',
          release: '1970',
          format: 'VHS',
          stars: ['John Doe']
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .catch(err => {
          assert(!err, 'Flow should run without errors');
        });


      const { insertedCount, data } = body;
      const { title, release, format, _id } = data;
      const requiredFormatFields = ['VHS', 'DVD', 'Blu-Ray'];


      assert.deepEqual(title, 'test', 'title should be lower case');
      assert(typeof release === 'string', 'release should be string');
      assert(requiredFormatFields.includes(format), 'format should be equal allowed values');
      assert(ObjectId.isValid(_id), 'should be generated _id as ObjectId');
      assert(insertedCount === 1, 'should be inserted count 1');
    });


    it('Should be error, when film already exists', async () => {
      await createFilm();

      const { body } = await request(app)
        .post('/v1/film/add')
        .send({
          title: 'Test',
          release: '1970',
          format: 'VHS',
          stars: ['John Doe']
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .catch(err => {
          console.log(err);
        });


      assert.deepEqual(body, 'Film already exists', 'should be error, that item already exists');
    });

    it('Should be error, when passed not valid body', async () => {
      const { body } = await request(app)
        .post('/v1/film/add')
        .send({
          title: 'Test',
          release: '1970',
          format: 'Not valid',
          stars: ['John Doe']
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .catch(err => {
          console.log(err);
        });

      assert.deepEqual(body, 'Error while validating request: request.body.format should be equal to one of the allowed values', 'should be validation error');
    });
    
  });

  describe('Get film', () => {

    it('Should be valid response with status 200, when make requrest without query params', async () => {
      await createFilm('A');
      await createFilm('C');
      await createFilm('B');

      const { body } = await request(app)
        .get('/v1/film')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });


      assert(body.length === 3, 'should return array of films');
      assert(body[0].title === 'a' && body[1].title === 'b' && body[2].title === 'c', 'should return objects sorted ascending by default');
    });

    it('Should be valid response with status 200, when make requrest with descending sort', async () => {
      await createFilm('A');
      await createFilm('C');
      await createFilm('B');

      const { body } = await request(app)
        .get('/v1/film?sortBy=-1')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });


      assert(body.length === 3, 'should return array of films');
      assert(body[0].title === 'c' && body[1].title === 'b' && body[2].title === 'a', 'should return objects sorted descending by default');
    });

    it('Should be valid response with status 200, when make request with filters(title)', async () => {
      await createFilm('A');
      await createFilm('C');
      await createFilm('B');

      const { body } = await request(app)
        .get('/v1/film?name=a')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });

      assert(body.length === 1, 'should return array of films');
      assert(body[0].title === 'a', 'should return filtered array');
    });

    it('Should be valid response with status 200, when make request with filters(stars)', async () => {
      await createFilm('A', ['A', 'B', 'C']);
      await createFilm('C', ['W', 'J', 'C']);
      await createFilm('B', ['A', 'J']);

      const { body } = await request(app)
        .get('/v1/film?stars[]=A')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });


      assert(body.length === 2, 'should return array of films');
      assert(body[0].title === 'a' && body[1].title === 'b', 'should return films in which there are the desired actors');
    });
  });

  describe('Delete film', () => {
    
    it('Should delete film', async () => {
      await createFilm('a');

      const { body } = await request(app)
        .delete('/v1/film/a')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });

      assert.deepEqual(body, { message: 'Film successfully deleted', status: true });

      const result = await getFilm();

      assert(result.length === 0, 'should be empty array');

    });

    it('Should be valid response, when item does not exist', async () => {
      const { body } = await request(app)
        .delete('/v1/film/a')
        .expect('Content-Type', /json/)
        .expect(200)
        .catch(err => {
          console.log(err);
        });

      assert.deepEqual(body, { message: 'Film has not been deleted', status: false }, 'film should not be deleted');
    });
  });
});
