import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Tabs from './src/navigation/Tab';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
