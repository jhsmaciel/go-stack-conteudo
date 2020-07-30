import { Router } from 'express';
import SessionService from '../services/SessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
    const { email, password } = request.body;

    const sessionService = new SessionService();

    const { user, token } = await sessionService.validUserPassword({
        email,
        password,
    });

    delete user.password;

    return response.status(201).json({ user, token });
});

export default sessionsRoutes;
