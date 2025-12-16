import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Meals from "../Pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Order from "../Pages/Order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";



const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/meals",
        Component: Meals
      },
      {
        path: "/meal-details/:id",
        element: <PrivateRoute>
          <MealDetails></MealDetails>
        </PrivateRoute>
      },
      {
        path: "/order/:id",
        element: <PrivateRoute>
          <Order></Order>
        </PrivateRoute>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register
      }

    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        index: true,
        Component: Dashboard
      }
    ]
  }
]);



export default router