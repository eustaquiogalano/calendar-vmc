import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { CalendarDays, FileText, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const data = {
  studentNav: [
    {
      title: "Calendar",
      path: "student/calendar",
      icon: <CalendarDays />,
    },
    {
      title: "Document Request",
      path: "student/document-request",
      icon: <FileText />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { toggleSidebar } = useSidebar();
  const { currentUser } = useUser();

  return (
    <Sidebar {...props} className="h-full">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="h-[2rem]">
            <SidebarMenuButton size="lg" asChild className="flex justify-end">
              <SidebarTrigger className=" h-full flex justify-center items-center p-0"></SidebarTrigger>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.studentNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.path} className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      {item.icon}
                      {item.title}
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                props.handleLogout(currentUser);
                toggleSidebar();
              }}
            >
              <LogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
