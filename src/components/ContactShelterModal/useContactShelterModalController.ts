import { Linking } from 'react-native';

export const useContactShelterModalController = () => {
  const handleOpenPhone = (phoneNumber: string) => {
    Linking.openURL(`tel:+55:${phoneNumber.replace(/\D/g, '')}`);
  };

  return { handleOpenPhone };
};
