import React, { useRef, useCallback } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { string, object, ValidationError } from 'yup';
import { showMessage } from 'react-native-flash-message';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Colors from '../../config/colors';
import { getErrors, getErrorsListString } from '../../utils';
import api from '../../services/api';

interface SingUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(
        async (data: SingUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = object().shape({
                    name: string()
                        .required('O nome é obrigatório!')
                        .min(6, 'Nome deve ter no mínimo 6 digitos'),
                    email: string()
                        .required('E-mail obrigatório.')
                        .email('Digite um email válido.'),
                    password: string()
                        .min(6, 'Senha deve ter no mínimo 6 digitos')
                        .required('Senha obrigatória.'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await api.post('/user', data);

                showMessage({
                    message: 'Cadastro realizado com sucesso!',
                    description: 'Você já pode fazer login na aplicação.',
                    type: 'success',
                });
                navigation.navigate('SignIn', {
                    email: data.email,
                });
            } catch (error) {
                if (error instanceof ValidationError) {
                    formRef.current?.setErrors(getErrors(error));
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
                    message: 'Erro na criação do usuário.',
                    description:
                        'Ocorreu um erro ao fazer login, cheque as informações.',
                    type: 'danger',
                });
            }
        },
        [navigation],
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
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCorrect
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
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
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color={Colors.textlight} />
                <BackToSignInText>Voltar para logon </BackToSignInText>
            </BackToSignIn>
        </>
    );
};

export default SignUp;
