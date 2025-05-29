import type { ReactNode, ReactElement } from 'react';
import { createContext, useState, useContext } from 'react';
import type { RouteItemType } from '@/types/RouterType';

type ShareDataContextType = {
  state: ShareDataType;
  setState: React.Dispatch<React.SetStateAction<ShareDataType>>;
};

type ShareDataType = {
  allRoutes?: RouteItemType[];
  userRoles?: string[];
  groupRole?: string[];
  Loader?: ReactElement;
  allowedRoutes?: RouteItemType[];
  token?: string;
};

type ProviderType = {
  children: ReactNode;
  initialData?: ShareDataType;
};

const ShareDataContext = createContext<ShareDataContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useShareData = () => {
  const context = useContext(ShareDataContext);
  if (!context) {
    throw new Error('useShareData must be used within a ShareDataProvider');
  }
  return context;
};

export function ShareDataProvider({ children, initialData = {} }: ProviderType) {
  const [state, setState] = useState<ShareDataType>(initialData);

  return (
    <ShareDataContext.Provider value={{ state, setState }}>{children}</ShareDataContext.Provider>
  );
}
