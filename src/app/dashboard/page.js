"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ListTodo,
  Home,
  Mail,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import CalendarDashboard from "@/components/dashboard/calendarDashboard";
import TasksDashboard from "@/components/dashboard/tasksDashboard";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import EmailDashboard from "@/components/dashboard/emailDashboard";
import { motion, AnimatePresence } from "framer-motion";

const HEADER_HEIGHT = 64; // Adjust to your website header height

export default function Dashboard() {
  const { user, isSignedIn } = useUser();
  const hasSyncedRef = useRef(false);
  const [activeSection, setActiveSection] = useState("emails");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sync user to DB
  useEffect(() => {
    const syncUser = async () => {
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            image: user.imageUrl,
          }),
        });
      } catch (err) {
        console.error("Sync failed", err);
      }
    };
    if (isSignedIn && user && !hasSyncedRef.current) {
      hasSyncedRef.current = true;
      syncUser();
    }
  }, [isSignedIn, user]);

  if (!isSignedIn || !user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Toggle Button */}
      <div
        className="fixed z-50 md:hidden"
        style={{ top: HEADER_HEIGHT + 8, left: 16 }}
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full shadow bg-white"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </Button>
      </div>

      <a
        href="/agent"
        className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition"
      >
        <Sparkles className="w-5 h-5" />
        Agent
      </a>

      {/* Dashboard Body */}
      <div className="flex flex-1 overflow-hidden ">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-[64px] left-0 z-40 h-[calc(100%-64px)] bg-gray-50 border-r flex flex-col p-4 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0
            ${sidebarCollapsed ? "w-20" : "w-72"}
          `}
        >
          {/* Desktop Collapse Toggle */}
          <div className="hidden md:flex justify-end mb-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-700" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              )}
            </Button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={user.imageUrl} alt={user.fullName} />
                <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-indigo-700">{user.fullName}</p>
                <p className="text-sm text-gray-500">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          )}

          {!sidebarCollapsed && <Separator className="my-4" />}

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-sm">
            <SidebarLink
              icon={<Home className="w-4 h-4" />}
              label="Overview"
              active={activeSection === "overview"}
              onClick={() => setActiveSection("overview")}
              collapsed={sidebarCollapsed}
            />
            <SidebarLink
              icon={<CalendarDays className="w-4 h-4" />}
              label="Calendar"
              active={activeSection === "calendar"}
              onClick={() => setActiveSection("calendar")}
              collapsed={sidebarCollapsed}
            />
            <SidebarLink
              icon={<ListTodo className="w-4 h-4" />}
              label="Tasks"
              active={activeSection === "tasks"}
              onClick={() => setActiveSection("tasks")}
              collapsed={sidebarCollapsed}
            />
            <SidebarLink
              icon={<Mail className="w-4 h-4" />}
              label="Emails"
              active={activeSection === "emails"}
              onClick={() => setActiveSection("emails")}
              collapsed={sidebarCollapsed}
            />
          </nav>
        </aside>

        <main
          className={`flex-1 p-6 overflow-y-auto transition-all duration-300 
        bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950
        ${sidebarCollapsed ? "md:ml-20" : "md:ml-72"}
      `}
        >
          {/* Animated Section Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === "overview" && (
                <OverviewDashboard userId={user.id} />
              )}
              {activeSection === "calendar" && (
                <CalendarDashboard isSignedIn={isSignedIn} userId={user.id} />
              )}
              {activeSection === "tasks" && (
                <TasksDashboard isSignedIn={isSignedIn} />
              )}
              {activeSection === "emails" && <EmailDashboard />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ icon, label, active = false, onClick, collapsed }) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      className={`justify-start gap-2 w-full text-left cursor-pointer
        ${active ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""}
        ${collapsed ? "justify-center" : ""}`}
    >
      {icon}
      {!collapsed && label}
    </Button>
  );
}
