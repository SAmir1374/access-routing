import { useParams } from 'react-router-dom';

export const useAccessParams = <T extends Record<string, string>>() => {
  return useParams() as T;
};
