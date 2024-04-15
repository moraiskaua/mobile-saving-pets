import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';
import { TypeOfStatus } from '../../entities/types/TypeOfStatus';
import { httpClient } from '../httpClient';

export interface UpdateReportParams {
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  userId: string;
}

export const update = async (reportId: string, params: UpdateReportParams) => {
  const { data } = await httpClient.put(`/reports/${reportId}`, params);

  return data;
};
