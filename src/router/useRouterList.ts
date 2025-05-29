import { useShareData } from '@/provider'

export const useAccessRouting = () => {
  const { state } = useShareData()

  return {
    allowRouter : state.allowedRoutes
  }
};
