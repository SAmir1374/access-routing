import type { RouteItemType } from '@/types/RouterType';

export default function ProtectedRoute<T extends RouteItemType[]>(
  data: T,
  userRole: string[],
  groupRoles: string[],
  authToken: string
) {
  
  return data.filter((item) => {
    if (item.isPublic) return true;

    const hasAuth = !!authToken;
    const hasGroupAccess =
      item.groupRoles.length === 0 || item.groupRoles.some((el) => groupRoles.includes(el));

    const hasRoleAccess = item.roles.length === 0 || item.roles.some((el) => userRole.includes(el));

    return hasAuth && hasGroupAccess && hasRoleAccess;
  });
}
