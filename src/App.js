import "./App.css";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import EditUser from "./Pages/EditUser";
import CommonComp from "./Components/CommonComp";
import SignUp from "./Forms/SignUp";
import Login from "./Forms/LoginForm";
import {AuthProvider} from "./Context/AuthContext"
//import {useAuth} from "./Context/AuthContext"
import ProtectedRoute from "./auth/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { useEffect } from "react";ZZZZZZZZZZZZZZZZZZZz

function App() {
  // const {login} = useAuth();
  // useEffect(()=>{
  //   const token = localStorage.getItem("token");
  //   if(token){
  //     login();
  //   }
  // },[login])
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <CommonComp />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/CreatePost",
          element: <CreatePost />,
        },
        {
          path: "/EditUser",
          element: <EditUser />,
        },
        {
          path: "/EditPost",
          element: <EditPost />,
        },
        {
          path: "/Explore",
          element: <Explore />,
        },
      ],
    },

    {
      path: "/SignUp",
      element: <SignUp />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
