import 'dotenv/config';
import 'reflect-metadata';

import Application from './server/application';
(async () => {
  const application = new Application();
  await application.connect();
  await application.init();
})();
