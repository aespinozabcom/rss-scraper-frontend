import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { SeleccionarNoticiaScreen } from "./screens/SeleccionarNoticiaScreen";
import { Sidebar } from "./Sidebar";
import "./styles/mainApp.scss";

export const MainApp = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="flex">
        {toggle && <Sidebar />}
        <div className={toggle ? "wrappContentActive" : "wrappContent"}>
          <SeleccionarNoticiaScreen />
        </div>
      </div>
    </div>
  );
};
