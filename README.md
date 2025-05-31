# Access Router

A lightweight and flexible routing and access-control layer for React applications. This module allows you to define your routes and restrict access based on user roles and group roles.

---

## ✨ Features

- Supports public and protected routes
- Role-based and group-role-based access control
- Page preloading support
- Auto-redirect to login or home page
- NotFound page support
- Fully TypeScript compatible

---

## 🧩 Installation

npm i access-routing

yarn add access-routing

---

## 🧾 Route Definition Type

````ts
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


## 🏗 Usage


# AccessRouterProvider

`AccessRouterProvider` is a wrapper component designed for route access control in React applications. It works with `react-router-dom` and integrates role-based access control, token authentication, and route sharing via a context provider (`ShareDataProvider`).

## ✨ Features

- Supports user roles and group roles
- Automatically redirects to the login page if the user is unauthorized
- Provides allowed routes via context
- Supports public routes

## 🔧 Props

### `AccessRouterProvider` Props

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | The child components that will have access to the routing context. |
| `config.allRoutes` | `RouteItemType[]` | ❌ | An array of all possible routes in the app. |
| `config.userRoles` | `string[]` | ❌ | A list of roles assigned to the current user. |
| `config.groupRole` | `string[]` | ❌ | Group roles for categorizing users (e.g., department access). |
| `config.token` | `string` | ❌ | Access token used to verify if the user is authenticated. |
| `config.loginUrl` | `string` | ❌ | URL to redirect to if the user is not authenticated or authorized. |
| `config.Loader` | `React.ReactElement` | ❌ | Optional custom loader while routes are being checked or loaded. |

### `RouteItemType` Structure

```ts
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


// App.tsx
import { lazy } from 'react';
import { AccessRouterProvider } from 'access-routing';
import type { RouteItemType } from 'access-routing';

const allRoutes: RouteItemType[] = [
  {
    path: '/dashboard',
    pageComponents: lazy(() => import('@/pages/Dashboard')),
    pageTitle: 'Dashboard',
    toolTipPage: 'View dashboard',
    icon: null,
    isPublic: false,
    roles: ['admin'],
    groupRoles: ['management'],
  },
  {
    path: '/login',
    pageComponents: lazy(() => import('@/pages/Login')),
    pageTitle: 'Login',
    toolTipPage: null,
    icon: null,
    isPublic: true,
    roles: [],
    groupRoles: [],
  },
];

const App = () => {
  return (
    <AccessRouterProvider
      config={{
        allRoutes,
        userRoles: ['admin'],
        groupRole: ['management'],
        token: 'sample_token_123',
        loginUrl: '/login',
      }}
    >
      {/* App components go here */}
    </AccessRouterProvider>
  );
};

export default App;



### 1. Wrap your app with `AccessRouterProvider` (usually in `main.tsx` or `App.tsx`)


```tsx
import { AccessRouterProvider } from 'access-routing';
import routes from '@/router/routes';

const userRoles = ['admin']; // Fetched from login/session
const groupRole = ['team-leader']; // Fetched from login/session
const token = 'user-token'; // Fetched from cookie or localStorage
const loginUrl = '/login';

<AccessRouterProvider
  config={{
    allRoutes: routes,
    userRoles,
    groupRole,
    token,
    loginUrl,
  }}
>
  <App />
</AccessRouterProvider>


## 🖥 App.tsx Usage

In your `App.tsx`, you need to use the `RootRouter` component to handle routing and access control.

Example:

```tsx
import React from 'react';
import { RootRouter } from 'access-routing';
import { useShareData } from '@/provider';

const App = () => {
  const { state } = useShareData();

  return (
    <RootRouter
      token={state.token}
      loginUrl="/login"
      Loader={<div>Loading...</div>}
      NotFoundPage={() => <div>404 Page Not Found</div>}
      notFoundIsPublic={false}
    />
  );
};

export default App;


````

### RootRouter Props

| Prop Name          | Type                  | Description                                                                                 | Default     |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `token`            | `string`              | Authentication token, used to check if user is logged in.                                   | `''`        |
| `loginUrl`         | `string`              | URL path to the login page. Redirects to this when user is unauthorized.                    | `'/login'`  |
| `Loader`           | `React.ReactElement`  | React element shown while lazy-loaded components or routes are loading.                     | `<div />`   |
| `NotFoundPage`     | `React.ComponentType` | Component rendered when no matching route is found (404).                                   | `undefined` |
| `notFoundIsPublic` | `boolean`             | If `true`, 404 page is accessible without login; otherwise, redirects to login if no token. | `false`     |

### Accessing Allowed Routes with `useAccessRouting` Hook

To access the routes that the user is authorized to visit, you can use the custom hook `useAccessRouting`. This hook uses the shared data provider to get the allowed routes based on the user's roles and token.

```ts
import { useShareData } from '@/provider';

