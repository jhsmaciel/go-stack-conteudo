import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface UsuarioForm {
    name: string;
    email: string;
    password: string;
}

interface UpdateAvatarForm {
    userId: string;
    avatarFileName: string;
}
class UserService {
    /**
     * Criar Usuário
     */
    public async create({ name, email, password }: UsuarioForm): Promise<User> {
        const userRepository = getRepository(User);

        const emailExist = await userRepository.findOne({
            where: {
                email,
            },
        });

        if (emailExist) {
            throw new AppError('Email address already used.');
        }
        const user = await userRepository.save({
            name,
            email,
            password,
        });
        return user;
    }

    public async updateUserAvatar({
        userId,
        avatarFileName,
    }: UpdateAvatarForm): Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const fileExist = await fs.promises.stat(userAvatarFilePath);
            if (fileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        const userUpdated = await userRepository.save(user);
        return userUpdated;
    }
}
export default UserService;
