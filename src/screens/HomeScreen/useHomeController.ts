import { useState } from 'react';
import { useReports } from '../../helpers/useReports';

export const useHomeController = () => {
  const [isNewReportModalVisible, setIsNewReportModalVisible] =
    useState<boolean>(false);

  const { reports, isFetching, isLoading: isInitialLoading } = useReports();

  return {
    reports,
    isFetching,
    isInitialLoading,
    isNewReportModalVisible,
    setIsNewReportModalVisible,
  };
};
