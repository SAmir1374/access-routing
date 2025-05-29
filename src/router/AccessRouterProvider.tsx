import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { RouteItemType } from '@/types/RouterType';
import { ShareDataProvider } from '@/provider';
import ProtectedRouter from './ProtectedRouter';

type Props = {
  children: ReactNode;
  config: {
    allRoutes?: RouteItemType[];
    userRoles?: string[];
    groupRole?: string[];
    Loader?: React.ReactElement;
    token?: string;
    loginUrl?: string;
  };
};

const AccessRouterProvider = ({
  children,
  config = {
    allRoutes: [],
    groupRole: [],
    userRoles: [],
    token: '',
    loginUrl: '/login',
  },
}: Props) => {
  return (
    <BrowserRouter>
      <ShareDataProvider
        initialData={{
          ...config,
          allowedRoutes: ProtectedRouter(
            config?.allRoutes ?? [],
            config.userRoles ?? [],
            config.groupRole ?? [],
            config.token ?? ''
          ),
        }}
      >
        {children}
      </ShareDataProvider>
    </BrowserRouter>
  );
};

export default AccessRouterProvider;
