import { Report } from '../../entities/Report';
import { httpClient } from '../httpClient';

export type SortDirection = 'asc' | 'desc';

type ReportsResponse = { data: Array<Report> };

export type ReportFilters = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
};

export const getAll = async (filters?: ReportFilters) => {
  const { data } = await httpClient.get<ReportsResponse>('/reports', {
    params: filters,
  });

  return data.data;
};
