import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

import {plopDir} from 'plop-dir';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @param {import('plop').NodePlopAPI} plop */
// eslint-disable-next-line import/no-default-export
export default async function run(plop) {
  plop.setGenerator(
    'scss-migration',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/scss-migration'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. scss-replace-function)',
          validate: (input) => validateMigrationName(plop, input),
        },
      ],
    }),
  );

  plop.setGenerator(
    'typescript-migration',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/typescript-migration'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. component-replace-prop)',
          validate: (input) => validateMigrationName(plop, input),
        },
      ],
    }),
  );
}

function validateMigrationName(plop, input) {
  const migrationName = plop.renderString('{{kebabCase input}}', {
    input,
  });

  return (
    !fs.existsSync(path.join(__dirname, `./src/migrations/${migrationName}`)) ||
    'That migration name already exists'
  );
}
