import fs from 'fs';

export const parser = (filename) => {
  try {
    return new Promise((resolve, reject) => {
      if (!filename) return reject(new Error('File have not passed'));
      fs.readFile(`${process.cwd()}/${filename}`, 'utf8', (err, data) => {
        if (err) reject(err);
        const escape = '\n';
        const preparedData = [];
        const nextTick = true;
        let colonInitialIndex = 0;
        let formattedObj = {};
  
        const collection = data.substring(data.indexOf(escape, data.indexOf('Content-Type')), data.indexOf(escape, data.lastIndexOf('Stars'))).trim();
        let colon = collection.indexOf(':', colonInitialIndex);
        let lineBreak = collection.indexOf('\n', colon);
  
        do {
          colon = collection.indexOf(':', colonInitialIndex);
          lineBreak = collection.indexOf('\n', colon);
  
          if (colon === -1 || lineBreak === - 1) break;
  
          if (colon && lineBreak) {
            let key = collection.substring(colonInitialIndex, colon).toLowerCase().trim() === 'release year' ? 'release' : collection.substring(colonInitialIndex, colon).toLowerCase().trim();
            let value = key === 'stars' ? collection.substring(colon + 1, lineBreak).trim().split(', ') : collection.substring(colon + 1, lineBreak).trim();
  
            formattedObj[key] = value;
            colonInitialIndex = lineBreak;
          }
  
          if (Object.keys(formattedObj).length === 4) {
            preparedData.push(formattedObj);
            formattedObj = {};
          }
  
        } while(nextTick);

        if (preparedData.length === 0) return reject(new Error('Not valid file format'));
  
        resolve(preparedData);
      });
    });
  } catch(err) {
    throw err;
  }
};