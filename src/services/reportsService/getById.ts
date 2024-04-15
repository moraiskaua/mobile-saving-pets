import { Report } from '../../entities/Report';
import { httpClient } from '../httpClient';

type ReportResponse = { data: Report };

export const getById = async (reportId: string) => {
  const { data } = await httpClient.get<ReportResponse>(`/reports/${reportId}`);

  return data.data;
};
