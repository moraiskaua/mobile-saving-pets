import { useShelters } from '../../helpers/useShelters';

export const useAnimalShelterController = () => {
  const { shelters, isLoading: isInitialLoading } = useShelters();

  return { shelters, isInitialLoading };
};
