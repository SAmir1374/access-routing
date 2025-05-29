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
