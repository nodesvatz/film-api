import BaseModel from './base';

class FilmModel extends BaseModel {

  constructor(db) {
    super();
    this.model = db.collection('films');
  }
}

export default FilmModel;