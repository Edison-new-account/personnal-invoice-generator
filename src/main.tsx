import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Provider } from "react-redux";

import "./styles/index.css";
import "./styles/scss/main.scss";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <TooltipProvider>
            <AppRoutes />
          </TooltipProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
