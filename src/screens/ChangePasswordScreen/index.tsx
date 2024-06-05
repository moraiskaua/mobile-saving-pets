import { SafeAreaView, Text } from 'react-native';
import { useChangePasswordController } from './useChangePasswordController';

interface ChangePasswordScreenProps {}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = () => {
  const {} = useChangePasswordController();

  return (
    <SafeAreaView className="flex-1 items-center">
      <Text>teste</Text>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
