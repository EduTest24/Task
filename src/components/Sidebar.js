"use client";

import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, ListTodo, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const navLinks = [
  {
    label: "Calendar Agent",
    icon: <CalendarDays className="w-4 h-4" />,
    path: "/dashboard/calendar",
  },
  {
    label: "Tasks Agent",
    icon: <ListTodo className="w-4 h-4" />,
    path: "/dashboard/tasks",
  },
  {
    label: "Notes Agent",
    icon: <Sparkles className="w-4 h-4" />,
    path: "/dashboard/notes",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="w-72 bg-gray-50 border-r flex flex-col p-4 h-screen">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-indigo-700">{user?.fullName}</p>
          <p className="text-sm text-gray-500">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navLinks.map((link) => (
          <Button
            key={link.path}
            variant={pathname === link.path ? "default" : "ghost"}
            onClick={() => router.push(link.path)}
            className="justify-start gap-2 w-full text-left"
          >
            {link.icon}
            {link.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
