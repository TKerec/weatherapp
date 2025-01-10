import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Search from './screens/Search';
import { Provider as PaperProvider } from 'react-native-paper';
import UserSettings from './screens/UserSettings';
import AuthScreen from './screens/AuthScreen';
import Home from './screens/Home';
import SensorScreen from './screens/SensorScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator(); // prikaz oken z stackom

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
          <Stack.Navigator>
            <Stack.Screen
              name='AuthScreen'
              component={AuthScreen}
              options={{
                headerLeft: () => null,
                gestureEnabled: false, 
                headerBackVisible: false
              }}
            />
            <Stack.Screen name='Search' component={Search} 
            options={{
              headerLeft: () => null,
              gestureEnabled: false, 
              headerBackVisible: false
            }}/>
            <Stack.Screen name='UserSettings' component={UserSettings} />
            <Stack.Screen name='SensorScreen' component={SensorScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
