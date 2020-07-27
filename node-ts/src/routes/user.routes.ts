import { Router } from 'express';
import UserService from '../services/UserService';
import { hash } from 'bcryptjs'
const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const userService = new UserService();
        const passwordCrypted = await hash(password, 8);
        const user = await userService.create({ name, email, password: passwordCrypted })
        delete user.password;
        return response.status(201).json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message})
    }
});

export default usersRoutes;
