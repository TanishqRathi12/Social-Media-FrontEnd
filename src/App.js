import "./App.css";
import {Sidebar} from "./Components/Sidebar";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar"; 
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import CreatePost from "./Pages/CreatePost";
import EditUser from "./Pages/EditUser";
import SignUp from "./Forms/SignUp";
import Login from "./Forms/LoginForm";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
        <>
          <Navbar/>
          <Sidebar />
          <Home/>
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
          <Profile />
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
