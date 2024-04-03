import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';
import { TypeOfStatus } from '../../entities/types/TypeOfStatus';
import { httpClient } from '../httpClient';

export interface CreateReportParams {
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  userId: string;
}

export const create = async (params: CreateReportParams) => {
  const { data } = await httpClient.post('/reports', params);

  return data;
};
