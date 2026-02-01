import { Bus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router";
import { useState } from "react";

const AppSidebar = () => {
  const [isActive, setActive] = useState("Vehicles");
  const menuItems = [
    { name: "Vehicles", path: "/vehicles" },
    { name: "Vehicle", path: "/vehicles" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bus className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-black tracking-tight">
            Transport Management
          </span>
        </div>
      </SidebarHeader>
      <div className="border-b-2"></div>

      <SidebarContent className="px-3 mt-2">
        <SidebarMenu className="gap-2">
          {menuItems.map((item: { name: string; path: string }) => (
            <SidebarMenuItem
              key={item?.name}
              onClick={() => setActive(item?.name)}
            >
              <SidebarMenuButton asChild>
                <Link
                  to={item.path}
                  className={`flex font-bold ${isActive == item.name ? "bg-slate-800" : "bg-blue-600"} items-center gap-3 h-11 px-4 text-white hover:bg-slate-800 hover:text-slate-100 transition duration-300`}
                >
                  Vehicle
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 text-black text-base font-bold">Admin Profile</div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
