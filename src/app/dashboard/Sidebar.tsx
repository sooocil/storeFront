import { Card } from "@/components/ui/card";
import { Users, Package } from "lucide-react";
import Link from "next/link";

const DashboardSidebar = () => {
  const menuItems = [
    { name: "Products", icon: Package, href: "/dashboard/products" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    
  ];

  return (
    <Card className="w-60 h-screen rounded-none p-4 flex flex-col gap-4 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors"
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </Card>
  );
};

export default DashboardSidebar;
