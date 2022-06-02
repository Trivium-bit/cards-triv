import React from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";


function App() {

  return (
    <div className="App">
        <AppRoutes />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;


