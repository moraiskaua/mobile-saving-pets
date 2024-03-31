import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <Header />
      <Text className="text-black text-center">HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
