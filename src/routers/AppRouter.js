import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../Navbar";
import { CrearMedioScreen } from "../screens/CrearMedioScreen";
import { SeleccionarMedioScreen } from "../screens/SeleccionarMedioScreen";
import { SeleccionarNoticiaScreen } from "../screens/SeleccionarNoticiaScreen";
import { Sidebar } from "../Sidebar";

export const AppRouter = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <BrowserRouter>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="flex">
        {toggle && <Sidebar />}
        <div className={toggle ? "wrappContentActive" : "wrappContent"}>
          <Routes>
            <Route exact path="/" element={<SeleccionarNoticiaScreen />} />
            <Route exact path="/crear-medio" element={<CrearMedioScreen />} />
            <Route
              exact
              path="/seleccionar-medio"
              element={<SeleccionarMedioScreen />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
