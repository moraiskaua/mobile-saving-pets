import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Report } from '../../entities/Report';
import { reportsService } from '../../services/reportsService';
import { useQueryClient } from '@tanstack/react-query';
import { reportTypeOptions } from '../../entities/consts/reportTypeOptions';
import { statusOptions } from '../../entities/consts/statusOptions';
import Toast from 'react-native-toast-message';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  type: z.enum(['ABANDONO', 'AGRESSAO', 'NEGLIGENCIA', 'EXPLORACAO', 'OUTROS']),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  location: z.string().min(1, 'Localização é obrigatória.'),
  status: z.enum(['EM_ABERTO', 'EM_ANDAMENTO', 'ATENDIDO']),
  userId: z.string().min(1),
  images: z.array(z.string()),
});

export const useEditReportModalController = (
  report: Report,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...report,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await reportsService.update(report.id, data);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      Toast.show({
        type: 'success',
        text1: 'Denúncia editada',
        swipeable: true,
        visibilityTime: 1800,
      });
      onClose();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar denúncia',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  return {
    reportTypeOptions,
    statusOptions,
    errors,
    control,
    setValue,
    handleSubmit,
    onSubmit,
  };
};
