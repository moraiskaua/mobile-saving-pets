import { useEffect, useState } from 'react';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';
import { useReports } from '../../helpers/useReports';

export const useHomeController = () => {
  // const [reports, setReports] = useState<Report[]>({} as Report[]);

  const {
    reports,
    isFetching,
    isLoading: isInitialLoading,
    refetch,
  } = useReports();

  return { reports, isFetching, isInitialLoading, refetch };
};
