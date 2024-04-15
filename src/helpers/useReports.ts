import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reportsService';

export const useReports = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportsService.getAll(),
    staleTime: 350,
  });

  return { reports: data ?? [], isFetching, isLoading };
};
