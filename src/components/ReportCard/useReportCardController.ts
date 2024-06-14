import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';

export const useReportCardController = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditReportModalVisible, setIsEditReportModalVisible] =
    useState<boolean>(false);

  const tabHeight = useBottomTabBarHeight();

  const handlePressEdit = async (reportId: string) => {
    const response = await reportsService.getById(reportId);
    setReport(response);
    setIsEditReportModalVisible(true);
  };

  const handlePressDelete = async (reportId: string) => {
    const response = await reportsService.getById(reportId);
    setReport(response);
    setIsDeleteModalVisible(true);
  };

  const handlePressEditModalClose = () => {
    setReport(null);
    setIsEditReportModalVisible(false);
  };

  const handlePressDeleteModalClose = () => {
    setReport(null);
    setIsDeleteModalVisible(false);
  };

  return {
    tabHeight,
    isDeleteModalVisible,
    isEditReportModalVisible,
    report,
    handlePressEdit,
    handlePressDelete,
    handlePressEditModalClose,
    handlePressDeleteModalClose,
  };
};
