import Link from "next/link";
import { getProducts, getOrders, getCustomers, getSettings } from "@/lib/data";
import { PageHeader, Card, SectionTitle, StatusPill } from "./ui";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

export default async function AdminDashboard() {
  const [products, orders, customers, settings] = await Promise.all([
    getProducts(),
    getOrders(),
    getCustomers(),
    getSettings(),
  ]);

  const activeProducts = products.filter((p) => p.active).length;
  const openOrders = orders.filter((o) => o.status === "New" || o.status === "Confirmed").length;
  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Products", value: `${activeProducts} / ${products.length}`, hint: "active / total", href: "/admin/products" },
    { label: "Orders", value: String(orders.length), hint: `${openOrders} open`, href: "/admin/orders" },
    { label: "Customers", value: String(customers.length), hint: "in book", href: "/admin/customers" },
    { label: "Order value", value: formatCurrency(revenue), hint: "excl. cancelled", href: "/admin/orders" },
  ];

  const recent = orders.slice(0, 5);

  return (
    <>
      <PageHeader title="Dashboard" description="A quick read on inventory, orders, and customers." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
              <SectionTitle>{stat.label}</SectionTitle>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className="mt-1 text-xs text-[#5f4e35]">{stat.hint}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <div className="flex items-center justify-between">
            <SectionTitle>Recent orders</SectionTitle>
            <Link href="/admin/orders" className="text-xs font-semibold text-[#536c48] hover:text-[#1f2f1d]">
              View all →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-[#5f4e35]">No orders yet. Create one from the Orders page.</p>
          ) : (
            <div className="mt-4 grid gap-2">
              {recent.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#5d3d24]/10 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{order.reference} · {order.customerName || "—"}</p>
                    <p className="font-mono text-xs text-[#5f4e35]">
                      {order.items.length} item{order.items.length === 1 ? "" : "s"} · {formatCurrency(order.total)}
                    </p>
                  </div>
                  <StatusPill status={order.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle>Promotion</SectionTitle>
          <p className="mt-3 text-sm font-semibold">
            {settings.promotion.enabled ? "Banner is live" : "Banner is off"}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#5f4e35]">{settings.promotion.message}</p>
          <Link
            href="/admin/promotions"
            className="mt-4 inline-flex rounded-full bg-[#1f2f1d] px-4 py-2 text-xs font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
          >
            Manage promotion
          </Link>
        </Card>
      </div>
    </>
  );
}
