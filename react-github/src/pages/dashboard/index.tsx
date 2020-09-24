import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import githubLogo from '../../assets/github-logo.svg';
import { Title, Form, Repositories, Error } from './styles';
import api from '../../services/api';

export interface Repository {
    id: number;
    full_name: string;
    description: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [messageError, setMessageError] = useState<string>('');
    const [repositories, setRepositories] = useState<Array<Repository>>(() => {
        const storagedRepositories = localStorage.getItem('@GitHubExplorer:repositories');
        if (storagedRepositories) return JSON.parse(storagedRepositories);
        return [];
    });

    useEffect(() => {
        localStorage.setItem('@GitHubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!search) {
            setMessageError('Digite o nome do repositório. Ex: facebook/react');
            return;
        }
        try {
            const response = await api.get<Repository>(`repos/${search}`);
            setRepositories([...repositories, response.data]);
            setSearch('');
            setMessageError('');
        } catch (error) {
            setMessageError('Repositório não encontrado.');
        }
    }

    return (
        <>
            <img src={githubLogo} alt="Github Explorer" />
            <Title>Explore repositórios no GitHub</Title>
            <Form hasError={!!messageError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>
            {messageError && <Error>{messageError}</Error>}
            <Repositories>
                {repositories.map((repo) => (
                    <Link key={repo.id} to={`/repository/${repo.full_name}`}>
                        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
