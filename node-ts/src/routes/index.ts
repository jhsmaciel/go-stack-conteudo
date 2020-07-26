import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
    const { body } = request;
    return response.json(body);
});

export default routes;
