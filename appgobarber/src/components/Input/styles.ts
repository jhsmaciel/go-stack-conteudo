import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from '../../config/colors';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: ${Colors.inputbg};
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 1px;
    border-color: ${({ isErrored, isFocused }) => {
        if (isFocused) {
            return Colors.secondary;
        }
        if (isErrored) {
            return Colors.error;
        }
        return Colors.inputbg;
    }};
    flex-direction: row;
    align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: ${Colors.textlight};
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 16px;
`;
