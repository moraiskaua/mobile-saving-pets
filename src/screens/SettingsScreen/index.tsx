import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <Header />
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
