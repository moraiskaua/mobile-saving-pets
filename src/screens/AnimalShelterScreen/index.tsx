import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useAnimalShelterController } from './useAnimalShelterController';
import ShelterCard from '../../components/ShelterCard';

interface AnimalShelterProps {}

const AnimalShelter: React.FC<AnimalShelterProps> = ({}) => {
  const { shelters, isInitialLoading } = useAnimalShelterController();

  return (
    <SafeAreaView className="flex-1">
      <Header />

      {!isInitialLoading && (
        <View className="flex-1">
          {shelters.length > 0 ? (
            <ShelterCard />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Image source={require('../../assets/no-reports.png')} />

              <Text className="mt-6 text-gray-700">
                Não encontramos nenhum abrigo.
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AnimalShelter;
