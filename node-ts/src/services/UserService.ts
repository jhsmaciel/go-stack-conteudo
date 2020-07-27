import { getRepository } from 'typeorm';
import User from '../models/User';

interface UsuarioForm {
    name: string,
    email: string,
    password: string
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
            }
        });

        if(emailExist) {
            throw new Error('Email address already used!')
        }
        const user = await userRepository.save({
            name,
            email,
            password,
        })
        return user;
    }
}
export default UserService;
