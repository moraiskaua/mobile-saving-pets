import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useShelterCardController = () => {
  const tabHeight = useBottomTabBarHeight();

  return { tabHeight };
};
