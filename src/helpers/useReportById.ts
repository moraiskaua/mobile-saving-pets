import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reportsService';

export const useReportById = (reportId: string) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports', 'reportId'],
    queryFn: () => reportsService.getById(reportId),
  });

  return { report: data ?? null, isFetching, isLoading };
};
