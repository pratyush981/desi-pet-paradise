
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon: Icon, title, isActive }) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2",
          isActive
            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            : "hover:bg-transparent hover:text-primary"
        )}
      >
        <Icon size={18} />
        <span>{title}</span>
      </Button>
    </Link>
  );
};

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  
  const menuItems = [
    {
      href: "/admin",
      icon: () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      title: "Dashboard",
    },
    {
      href: "/admin/adoptions",
      icon: () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
          <path d="M15 3v6h6" />
        </svg>
      ),
      title: "Adoption Requests",
    },
    {
      href: "/admin/pets",
      icon: () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      title: "Manage Pets",
    }
  ];
  
  return (
    <div className="h-full bg-white border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Desi Pet Paradise</p>
      </div>
      <div className="flex-1 px-4 space-y-1 overflow-auto">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            href={item.href}
            icon={item.icon}
            title={item.title}
            isActive={isActive(item.href)}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};
