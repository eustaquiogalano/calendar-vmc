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
import {
  CalendarDays,
  CalendarPlus,
  FileCog,
  FileInput,
  FileText,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

  adminNav: [
    {
      title: "Incoming Request",
      path: "admin/incoming-request",
      icon: <FileInput />,
    },
    {
      title: "Manage Request",
      path: "admin/manage-request",
      icon: <FileCog />,
    },
    {
      title: "Create Event",
      path: "admin/create-event",
      icon: <CalendarPlus />,
    },
  ],
};

export function AppSidebar({ currentUser, handleLogout, ...props }) {
  const navData =
    currentUser.userType === "admin" ? data.adminNav : data.studentNav;

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
            {navData.map((item) => (
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
                handleLogout();
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
