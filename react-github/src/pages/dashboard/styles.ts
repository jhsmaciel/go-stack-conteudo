import styled from 'styled-components';
import { shade } from 'polished';
import { colors } from '../../config';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: ${colors.primary};
    margin-top: 80px;
    max-width: 450px;
    line-height: 56px;
`;

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 2px solid ${({ hasError }) => (hasError ? colors.error : '#FFF')};
        border-right: 0;
        border-radius: 5px 0 0 5px;
        color: ${colors.primary};

        &::placeholder {
            color: ${colors.disabled};
        }
    }

    button {
        width: 210px;
        height: 70px;
        background: ${colors.success};
        border-radius: 0 5px 5px 0;
        border: 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, colors.success)};
        }
    }
`;

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;
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

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
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

export const Error = styled.span`
    display: block;
    color: ${colors.error};
    margin-top: 8px;
`;
