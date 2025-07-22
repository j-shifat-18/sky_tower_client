
import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Apartments from "../Pages/Apartments/Apartments";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            element:<Home></Home>,
        },
        {
            path:'apartments',
            element:<Apartments></Apartments>
        }
    ]
  },
  {
    path:'/login',
    element:<Login></Login>,
  },
  {
    path:'/register',
    element:<Register></Register>
  }
]);