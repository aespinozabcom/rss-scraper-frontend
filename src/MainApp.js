import React from "react";
import { Navbar } from "./Navbar";
import { SeleccionarNoticiaScreen } from "./screens/SeleccionarNoticiaScreen";

export const MainApp = () => {
  return (
    <div>
      <Navbar />
      <SeleccionarNoticiaScreen />
    </div>
  );
};
