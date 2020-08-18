import React, { useCallback, useRef } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { object, string, ValidationError } from 'yup';
import { showMessage } from 'react-native-flash-message';
import logoImg from '../../assets/logo.png';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Colors from '../../config/colors';
import { getErrors, getErrorsListString } from '../../utils';
import { useAuth } from '../../hooks/auth';

interface SingInFormData {
    email: string;
    password: string;
}

interface SignInProps {
    route: {
        params: {
            email?: string;
        };
    };
}

const SignIn: React.FC<SignInProps> = ({ route }) => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const passwordInputRef = useRef<TextInput>(null);
    const { signIn, user } = useAuth();
    const handleSignIn = useCallback(
        async (data: SingInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = object().shape({
                    email: string()
                        .required('E-mail obrigatório.')
                        .email('Digite um email válido.'),
                    password: string().required('Senha obrigatória.'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn(data);
            } catch (error) {
                if (error instanceof ValidationError) {
                    const messageErrors = getErrors(error);
                    formRef.current?.setErrors(messageErrors);
                    showMessage({
                        message: 'Campos inválidos!',
                        description: getErrorsListString(error)
                            .map((errorMN) => errorMN.message)
                            .join('\n'),
                        type: 'danger',
                    });
                    return;
                }
                showMessage({
                    message: 'Erro na autenticação.',
                    description:
                        'Ocorreu um erro ao fazer login, cheque as credenciais.',
                    type: 'danger',
                });
            }
        },
        [signIn],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu logon</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                defaultValue={(() => {
                                    const email = route?.params?.email;
                                    return email || '';
                                })()}
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Entrar
                            </Button>
                        </Form>
                        <ForgotPassword>
                            <ForgotPasswordText onPress={console.log}>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color={Colors.secondary} />
                <CreateAccountButtonText>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;
