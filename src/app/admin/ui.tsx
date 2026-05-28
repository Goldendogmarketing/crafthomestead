import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-[#5d3d24]/15 bg-white px-3 py-2 text-sm text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2";

export const labelClass = "grid gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f4e35]";

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f4e35]">{description}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-[#5d3d24]/10 bg-[#fff8e8] p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#536c48]">{children}</p>;
}

const statusColors: Record<string, string> = {
  New: "border-[#5d7b86]/30 bg-[#a7cbd0]/25 text-[#3c5760]",
  Confirmed: "border-[#b5803a]/30 bg-[#e9c489]/30 text-[#7b4b2a]",
  Fulfilled: "border-[#536c48]/30 bg-[#536c48]/15 text-[#314a2d]",
  Cancelled: "border-[#5d3d24]/20 bg-[#20180f]/5 text-[#5f4e35]",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[status] ?? statusColors.New}`}>
      {status}
    </span>
  );
}
