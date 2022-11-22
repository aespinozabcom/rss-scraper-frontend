import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { AppRouter } from "./routers/AppRouter";
import { SeleccionarNoticiaScreen } from "./screens/SeleccionarNoticiaScreen";
import { Sidebar } from "./Sidebar";
import "./styles/mainApp.scss";

export const MainApp = () => {
  return <AppRouter />;
};
