import type { Metadata } from "next";
import Link from "next/link";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Craft Homestead | Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#efe6d2] text-[#20180f] lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="flex flex-col gap-8 bg-[#20180f] px-5 py-7 text-[#fff8e8] lg:min-h-screen">
        <div>
          <Link href="/admin" className="font-mono text-xl tracking-[-0.08em]">
            craft. <span className="text-[#a4b582]">admin</span>
          </Link>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#cdbfa6]/70">
            Homestead control room
          </p>
        </div>
        <AdminNav />
        <div className="mt-auto hidden border-t border-[#fff8e8]/10 pt-5 lg:block">
          <Link href="/" className="text-sm text-[#cdbfa6] hover:text-[#fff8e8]">
            ← View live site
          </Link>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#cdbfa6]/50">
            Dev build · auth pending
          </p>
        </div>
      </aside>
      <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  );
}
