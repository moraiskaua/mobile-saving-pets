import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHomeController } from './useHomeController';
import ReportCard from '../../components/ReportCard';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const tabHeight = useBottomTabBarHeight();
  const { reports } = useHomeController();

  return (
    <SafeAreaView>
      <Header />

      <View className="h-full p-3">
        {reports.length > 0 ? (
          <ReportCard
            reports={reports}
            onAction={() => {}}
            onDelete={() => {}}
          />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
