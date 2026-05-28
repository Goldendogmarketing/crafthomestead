import { getOrders, getProducts, getCustomers } from "@/lib/data";
import { ORDER_STATUSES } from "@/lib/types";
import { PageHeader, Card, SectionTitle, StatusPill } from "../ui";
import { updateOrderStatusAction, deleteOrderAction } from "../actions";
import OrderForm from "./OrderForm";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default async function OrdersPage() {
  const [orders, products, customers] = await Promise.all([getOrders(), getProducts(), getCustomers()]);

  const productOptions = products.map((p) => ({ id: p.id, breed: p.breed, unit: p.unit, price: p.price }));
  const customerOptions = customers.map((c) => ({ id: c.id, name: c.name, email: c.email, phone: c.phone }));

  return (
    <>
      <PageHeader
        title="Orders"
        description="Manually create and track orders. Update status as you confirm and fulfill them."
      />

      <details className="mb-6">
        <summary className="inline-flex cursor-pointer items-center rounded-full bg-[#1f2f1d] px-5 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]">
          + Create an order
        </summary>
        <Card className="mt-4">
          <SectionTitle>New order</SectionTitle>
          <div className="mt-4">
            <OrderForm products={productOptions} customers={customerOptions} />
          </div>
        </Card>
      </details>

      {orders.length === 0 ? (
        <Card>
          <p className="text-sm text-[#5f4e35]">No orders yet. Use “Create an order” above to add one.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold tracking-[-0.02em]">{order.reference}</p>
                    <StatusPill status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-[#5f4e35]">
                    {order.customerName || "—"}
                    {order.customerContact ? ` · ${order.customerContact}` : ""}
                  </p>
                  <p className="font-mono text-xs text-[#5f4e35]">{formatDate(order.createdAt)}</p>
                </div>
                <p className="text-xl font-semibold text-[#7b4b2a]">${order.total}</p>
              </div>

              <div className="mt-4 grid gap-1 rounded-xl bg-[#f8f0df] p-3 text-sm">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>
                      {item.qty} × {item.label} <span className="font-mono text-xs text-[#5f4e35]">/ {item.unit}</span>
                    </span>
                    <span className="font-mono">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {order.notes ? <p className="mt-3 text-sm text-[#5f4e35]">Notes: {order.notes}</p> : null}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <form action={updateOrderStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="rounded-xl border border-[#5d3d24]/15 bg-white px-3 py-2 text-sm"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-[#536c48] px-4 py-2 text-xs font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
                  >
                    Update status
                  </button>
                </form>
                <form action={deleteOrderAction}>
                  <input type="hidden" name="id" value={order.id} />
                  <button type="submit" className="text-xs font-semibold text-[#a23b2d] hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
