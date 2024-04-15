import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Report } from '../../entities/Report';
import { reportsService } from '../../services/reportsService';
import { useQueryClient } from '@tanstack/react-query';

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

  const typeOptions = [
    { value: 'ABANDONO', label: 'Abandono' },
    { value: 'AGRESSAO', label: 'Agressão' },
    { value: 'NEGLIGENCIA', label: 'Negligência' },
    { value: 'EXPLORACAO', label: 'Exploração' },
    { value: 'OUTROS', label: 'Outros' },
  ];

  const statusOptions = [
    { value: 'EM_ABERTO', label: 'Em Aberto' },
    { value: 'EM_ANDAMENTO', label: 'Em Andamento' },
    { value: 'ATENDIDO', label: 'Atendido' },
  ];

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...report },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const res = await reportsService.update(report.id, data);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    typeOptions,
    statusOptions,
    errors,
    control,
    setValue,
    handleSubmit,
    onSubmit,
  };
};
