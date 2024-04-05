import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useHomeController } from './useHomeController';
import ReportCard from '../../components/ReportCard';
import { Report } from '../../entities/Report';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  // const { reports } = useHomeController();
  const reports: Report[] = [];

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <View className="flex-1">
        {reports.length > 0 ? (
          <ReportCard
            reports={reports}
            onAction={() => {}}
            onDelete={() => {}}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image source={require('../../assets/no-reports.png')} />

            <Text className="mt-6 text-gray-700">
              Não encontramos nenhuma denúncia.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
