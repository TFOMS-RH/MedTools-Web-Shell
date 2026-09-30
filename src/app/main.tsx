import { createRoot } from "react-dom/client";
import { Home } from "../components/pages/Home/Home";
import { Login } from "../components/pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import { WithoutHeaderLayout } from "../components/layouts/WithoutHeaderLayout/WithoutHeaderLayout";
import { RControl } from "../modules/rControl/pages/RControl";
import { MedView } from "../modules/medView/pages/MedView";
import { AppLayout } from "../components/layouts/AppLayout/AppLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClient";

import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutHeaderLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rcontrol" element={<RControl />} />
          <Route path="/med-view" element={<MedView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