export const useAccessRouting = () => {
  const { state } = useShareData();

  return {
    allowRouter: state.allowedRoutes,
  };
};



For accessing the allowed routes, you can use the `useAccessRouting` hook.

// NavigationMenu.tsx
import React from 'react';
import { useAccessRouting } from './access-routing'; 

const NavigationMenu = () => {
  const { allowRouter } = useAccessRouting();

  return (
    <nav>
      <ul>
        {allowRouter?.map((route) => (
          <li key={route.path}>
            <a href={route.path}>{route.pageTitle}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;


```

# دسترسی به روتر (Access Router)

یک لایه سبک و منعطف برای مدیریت مسیرها و کنترل دسترسی در برنامه‌های React. این ماژول به شما امکان می‌دهد مسیرهای خود را تعریف کنید و دسترسی به آن‌ها را بر اساس نقش‌های کاربری و نقش‌های گروهی محدود کنید.

---

## ✨ امکانات

- پشتیبانی از مسیرهای عمومی و محافظت‌شده
- کنترل دسترسی مبتنی بر نقش و نقش گروه
- پشتیبانی از پیش‌بارگذاری صفحات
- هدایت خودکار به صفحه ورود یا صفحه اصلی
- پشتیبانی از صفحه NotFound
- کاملاً سازگار با TypeScript

---

## 🧩 نصب

````bash
npm i access-routing


yarn add access-routing



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




## 🏗 Usage

### 1. Wrap your app with `AccessRouterProvider` (usually in `main.tsx` or `App.tsx`)

```tsx
import AccessRouterProvider from '@/router/AccessRouterProvider';
import routes from '@/router/routes';

const userRoles = ['admin']; // Fetched from login/session
const groupRole = ['team-leader']; // Fetched from login/session
const token = 'user-token'; // Fetched from cookie or localStorage
const loginUrl = '/login';

<AccessRouterProvider
  config={{
    allRoutes: routes,
    userRoles,
    groupRole,
    token,
    loginUrl,
  }}
>
  <App />
</AccessRouterProvider>


## 🖥 App.tsx Usage

In your `App.tsx`, you need to use the `RootRouter` component to handle routing and access control.

Example:

```tsx
import React from 'react';
import { RootRouter } from '@/router';
import { useShareData } from '@/provider';

const App = () => {
  const { state } = useShareData();

  return (
    <RootRouter
      token={state.token}
      loginUrl="/login"
      Loader={<div>Loading...</div>}
      NotFoundPage={() => <div>404 Page Not Found</div>}
      notFoundIsPublic={false}
    />
  );
};

export default App;



### ویژگی‌های RootRouter

| نام پراپس           | نوع                   | توضیحات                                                                                   | مقدار پیش‌فرض  |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------- | -------------- |
| `token`             | `string`              | توکن احراز هویت که برای بررسی ورود کاربر استفاده می‌شود.                                  | `''`           |
| `loginUrl`          | `string`              | مسیر صفحه ورود. اگر کاربر غیرمجاز باشد به این صفحه هدایت می‌شود.                         | `'/login'`     |
| `Loader`            | `React.ReactElement`  | عنصر ری‌اکتی که هنگام بارگذاری تنبل کامپوننت‌ها یا مسیرها نمایش داده می‌شود.              | `<div />`      |
| `NotFoundPage`      | `React.ComponentType` | کامپوننتی که وقتی هیچ مسیر مطابقت ندارد (خطای ۴۰۴) نمایش داده می‌شود.                   | `undefined`    |
| `notFoundIsPublic`  | `boolean`             | اگر `true` باشد، صفحه ۴۰۴ بدون نیاز به ورود قابل دسترسی است؛ در غیر این صورت، بدون توکن به صفحه ورود هدایت می‌شود. | `false`        |

---

### دسترسی به روترهای مجاز با هوک `useAccessRouting`

برای دسترسی به مسیرهایی که کاربر اجازه بازدید از آن‌ها را دارد، می‌توانید از هوک سفارشی `useAccessRouting` استفاده کنید. این هوک با استفاده از provider داده‌های مشترک، مسیرهای مجاز را بر اساس نقش‌ها و توکن کاربر دریافت می‌کند.

```ts
import { useShareData } from '@/provider';

export const useAccessRouting = () => {
  const { state } = useShareData();

  return {
    allowRouter: state.allowedRoutes,
  };
};
````
