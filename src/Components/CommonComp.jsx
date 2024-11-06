import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function CommonComp({Children}) {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div>
        {Children}
      </div>
    </>
  )
}

export default CommonComp
