import { useEffect, useState } from 'react';
import { reportsService } from '../../services/reportsService';
import { Report } from '../../entities/Report';

export const useHomeController = () => {
  const [reports, setReports] = useState<Report[]>({} as Report[]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportsService.getAll();
        setReports(response);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return { reports };
};
