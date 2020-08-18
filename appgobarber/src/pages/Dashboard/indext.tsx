import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <View>
            <Text onPress={signOut}>SAIR</Text>
        </View>
    );
};

export default Dashboard;
