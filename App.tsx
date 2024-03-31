import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import Main from './src/Main';

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
