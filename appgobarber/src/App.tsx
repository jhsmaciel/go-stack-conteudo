import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "./config/colors";
import AuthRoutes from "./routes";

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.primary}
            />
            <View style={{ flex: 1, backgroundColor: Colors.primary }}>
                <AuthRoutes />
            </View>
        </NavigationContainer>
    );
};

export default App;
