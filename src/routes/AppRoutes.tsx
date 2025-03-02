import { Route, Routes } from "react-router";
import InvoicesPage from "@/screens/invoices/InvoicesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoicesPage />} />
    </Routes>
  );
};

export default AppRoutes;
