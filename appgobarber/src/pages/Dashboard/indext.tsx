import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';
import Colors from '../../config/colors';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    return (
        <View>
            <Text onPress={signOut}>SAIR</Text>
            <Text
                style={{
                    color: Colors.textlight,
                    fontSize: 20,
                    paddingHorizontal: 10,
                }}
            >
                {Object.entries(user).map(([key, val]) => {
                    return `${key}: ${val}\n`;
                })}
            </Text>
        </View>
    );
};

export default Dashboard;
