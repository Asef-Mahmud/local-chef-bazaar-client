import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Meals from "../Pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";



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
  }
]);



export default router