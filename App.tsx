import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Search from './screens/Search';
import { Provider as PaperProvider } from 'react-native-paper';
import UserSettings from './screens/UserSettings';
import AuthScreen from './screens/AuthScreen';
import Home from './screens/Home';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <Home></Home>
      </PaperProvider>
    </SafeAreaProvider>
  );
};



export default App;
