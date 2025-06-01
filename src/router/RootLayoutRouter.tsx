import { useShareData } from '@/provider';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedLayoutRoute } from './ProtectedRouter';
import { flattenRouters } from '../utils/flattenRouters';
import { Suspense, useEffect, useMemo, useState } from 'react';
import PageWrapper from './PageTitleWrapper';
import type { RootLayoutType } from '@/types/RouterType';

type RootLayoutRouterType = {
  token?: string;
  Loader?: React.ReactElement;
  loginUrl?: string;
  NotFoundPage?: React.ComponentType;
  notFoundIsPublic?: boolean;
};

type RoutingStatus = 'checking' | 'redirectToLogin' | 'redirectToHome' | 'render';

const DefaultLoader = <div />;

function RootLayoutRouter({
  Loader,
  NotFoundPage,
  loginUrl = '/login',
  notFoundIsPublic,
  token = '',
}: RootLayoutRouterType) {
  const { state } = useShareData();
  const location = useLocation();

  const [routingStatus, setRoutingStatus] = useState<RoutingStatus>('checking');

  const allowedRoutes = useMemo(() => {
    if (Array.isArray(state.allRoutes) && 'routers' in (state.allRoutes[0] ?? {})) {
      return ProtectedLayoutRoute(
        flattenRouters(state.allRoutes as RootLayoutType[]),
        state.userRoles ?? [],
        state.groupRole ?? [],
        token
      );
    }
    return [];
  }, [state.allRoutes, state.userRoles, state.groupRole, token]);

  useEffect(() => {
    const currentPath = location.pathname;

    const matchedRoute = allowedRoutes.find(
      (route) => route.path === currentPath || `${route.path}/${route.path}` === currentPath
    );

    const isPublic = matchedRoute?.isPublic ?? false;
    const isUnknownPath = !matchedRoute;

    if (token && currentPath === loginUrl) {
      setRoutingStatus('redirectToHome');
    } else if (!token) {
      if (!isPublic && !(isUnknownPath && notFoundIsPublic)) {
        setRoutingStatus('redirectToLogin');
      } else {
        setRoutingStatus('render');
      }
    } else {
      setRoutingStatus('render');
    }
  }, [token, loginUrl, location.pathname, allowedRoutes, notFoundIsPublic]);

  if (routingStatus === 'checking') return null;
  if (routingStatus === 'redirectToLogin')
    return (
      <Navigate
        to={loginUrl}
        replace
      />
    );
  if (routingStatus === 'redirectToHome')
    return (
      <Navigate
        to="/"
        replace
      />
    );

  return (
    <Suspense fallback={Loader ?? DefaultLoader}>
      <Routes>
        {allowedRoutes.map(
          ({ path, rootPath, layout: Layout, pageComponents: Page, pageTitle }, index) => (
            <Route
              key={index}
              path={rootPath}
              element={<Layout />}
            >
              <Route
                index
                path={path}
                element={
                  <PageWrapper pageTitle={pageTitle}>
                    <Page />
                  </PageWrapper>
                }
              />
            </Route>
          )
        )}

        {NotFoundPage && (
          <Route
            path="*"
            element={
              <PageWrapper pageTitle="Page Not Found">
                <NotFoundPage />
              </PageWrapper>
            }
          />
        )}
      </Routes>
    </Suspense>
  );
}

export default RootLayoutRouter;
