import { useReports } from '../../helpers/useReports';

export const useHomeController = () => {
  const { reports, isFetching, isLoading: isInitialLoading } = useReports();

  return { reports, isFetching, isInitialLoading };
};
