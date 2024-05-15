import { Linking, Platform } from 'react-native';
import { useShelters } from '../../helpers/useShelters';

export const useAnimalShelterController = () => {
  const { shelters, isLoading: isInitialLoading } = useShelters();
  let url: string;

  const handleOpenLocation = (label: string) => {
    if (Platform.OS === 'ios') {
      url = `maps:?q=${label}`;
    } else if (Platform.OS === 'android') {
      url = `geo:?q=${label}`;
    }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(
          `https://www.google.de/maps/search/?api=1&query=${label}`,
        );
      }
    });
  };

  return { shelters, isInitialLoading, handleOpenLocation };
};
