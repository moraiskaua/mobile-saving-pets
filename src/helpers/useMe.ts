import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useMe = (userId: string) => {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.me(userId),
  });

  return { user: data ?? null, isFetching, isLoading, refetch };
};
