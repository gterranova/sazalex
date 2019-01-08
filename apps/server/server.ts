import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
// import { Dispatcher } from 'autoinquirer';
import * as expressJwt from 'express-jwt';
import { adminRoutes } from './admin';
import { authRoutes } from './auth';
import { createDatasource } from './datasource';
import { apiRoutes } from './api';
import { uploadRoutes } from './upload';
import { contactsRoutes } from './contacts';

const config = { secret: 'my-secret', dispatcher: null };

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
(async function() {
  // jshint ignore:line
  const app = express();

  const PORT = process.env.PORT || 4000;
  const DIST_FOLDER = join(process.cwd(), 'dist/apps/client');
  const ADMIN_FOLDER = join(process.cwd(), 'dist/apps/admin');
  const UPLOAD_FOLDER = join(process.cwd(), 'dist/apps/client/assets');

  // * NOTE :: leave this as require() since this file is built Dynamically from webpack
  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
  } = require('../../dist/client-server/main');

  // Load the index.html file containing referances to your application bundle.
  const template = readFileSync(join(DIST_FOLDER, 'index.html'), 'utf8');

  config.dispatcher = await createDatasource(
    // jshint ignore:line
    join(DIST_FOLDER, 'assets/schema.json'),
    join(process.cwd(), 'dist', 'data.json')
  );

  app.use(
    cors({
      credentials: true
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger('dev'));
  app.use(
    expressJwt({
      secret: config.secret,
      credentialsRequired: false
    })
  );

  app.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
      // Our index.html
      document: template,
      url: options.req.url,
      // configure DI to make lazy-loading work differently
      // (we need to instantly render the view)
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'serverUrl', useValue: `http://localhost:${PORT}` }
      ]
    })
      .then(html => {
        callback(null, html);
      })
      .catch(err => console.error(err));
  });
  /*
  app.engine('html', () => ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));
  */
  app.set('view engine', 'html');
  app.set('views', DIST_FOLDER);

  // Catch all other routes and return the index file
  app.use('/admin', adminRoutes(ADMIN_FOLDER));
  app.use('/auth', authRoutes(config));
  app.use('/contacts', contactsRoutes());

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  app.use('/api/files', uploadRoutes(UPLOAD_FOLDER));
  app.use('/api', apiRoutes(config));

  // Server static files from /browser
  app.get(
    '*.*',
    express.static(DIST_FOLDER, {
      maxAge: '1y'
    })
  );

  // All regular routes use the Universal engine
  app.get('*', (req, res) => {
    res.render('index', { req });
  });

  // Start up the Node server
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });

  process.on('unhandledRejection', (err, p) => {
    console.log('An unhandledRejection occurred');
    console.log(`Rejected Promise: ${p}`);
    console.log(`Rejection:`, err);
    // dispatcher.close();
  });
})();
