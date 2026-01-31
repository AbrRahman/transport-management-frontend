import { SidebarProvider } from "../components/ui/sidebar";
import { Outlet } from "react-router";
import AppSidebar from "../components/appSidebar/AppSidebar";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 bg-slate-50">
            <Header />
            <div className="p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;
