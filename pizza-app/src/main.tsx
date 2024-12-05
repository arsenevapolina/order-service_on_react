import React from "react"; 
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Layout } from "./layout/Layout/Layout";
import { Product } from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { AuthLayout } from "./layout/Layout/Auth/AuthLayout";
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register'


const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/products/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 2000);
            }),
          });
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
