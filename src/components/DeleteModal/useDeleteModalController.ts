import { reportsService } from '../../services/reportsService';

export const useDeleteModalController = () => {
  const handleDeleteReport = (id: string) => {
    reportsService.remove(id);
  };

  return { handleDeleteReport };
};
