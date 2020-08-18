import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Colors from '../../config/colors';

export const Container = styled(RectButton)`
    height: 60px;
    background: ${Colors.secondary};
    border-radius: 10px;
    margin-top: 8px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: ${Colors.primary};
    font-size: 18px;
`;
