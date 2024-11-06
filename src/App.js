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
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

function App() {
  const [handleData, setHandleData] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <>
            <CommonComp />
            <Home sendData={setHandleData} />
          </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/Profile",
      element: (
        <ProtectedRoute>
          <CommonComp />
          <Profile posts={handleData} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/CreatePost",
      element: (
        <ProtectedRoute>
          <CommonComp />
          <CreatePost />
        </ProtectedRoute>
      ),
    },
    {
      path: "/EditUser",
      element: (
        <ProtectedRoute>
          <CommonComp />
          <EditUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/EditPost",
      element: (
        <ProtectedRoute>
          <CommonComp />
          <EditPost />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Explore",
      element: (
        <ProtectedRoute>
          <CommonComp />
          <Explore />
        </ProtectedRoute>
      ),
    },
    {
      path: "/SignUp",
      element: (
        <>
          <CommonComp />
          <SignUp />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <CommonComp />
          <Login />
        </>
      ),
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
