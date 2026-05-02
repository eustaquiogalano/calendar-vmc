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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  FileText,
  GalleryVerticalEndIcon,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "@/context/UserContext";

// This is sample data.
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
              {/* <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a> */}

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
