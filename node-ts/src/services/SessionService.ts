import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config';

interface AuthenticationForm {
    email: string,
    password: string
}

interface AuthenticationDTO {
    user: User,
    token: string
}

class SessionService {
    /**
     * Validar usuário
     */
    public async validUserPassword({  email, password }: AuthenticationForm): Promise<AuthenticationDTO> {
        const userRepository = getRepository(User);

        const userExist = await userRepository.findOne({
            where: {
                email,
            }
        });

        if(!userExist) {
            throw new Error('Incorrect User/Password combination!')
        }

        const passwordMatched = await compare(password, userExist.password)

        if(!passwordMatched) {
            throw new Error('Incorrect User/Password combination!')
        };

        const { expiresIn, secret } = config.jwt;

        const token = sign({ }, secret, {
            subject: userExist.id,
            expiresIn
        });

        return {
            user: userExist,
            token,
        };
    }
}
export default SessionService;
