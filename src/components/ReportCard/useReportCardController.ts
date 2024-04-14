import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

export const useReportCardController = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditReportModalVisible, setIsEditReportModalVisible] =
    useState<boolean>(false);
  const tabHeight = useBottomTabBarHeight();

  return {
    isDeleteModalVisible,
    isEditReportModalVisible,
    tabHeight,
    setIsDeleteModalVisible,
    setIsEditReportModalVisible,
  };
};
