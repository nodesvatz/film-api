import assert from 'assert';
import { parser } from '../../src/helpers/parse_txt';

describe('Parser', () => {
  it('Parse txt file with headers', async () => {
    const result = await parser('sample_with_headers.txt');

    for (let i = 0; i < result.length; i += 1) {
      assert.deepEqual(Object.keys(result[i]), ['title', 'release', 'format', 'stars'], );
    }
  });

  it('Parse txt file without headers', async () => {
    const result = await parser('sample.txt');

    for (let i = 0; i < result.length; i += 1) {
      assert.deepEqual(Object.keys(result[i]), ['release', 'format', 'stars', 'title'], );
    }
  });

  it('Should be error, when not passed txt file', async () => {
    try {
      await parser();
    } catch (err) {
      assert.deepEqual(err, 'File have not passed', 'should be error');
    }
  });
});