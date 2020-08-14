import * as express from 'express';
import { router as user } from './user';
import { router as group } from './group';
import { router as message } from './message';

const router = express.Router({ mergeParams: true });

const routes = [
  {
    path: '/user',
    router: user
  },
  {
    path: '/message',
    router: message
  },
  {
    path: '/group',
    router: group
  }
];

routes.forEach(r => router.use(r.path, r.router));

export default router;
