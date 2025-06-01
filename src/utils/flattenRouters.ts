import type { RootLayoutType, RouteItemWithLayout, RouteLayputItemType } from '../types/RouterType';

export function flattenRouters(routesList: RootLayoutType[]): RouteItemWithLayout[] {
  return routesList.flatMap((group) =>
    group.routers.map((route: RouteLayputItemType) => ({
      ...route,
      layout: group.layout,
    }))
  );
}
