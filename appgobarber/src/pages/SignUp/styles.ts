import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Colors from '../../config/colors';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${Colors.text};
    font-family: 'RobotoSlab-Medium';
    margin: 65px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${Colors.primary};
    border-top-width: 1px;
    border-color: ${Colors.inputbg};
    padding: 16px 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const BackToSignInText = styled.Text`
    color: ${Colors.textlight};
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    margin-left: 16px;
`;
