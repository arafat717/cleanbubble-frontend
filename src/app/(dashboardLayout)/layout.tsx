"use client";
import Header from "@/components/dashboard/AppHeader";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          {/* Header stays full width */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 p-4 bg-[#EDEDEE] ">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

