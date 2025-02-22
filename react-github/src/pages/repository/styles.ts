import styled from 'styled-components';
import { colors } from '../../config';

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: ${colors.secondary};
        transition: color 0.2s;
        &:hover {
            color: #666;
        }
        svg {
            margin-right: 4px;
        }
    }
`;

export const RepositoryInfo = styled.section`
    margin-top: 80px;

    header {
        display: flex;
        align-items: center;

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }

        div {
            margin-left: 24px;

            strong {
                font-size: 36px;
                color: ${colors.info};
            }

            p {
                font-size: 18px;
                color: ${colors.secondary};
                margin-top: 4px;
            }
        }
    }

    ul {
        display: flex;
        list-style: none;
        margin-top: 40px;

        li {
            & + li {
                margin-left: 80px;
            }
            strong {
                display: block;
                font-size: 36px;
                color: ${colors.info};
            }

            span {
                display: block;
                margin-top: 4px;
                color: #6c6c80;
            }
        }
    }
`;

export const Issues = styled.div`
    margin-top: 80px;

    a {
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        &:hover {
            transform: translate(10px);
        }

        & + a {
            margin-top: 16px;
        }

        div {
            margin-left: 16px;
            flex: 1;
            strong {
                font-size: 20px;
                color: ${colors.info};
            }

            p {
                font-size: 18px;
                color: ${colors.secondary};
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: ${colors.svg};
        }
    }
`;
