import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import { Shelter } from '../../entities/Shelter';
import { sheltersService } from '../../services/sheltersService';

export const useShelterCardController = () => {
  const [shelter, setShelter] = useState<Shelter>();
  const [isContactShelterModalVisible, setIsContactShelterModalVisible] =
    useState<boolean>(false);

  const tabHeight = useBottomTabBarHeight();

  const handlePressContact = useCallback(async (reportId: string) => {
    const response = await sheltersService.getById(reportId);
    setShelter(response);
    setIsContactShelterModalVisible(true);
  }, []);

  return {
    shelter,
    tabHeight,
    isContactShelterModalVisible,
    setIsContactShelterModalVisible,
    handlePressContact,
  };
};
