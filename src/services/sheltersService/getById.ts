import { Shelter } from '../../entities/Shelter';
import { httpClient } from '../httpClient';

type ShelterResponse = { data: Shelter };

export const getById = async (reportId: string) => {
  const { data } = await httpClient.get<ShelterResponse>(
    `/shelters/${reportId}`,
  );

  return data.data;
};
