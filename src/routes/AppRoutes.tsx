import { Route, Routes } from "react-router";
import InvoicesPage from "@/screens/invoices/InvoicesPage";
import HomeBody from "@/screens/home/Body";
import AppLayout from "./AppLayout";
import MainScreen from "@/MainScreen";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MainScreen />}>
          <Route path="" element={<HomeBody />} />
          <Route path="invoices/*" element={<InvoicesPage />} />
        </Route>
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
