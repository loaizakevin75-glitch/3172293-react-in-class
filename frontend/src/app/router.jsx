// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/shared";
import { UserListPage, UserRegisterForm } from "../features/users";
import { ReportConfigModal } from "../features/users";
import HomePage from "../features/home/components/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, },
    //   { path: "/dashboard/auth", element: <h1>Hello2</h1> },
      { path: "/dashboard/users", element: <UserListPage/> },
      { path: "/dashboard/userCreate", element: <UserRegisterForm/> },
      { path: "/dashboard/userReport", element: <ReportConfigModal/> },
      
      
    ],
  },
  {
    path: "/products",
    element: <HomePage />,
    children: [
      {
        index: true,
      },
    ],
  },
]);

export default router;
