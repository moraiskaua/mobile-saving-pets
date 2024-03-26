import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tab';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
