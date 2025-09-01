import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
    <ToastContainer/>
    <StrictMode>
      <App />
    </StrictMode>
    </Provider>
  </BrowserRouter>
);
