import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reportsService';

export const useReports = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportsService.getAll(),
    staleTime: Infinity,
  });

  return { reports: data ?? [], isFetching, isLoading };
};
