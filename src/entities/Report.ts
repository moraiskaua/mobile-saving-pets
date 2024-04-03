import { TypeOfAbuse } from './types/TypeOfAbuse';
import { TypeOfStatus } from './types/TypeOfStatus';

export interface Report {
  id: string;
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  userId: string;
  createdAt: string;
}
