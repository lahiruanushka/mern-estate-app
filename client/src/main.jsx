import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from './store';
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
    </BrowserRouter>
  </Provider>
);
