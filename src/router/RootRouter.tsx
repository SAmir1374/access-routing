import { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import ProtectedRouter from './ProtectedRouter';
import PageWrapper from './PageTitleWrapper';
import { useShareData } from '@/provider';

type RootRoutingType = {
  token?: string;
  Loader?: React.ReactElement;
  loginUrl?: string;
  NotFoundPage?: React.ComponentType;
  notFoundIsPublic?: boolean;
};

type RoutingStatus = 'checking' | 'redirectToLogin' | 'redirectToHome' | 'render';

const DefaultLoader = <div />;

export function RootRouter({
  token = '',
  Loader,
  loginUrl = '/login',
  NotFoundPage,
  notFoundIsPublic,
}: RootRoutingType) {
  const { state } = useShareData();
  const location = useLocation();

  const allowedRoutes = ProtectedRouter(
    state.allRoutes ?? [],
    state.userRoles ?? [],
    state.groupRole ?? [],
    token
  );

  const [routingStatus, setRoutingStatus] = useState<RoutingStatus>('checking');

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
        {allowedRoutes.map(({ path, pageComponents: Page, pageTitle }) => (
          <Route
            key={path}
            path={path}
            element={
              <PageWrapper pageTitle={pageTitle}>
                <Page />
              </PageWrapper>
            }
          />
        ))}

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
