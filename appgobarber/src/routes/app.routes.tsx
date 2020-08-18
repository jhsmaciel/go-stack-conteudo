import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../config/colors';
import Dashboard from '../pages/Dashboard/indext';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.primary },
        }}
    >
        <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
);

export default AppRoutes;
