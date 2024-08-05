import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  {/* nay h tuyet ha code o phan nao no ra bug cho do z hôm qua h hà chỉ có chỗ cart thôi tối hôm qua vẫn chạy bth mà  */}
      
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
  
  </React.StrictMode>
);
