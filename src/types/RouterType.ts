import type { LazyExoticComponent, FC } from 'react';

export interface RouteItemType {
  path: string;
  pageComponents: LazyExoticComponent<FC>;
  pageTitle: string;
  toolTipPage: string | null;
  icon: React.ReactNode | null;
  preLoadingFunc?: string;
  isPublic: boolean;
  roles: string[];
  groupRoles: string[];
}

