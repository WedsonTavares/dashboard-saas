"use client";

import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingBag,
  Users,
  ShoppingCart,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,    
  Users,
  Bell,
  Info,
  Mail,
  MessageSquare,
  HelpCircle,
};

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: "house", href: "/" },
  { name: "Overview", icon: "dollarSign", href: "/overview" },
  { name: "Produtos", icon: "shoppingBag", href: "/products" },
  { name: "Pedidos", icon: "shoppingCart", href: "/orders" },
  { name: "Clientes", icon: "users", href: "/users" },
  { name: "Configurações", icon: "settings", href: "/configuracoes" },
  { name: "Mensagens", icon: "messageSquare", href: "/mensagens" },
  { name: "Notificações", icon: "bell", href: "/notificacoes" },
  { name: "Ajuda", icon: "helpCircle", href: "/help" }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Não renderizar sidebar se não estiver logado ou ainda carregando
  if (loading || !user) {
    return null;
  }

  return (
    <aside className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
      isOpen ? "w-64" : "w-20"
    }`}>
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit"
        >
          <Menu size={24} />
        </button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => {
            const key = item.icon.charAt(0).toUpperCase() + item.icon.slice(1);
            const Icon = ICONS[key];
            if (!Icon) return null; 

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] mb-2 transition-colors ${
                    pathname === item.href ? "bg-[#2f2f2f]" : ""
                  }`}
                >
                  <Icon size={20} style={{ minWidth: "20px" }} />
                  {isOpen && (
                    <span className="ml-4 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
