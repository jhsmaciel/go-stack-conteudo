import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';
import Colors from '../../config/colors';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, defaultValue, ...rest },
    ref,
) => {
    const inputElementRef = useRef<any>(null);

    const field = useField(name);
    const { error, fieldName, registerField } = field;

    const inputValueRef = useRef<InputValueReference>({
        value: defaultValue || field.defaultValue || '',
    });

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isFilled, setIsFilled] = useState<boolean>(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        },
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(a: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({
                    text: value,
                });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);
    return (
        <Container isFocused={isFocused} isErrored={!!error}>
            <Icon
                name={icon}
                size={20}
                color={
                    isFilled || isFocused
                        ? Colors.secondary
                        : Colors.placeholder
                }
            />
            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholderTextColor={Colors.placeholder}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
};
export default forwardRef(Input);
