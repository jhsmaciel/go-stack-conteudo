import React from 'react';
import { View, StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import Colors from './config/colors';
import AuthRoutes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.primary}
            />
            <AppProvider>
                <View style={{ flex: 1, backgroundColor: Colors.primary }}>
                    <AuthRoutes />
                </View>
            </AppProvider>
            <FlashMessage
                position="bottom"
                titleStyle={{ fontFamily: 'RobotoSlab-Regular' }}
                textStyle={{ fontFamily: 'RobotoSlab-Regular' }}
            />
        </NavigationContainer>
    );
};

export default App;
