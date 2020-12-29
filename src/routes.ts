import { Router } from 'express';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router()

routes.get('/clients', UserController.listClients);
routes.post('/login', UserController.login);

// user authorized

routes.get('/telefones', authMiddleware, UserController.listPhones);

export default routes;