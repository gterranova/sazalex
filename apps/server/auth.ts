import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

function cleanUser(user) {
  const { password, confirmPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const authRoutes = config => {
  var authRouter = Router();

  authRouter.post('/jwt/create', async (req, res) => {
    const user = (await config.dispatcher.get('users')).find(
      u =>
        u.email === req.body.email &&
        bcrypt.compareSync(req.body.password, u.password)
    );
    if (user) {
      const token = jwt.sign({ uid: user._id }, config.secret);
      return res.send({
        user: cleanUser(user),
        token
      });
    }
    return res.sendStatus(401);
  });

  authRouter.get('/users', async (req: any, res) => {
    if (req.user) {
      const users = await config.dispatcher.get(`users`);
      if (users) {
        return res.send(users.map(u => cleanUser(u)));
      }
    }
    return res.sendStatus(401);
  });

  authRouter.post('/users', async (req, res) => {
    let user = (await config.dispatcher.get('users')).find(
      u => u.email === req.body.email
    );
    if (user) {
      // User exists
      return res.status(400).send({ message: 'User exists' });
    }
    try {
      const data = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 5)
      };
      user = await config.dispatcher.push('users', undefined, data);
    } catch (e) {
      // Server error
      return res.status(500).send({ message: e.toString() });
    }
    const token = jwt.sign({ uid: user._id }, config.secret);
    return res.send({
      user: cleanUser(user),
      token
    });
  });

  authRouter.get('/users/:id', async (req: any, res) => {
    if (req.user) {
      let user;
      const uri = `users/${req.params.id}`;

      if (req.query.schema) {
        user = await config.dispatcher.getSchema(uri);
        /*
                user = {
                    $id: "http://json-schema.org/draft-06/schema#", 
                    $schema: "http://json-schema.org/draft-06/schema#",
                    ...user
                };*/
      } else {
        user = await config.dispatcher.get(uri);
        user = cleanUser(user);
      }
      if (user) {
        return res.send(user);
      }
    }
    return res.sendStatus(401);
  });

  authRouter.put('/users/:id', async (req: any, res) => {
    if (req.user) {
      const user = await config.dispatcher.get(`users/${req.params.id}`);
      const { password, ...userWithoutPassword } = req.body;
      const newUser = {
        ...user,
        ...userWithoutPassword
      };
      if (password) {
        newUser['password'] = bcrypt.hashSync(password, 5);
      }
      await config.dispatcher.set(`users/${req.params.id}`, null, newUser);
      return res.send(newUser);
    }
    return res.sendStatus(401);
  });

  authRouter.delete('/users/:id', async (req: any, res) => {
    if (req.user) {
      console.log('config.dispatcher.del', `users/${req.params.id}`);
      await config.dispatcher.del(`users/${req.params.id}`);
      return res.send({ message: 'OK' });
    }
    return res.sendStatus(401);
  });

  authRouter.get('/me', async (req: any, res) => {
    if (req.user) {
      const user = await config.dispatcher.get(`users/${req.user.uid}`);
      if (user) {
        return res.send(cleanUser(user));
      }
    }
    return res.sendStatus(401);
  });
  return authRouter;
};
