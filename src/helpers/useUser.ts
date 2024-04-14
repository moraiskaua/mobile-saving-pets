import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useUser = (userId: string) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.me(userId),
    staleTime: Infinity,
  });

  return { user: data ?? null, isFetching, isLoading };
};
