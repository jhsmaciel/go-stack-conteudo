import { Router } from 'express';
import SessionService from '../services/SessionService';
const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const sessionService = new SessionService();

        const { user, token } = await sessionService.validUserPassword({ email, password })

        delete user.password

        return response.status(201).json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message})
    }
});

export default sessionsRoutes;
