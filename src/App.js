import "./App.css";
import {Sidebar} from "./Components/Sidebar";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar"; 
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import EditUser from "./Pages/EditUser";
import SignUp from "./Forms/SignUp";
import Login from "./Forms/LoginForm";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";





function App() {
  const [handleData, setHandleData] = useState('');

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
        <>
          <Navbar/>
          <Sidebar />
          <Home sendData={setHandleData}/>
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/Profile",
      element: (
        <ProtectedRoute>
        <>
          <Navbar />
          <Sidebar />
          <Profile posts={handleData} />
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/CreatePost",
      element: (
        <ProtectedRoute>
        <>
          <Navbar />
          <Sidebar />
          <CreatePost />
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/EditUser",
      element: (
        <ProtectedRoute>
        <>
          <Navbar />
          <Sidebar />
          <EditUser />
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/EditPost",
      element: (
        <ProtectedRoute>
        <>
          <Navbar />
          <Sidebar />
          <EditPost />
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/Explore",
      element: (
        <ProtectedRoute>
        <>
          <Navbar />
          <Sidebar />
          <Explore />
        </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/SignUp",
      element: (
        <>
          <Navbar />
          <SignUp />
        </>
      ),
    },
    {
      path:"/Login",
      element:(
        <>
          <Navbar/>
          <Login/>
        </>
      )
    }
  ]);
  return (
    <>
    <AuthProvider>
      
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  );
}

export default App;
