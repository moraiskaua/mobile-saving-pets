import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';

export const useReportCardController = () => {
  const [report, setReport] = useState<Report>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditReportModalVisible, setIsEditReportModalVisible] =
    useState<boolean>(false);

  const tabHeight = useBottomTabBarHeight();

  const handlePressEdit = useCallback(async (reportId: string) => {
    const response = await reportsService.getById(reportId);
    setReport(response);
    setIsEditReportModalVisible(true);
  }, []);

  const handlePressDelete = useCallback(async (reportId: string) => {
    const response = await reportsService.getById(reportId);
    setReport(response);
    setIsDeleteModalVisible(true);
  }, []);

  return {
    tabHeight,
    isDeleteModalVisible,
    isEditReportModalVisible,
    report,
    setIsDeleteModalVisible,
    setIsEditReportModalVisible,
    handlePressEdit,
    handlePressDelete,
  };
};
