import { Router } from 'express';
import testRouter from './test.routes';
import graphqlRouter from './graphql.routes';

const routes = Router();

routes.use('/test', testRouter);
routes.use('/graphql', graphqlRouter);

export default routes;