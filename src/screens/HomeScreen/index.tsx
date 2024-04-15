import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useHomeController } from './useHomeController';
import ReportCard from '../../components/ReportCard';
import Fab from '../../components/Fab';
import { useNavigation } from '@react-navigation/native';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { reports, isFetching, isInitialLoading } = useHomeController();
  const { navigate } = useNavigation<any>();
  return (
    <SafeAreaView className="flex-1 relative">
      <Header />

      {!isInitialLoading && (
        <View className="flex-1">
          {reports.length > 0 ? (
            <ReportCard reports={reports} />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Image source={require('../../assets/no-reports.png')} />

              <Text className="mt-6 text-gray-700">
                Não encontramos nenhuma denúncia.
              </Text>
            </View>
          )}
        </View>
      )}

      <Fab onPress={() => navigate('NewReport')} />
    </SafeAreaView>
  );
};

export default HomeScreen;
