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
import React, { useEffect, useState } from "react";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,    // 🔥 adicione esse
  Users,
  Bell,
  Info,
  Mail,
  MessageSquare,   // 🔥 adicione esse se usar “messageSquare”
  HelpCircle,      // 🔥 adicione esse se usar “helpCircle”
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setItems(data.sidebarItems))
      .catch(console.error);
  }, []);

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
          {items.map((item) => {
            const key = item.icon.charAt(0).toUpperCase() + item.icon.slice(1);
            const Icon = ICONS[key];
            if (!Icon) return null; // pula se não existir

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
