import { useNavigation } from '@react-navigation/native';

export const useForgotPasswordController = () => {
  const { goBack } = useNavigation<any>();

  return {
    goBack,
  };
};
