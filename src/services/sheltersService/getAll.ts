import { Shelter } from '../../entities/Shelter';
import { httpClient } from '../httpClient';

export type SortDirection = 'asc' | 'desc';

type SheltersResponse = { data: Array<Shelter> };

export type ShelterFilters = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
};

export const getAll = async (filters?: ShelterFilters) => {
  const { data } = await httpClient.get<SheltersResponse>('/shelters', {
    params: filters,
  });

  return data.data;
};
