import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import UserService from '../services/UserService';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig);
const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const userService = new UserService();
    const passwordCrypted = await hash(password, 8);
    const user = await userService.create({
        name,
        email,
        password: passwordCrypted,
    });
    delete user.password;
    return response.status(201).json(user);
});

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userService = new UserService();
        const user = await userService.updateUserAvatar({
            avatarFileName: request.file.filename,
            userId: response.locals.user.id as string,
        });
        delete user.password;
        return response.json(user);
    },
);

export default usersRoutes;
