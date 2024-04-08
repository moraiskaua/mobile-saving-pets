import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

export const useReportCardController = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const tabHeight = useBottomTabBarHeight();

  return { isModalVisible, tabHeight, setIsModalVisible };
};
