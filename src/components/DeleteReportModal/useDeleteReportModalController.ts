import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';
import Toast from 'react-native-toast-message';

export const useDeleteReportModalController = (
  report: Report,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();

  const { mutateAsync: removeReport } = useMutation({
    mutationFn: async (reportId: string) => reportsService.remove(reportId),
  });

  const handleDeleteReport = async () => {
    try {
      await removeReport(report.id);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      onClose();
      Toast.show({
        type: 'success',
        text1: 'Denúncia excluída',
        swipeable: true,
        visibilityTime: 1800,
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao excluir denúncia',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  return { handleDeleteReport };
};
