import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';

export const useDeleteModalController = (
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
    } catch {}
  };

  return { handleDeleteReport };
};
