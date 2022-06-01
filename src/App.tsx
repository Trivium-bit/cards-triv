import React from "react";
import Routings from './n1-main/components/Routings';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";

function App() {
  return (
    <div className="App">
        <Routings />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;
