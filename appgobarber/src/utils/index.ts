import { ValidationError, string } from 'yup';

export const getErrors = (error: ValidationError): Record<string, string> => {
    return error.inner.reduce((some, itemB) => {
        const err = JSON.parse(`{ "${itemB.path}": "${itemB.message}"}`);
        return {
            ...some,
            ...err,
        };
    }, {});
};

interface Errors {
    name: string;
    message: string;
}

export const getErrorsListString = (error: ValidationError): Errors[] => {
    const errorNameMessages: Errors[] = [];
    error.inner.forEach((erro) => {
        if (
            !errorNameMessages.some(
                (errorNameMessage) => errorNameMessage.name === erro.path,
            )
        ) {
            errorNameMessages.push({
                message: erro.message,
                name: erro.path,
            });
        }
    });
    return errorNameMessages;
};
