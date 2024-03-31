import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './src/Main';

const App = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
