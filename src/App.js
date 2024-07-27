import "./App.css";
import {Sidebar} from "./Components/Sidebar";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar"; 
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar/>
          <Sidebar />
          <Home/>
        </>
      ),
    },
    {
      path: "/Profile",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "/Explore",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <Explore />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
