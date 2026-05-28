"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/marketing", label: "Marketing" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-[#1f2f1d] text-[#fff8e8]"
                : "text-[#cdbfa6] hover:bg-[#fff8e8]/10 hover:text-[#fff8e8]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
