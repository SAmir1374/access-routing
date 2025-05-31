## 📦 `access-routing`

`access-routing` is a **lightweight** and **TypeScript-compatible** routing utility designed for React applications. It provides a clean and modular way to handle **access control**, **authentication**, and **protected routes**.

### 🧩 Key Capabilities

- Define access roles for routes using simple configuration
- Seamlessly supports both **private** and **public** routes
- Automatically handles **authentication checks**
- Easily integrates with your app using TypeScript and `react-router-dom`
- Share allowed routes through React context for dynamic rendering

> Ideal for apps that need role-based routing logic with minimal boilerplate.

## 📖 Usage

To use `access-routing` in your React project, you need to wrap your app with the `AccessRouterProvider` component. This provider accepts a `config` prop where you can define:

- The list of all available routes
- The current user's roles
- The group roles the user belongs to
- The authentication token
- The URL for the login page (redirect when the user is not authenticated)

---

 ## RouteItemType  props


| Property        | Type                           | Description                                                                                      |
|-----------------|--------------------------------|------------------------------------------------------------------------------------------------|
| `path`          | `string`                       | The URL path of the route.                                                                       |
| `pageComponents` | `LazyExoticComponent<FC>`      | The React component rendered for this route, supports lazy loading for performance optimization.|
| `pageTitle`     | `string`                       | The title of the page, used for display or SEO purposes.                                        |
| `toolTipPage`   | `string \| null`               | Tooltip text shown on the menu icon, providing additional info on hover.                        |
| `icon`          | `React.ReactNode \| null`      | The icon component used in the navigation menu for this route.                                 |
| `preLoadingFunc`| `string` (optional)            | Optional function to preload resources for this page to improve loading speed.                  |
| `isPublic`      | `boolean`                      | Defines if the route is public (no authentication token required) or private.                    |
| `roles`         | `string[]`                     | Array of user roles that are allowed to access this route.                                      |
| `groupRoles`    | `string[]`                     | Array of group roles defining group-based access permissions for this route.                    |



### Example: `AccessRouterProvider` Component

```tsx
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

``` 

```tsx
import React, { lazy } from 'react';
import AccessRouterProvider from './AccessRouterProvider';
import type { RouteItemType } from '@/types/RouterType';

// Define lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Define routes array
const routes: RouteItemType[] = [
  {
    path: '/',
    pageComponents: HomePage,
    pageTitle: 'Home',
    toolTipPage: 'Go to Home',
    icon: null,
    isPublic: true,
    roles: [],
    groupRoles: [],
  },
  {
    path: '/dashboard',
    pageComponents: DashboardPage,
    pageTitle: 'Dashboard',
    toolTipPage: 'User Dashboard',
    icon: null,
    isPublic: false,
    roles: ['admin', 'user'],
    groupRoles: ['staff'],
  },
  {
    path: '/login',
    pageComponents: LoginPage,
    pageTitle: 'Login',
    toolTipPage: null,
    icon: null,
    isPublic: true,
    roles: [],
    groupRoles: [],
  },
];

// Usage example of AccessRouterProvider
const App = () => {
  const userRoles = ['user'];
  const groupRoles = ['staff'];
  const token = 'jwt-token-example';

  return (
    <AccessRouterProvider
      config={{
        allRoutes: routes,
        userRoles,
        groupRole: groupRoles,
        token,
        loginUrl: '/login',
      }}
    >
      {/* Your app components */}
    </AccessRouterProvider>
  );
};

export default App;
 ```
 
 # `RootRouter` Component

The `RootRouter` component is responsible for managing and rendering the allowed routes in your app based on the user's **authentication status** and **access roles**.

---

## 📦 Props

| Name             | Type                        | Description                                                                                         |
|------------------|-----------------------------|---------------------------------------------------------------------------------------------------|
| `token`          | `string` (optional)          | The user's authentication token. If present, private routes become accessible.                    |
| `Loader`         | `React.ReactElement` (optional) | A loading component displayed while lazy-loaded pages are being fetched (fallback UI).            |
| `loginUrl`       | `string` (optional)          | URL of the login page, where unauthenticated users are redirected. Default is `/login`.           |
| `NotFoundPage`   | `React.ComponentType` (optional) | Component rendered for unmatched routes (404 page).                                               |
| `notFoundIsPublic` | `boolean` (optional)         | Defines whether the 404 page is public (accessible without authentication). If `true`, it's public.|

---

## 🛠️ Behavior

- Uses the `useShareData` hook to get shared data like all routes, user roles, and group roles.
- Calls `ProtectedRouter` to filter routes the user is allowed to access based on roles and token.
- Manages a `routingStatus` state with possible values:
  - `checking`: Currently verifying access (renders nothing during this state).
  - `redirectToLogin`: Redirects to login page if user is not authenticated and tries to access a protected route.
  - `redirectToHome`: Redirects authenticated users away from login page to the home page.
  - `render`: Renders the allowed routes.

---

## 🔄 How to use

Place the `RootRouter` inside your app, typically **below the provider** (`AccessRouterProvider`) that supplies the route and user role data. This component will dynamically generate and render your app's routes with proper access control and redirection.

```tsx
import AccessRouterProvider from './AccessRouterProvider';
import { RootRouter } from './RootRouter';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AccessRouterProvider config={{ /* your config here */ }}>
      <RootRouter
        token={userToken}
        Loader={<LoadingSpinner />}
        loginUrl="/login"
        NotFoundPage={NotFoundPage}
        notFoundIsPublic={true}
      />
    </AccessRouterProvider>
  );
}

```
## Note on `token` Prop Usage

Currently, you need to pass the `token` prop both to the `AccessRouterProvider` (or its config) **and** to the `RootRouter` component to ensure full authentication and access control flow.

Although this might feel redundant and not very elegant, it is necessary for the current implementation to:

- Allow the provider to determine accessible routes based on roles and token.
- Let the router handle redirection and route rendering depending on authentication status.

> **Rest assured:** In upcoming versions, this redundancy will be addressed and improved for a cleaner API and better developer experience.

For now, please continue passing `token` to both layers as shown:

```tsx
<AccessRouterProvider config={{ token: userToken, /* other config */ }}>
  <RootRouter token={userToken} /* other props */ />
</AccessRouterProvider>

```


## Accessing Allowed Routes Anywhere in the Project

You can use the `useAccessRouting` hook to get the list of allowed routes anywhere in your React app. This is useful, for example, when you want to build dynamic menus based on the user's access permissions.

### How to use `useAccessRouting`

```tsx
import { useAccessRouting } from 'access-routing'; // or your correct path

function SidebarMenu() {
  const { allowRouter } = useAccessRouting();

  return (
    <nav>
      <ul>
        {allowRouter.map(route => (
          <li key={route.path}>
            {/* Render menu items based on allowed routes */}
            <a href={route.path} title={route.toolTipPage || undefined}>
              {route.icon}
              {route.pageTitle}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

### Keywords

react, routing, access control, protected routes, authentication, typescript

