import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../admin/pages/Dashboard/Dashboard";
import { ColorModeContext, useMode } from "../admin/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../admin/components/Sidebar";
import Topbar from "../admin/components/Topbar";
import ManageUser from "../admin/pages/ManageUser/ManageUser";
import ManageProduct from "../admin/pages/ManageProduct/ManageProduct";
import Test from "../admin/components/Test";
import ManageOrder from "../admin/pages/ManageOrder/ManageOrder";

const AdminRouters = () => {
   const [theme, colorMode] = useMode();
   const [isSidebar, setIsSidebar] = useState(true);
   const { user } = useSelector((store) => store.auth);
   return (
      <ColorModeContext.Provider value={colorMode}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="flex relative">
               <Sidebar isSidebar={isSidebar} />
               <main className="h-full w-full">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                     <Route path="/" element={<Dashboard />} />
                     <Route path="/manage/user" element={<ManageUser />} />
                     <Route
                        path="/manage/product"
                        element={<ManageProduct />}
                     />
                     <Route path="/manage/order" element={<ManageOrder />} />
                  </Routes>
               </main>
            </div>
         </ThemeProvider>
      </ColorModeContext.Provider>
   );
};

export default AdminRouters;
