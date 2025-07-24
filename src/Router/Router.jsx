import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Apartments from "../Pages/Apartments/Apartments";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Announcements from "../Pages/Announcements/Announcements";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import ManageMembers from "../Pages/ManageMembers/ManageMembers";
import MakeAnnouncement from "../Pages/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../Pages/AgreementRequests/AgreementRequests";
import ManageCoupons from "../Pages/ManageCoupons/ManageCoupons";
import AdminProtectedRoutes from "../Routes/AdminProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "apartments",
        element: <Apartments></Apartments>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // {
      //   index:true,
      //   element:
      // },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "admin-profile",
        element: (
          <AdminProtectedRoutes>
            <AdminProfile />{" "}
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminProtectedRoutes>
            <ManageMembers />
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminProtectedRoutes>
            <MakeAnnouncement />
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminProtectedRoutes>
            <AgreementRequests />
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminProtectedRoutes>
            <ManageCoupons />
          </AdminProtectedRoutes>
        ),
      },
    ],
  },
]);
