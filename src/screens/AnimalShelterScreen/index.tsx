import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

interface AnimalShelterProps {}

const AnimalShelter: React.FC<AnimalShelterProps> = ({}) => {
  return (
    <SafeAreaView>
      <Header />
      <Text className="text-black text-center">AnimalShelter</Text>
    </SafeAreaView>
  );
};

export default AnimalShelter;
