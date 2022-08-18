import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthProvider>   
        <App />
      </AuthProvider>
      

   
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
