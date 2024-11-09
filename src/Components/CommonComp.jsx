import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function CommonComp() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default CommonComp
