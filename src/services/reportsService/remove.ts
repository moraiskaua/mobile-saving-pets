import { httpClient } from '../httpClient';

export const remove = async (reportId: string) => {
  const { data } = await httpClient.delete(`/reports/${reportId}`);

  return data;
};
