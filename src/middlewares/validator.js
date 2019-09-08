import fs from 'fs';
import yaml from 'js-yaml';
import { OpenApiValidator } from 'express-openapi-validate';

export const oapi = new OpenApiValidator(
  yaml.safeLoad(fs.readFileSync(`${__dirname}/../docs/openapi.yaml`), 'utf-8')
);
