import { useQuery } from '@tanstack/react-query';
import { sheltersService } from '../services/sheltersService';

export const useShelters = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['shelters'],
    queryFn: () => sheltersService.getAll(),
    staleTime: Infinity,
  });

  return { shelters: data ?? [], isFetching, isLoading };
};
