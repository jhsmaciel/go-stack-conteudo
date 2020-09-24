import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import githubLogo from '../../assets/github-logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import { Repository as RP } from '../dashboard';
import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface RepositoryInfo extends RP {
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    };
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<RepositoryInfo | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function loadValues() {
            const [repositoryResp, issuesResp] = await Promise.all([
                api.get<RepositoryInfo>(`/repos/${params.repository}`),
                api.get<Issue[]>(`/repos/${params.repository}/issues`),
            ]);
            setRepository(repositoryResp.data);
            setIssues(issuesResp.data);
        }

        loadValues();
    }, [params.repository]);
    return (
        <>
            <Header>
                <img src={githubLogo} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map((issue) => {
                    return (
                        <a key={issue.id} href={issue.html_url}>
                            <div>
                                <strong>{issue.title}</strong>
                                <p>{issue.user.login}</p>
                            </div>
                            <FiChevronRight size={20} />
                        </a>
                    );
                })}
            </Issues>
        </>
    );
};

export default Repository;
