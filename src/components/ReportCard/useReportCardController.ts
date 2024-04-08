import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

export const useReportCardController = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const tabHeight = useBottomTabBarHeight();

  return {
    isDeleteModalVisible,
    isEditModalVisible,
    tabHeight,
    setIsDeleteModalVisible,
    setIsEditModalVisible,
  };
};
