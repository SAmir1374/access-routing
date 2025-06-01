import type { LazyExoticComponent, FC, ComponentType } from 'react';

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

export interface RouteLayputItemType {
  path: string;
  rootPath: string;
  pageComponents: LazyExoticComponent<FC>;
  pageTitle: string;
  toolTipPage: string | null;
  icon: React.ReactNode | null;
  preLoadingFunc?: string;
  isPublic: boolean;
  roles: string[];
  groupRoles: string[];
}

export interface RootLayoutType {
  layout: ComponentType;
  routers: RouteLayputItemType[];
}

export interface RouteItemWithLayout extends RouteLayputItemType {
  layout: ComponentType;
}
