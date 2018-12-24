import * as express from 'express';
import { join } from 'path';

export const adminRoutes = adminPath => {
  var adminRouter = express.Router();

  // Server static files from /browser
  adminRouter.get(
    '*.*',
    express.static(adminPath, {
      maxAge: '1y'
    })
  );

  // Catch all other routes and return the index file
  adminRouter.get('*', (req, res) => {
    res.sendFile(join(adminPath, 'index.html'));
  });
  return adminRouter;
};
