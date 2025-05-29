import { useNavigate } from 'react-router-dom';

export const useAccessNavigate = () => {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
  };

  return { go };
};
