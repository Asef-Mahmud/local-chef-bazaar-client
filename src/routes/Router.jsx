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
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyOrder from "../Pages/Dashboard/MyOrders/MyOrder";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import MyFav from "../Pages/Dashboard/MyFav/MyFav";
import ChefRoute from "./ChefRoute";
import ChefCreateMeal from "../Pages/Dashboard/ChefCreateMeal/ChefCreateMeal";
import ChefMyMeals from "../Pages/Dashboard/ChefMyMeals/ChefMyMeals";
import ChefOrderRequests from "../Pages/Dashboard/ChefOrderRequests/ChefOrderRequests";
import AdminRoute from "./AdminRoute";
import AdminManageUsers from "../Pages/Dashboard/AdminManageUsers/AdminManageUsers";
import AdminManageRequests from "../Pages/Dashboard/AdminManageRequests/AdminManageRequests";
import AdminStatistics from "../Pages/Dashboard/AdminStatistics/AdminStatistics";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



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
      },
      {
        path: 'my-profile',
        Component: MyProfile
      },
      {
        path: "my-orders",
        Component: MyOrder
      },
      {
        path: "payment/:orderId",
        Component: Payment
      },
      {
        path: "order/payment-success",
        Component: PaymentSuccess
      },
      {
        path: "order/payment-cancelled",
        Component: PaymentCancelled
      },
      {
        path: "my-reviews",
        Component: MyReviews
      },
      {
        path: "my-fav",
        Component: MyFav
      },


      // Chef Only Routes
      {
        path: "create-meal",
        element: <ChefRoute>
          <ChefCreateMeal></ChefCreateMeal>
        </ChefRoute>
      },
      {
        path: "my-meals",
        element: <ChefRoute>
          <ChefMyMeals></ChefMyMeals>
        </ChefRoute>
      },
      {
        path: "order-requests",
        element: <ChefRoute>
          <ChefOrderRequests></ChefOrderRequests>
        </ChefRoute>
      },


      // Admin Only Routes
      {
        path: "manage-users",
        element: <AdminRoute>
          <AdminManageUsers></AdminManageUsers>
        </AdminRoute>
      },
      {
        path: "manage-requests",
        element: <AdminRoute>
          <AdminManageRequests></AdminManageRequests>
        </AdminRoute>
      },
      {
        path: "statistics",
        element: <AdminRoute>
          <AdminStatistics></AdminStatistics>
        </AdminRoute>
      },
    ]
  },
  {
    path: '/*',
    Component: ErrorPage
  }
]);



export default router