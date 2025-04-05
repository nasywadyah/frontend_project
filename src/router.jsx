import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing_page from "./pages/landing_page";
import Sign_in from "./pages/sign_in";
import Sign_up from "./pages/sign_up";
import Request_reset from "./pages/request_reset";
import Change_password from "./pages/change_password";
import GoogleCallback from "./pages/google_callback/GoogleCallback";
import Dashboard from "./pages/dashboard";
import Setting from "./pages/setting";
import Transactions from "./pages/transactions";
import Category from "./pages/category";
import LogActivity from "./pages/log_activity";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import UserAdmin from "./pages/admin/UserAdmin";
import TransactionAdmin from "./pages/admin/TransactionAdmin";

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
        <Route path="/request-password-reset" element={<Request_reset />} />
        <Route path="/change-password" element={<Change_password />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/category" element={<Category />} />
        <Route path="/log-activity" element={<LogActivity />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/users" element={<UserAdmin />} />
        <Route path="/admin/transactions" element={<TransactionAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default router;
