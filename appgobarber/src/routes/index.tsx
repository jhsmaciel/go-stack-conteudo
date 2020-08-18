import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';
import Colors from '../config/colors';

const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                }}
            >
                <ActivityIndicator size="large" color={Colors.placeholder} />
            </View>
        );
    }
    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
