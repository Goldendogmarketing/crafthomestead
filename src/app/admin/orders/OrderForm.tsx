"use client";

import { useState } from "react";
import { createOrderAction } from "../actions";
import type { OrderItem } from "@/lib/types";

type ProductOption = { id: string; breed: string; unit: string; price: number };
type CustomerOption = { id: string; name: string; email: string; phone: string };

const inputClass =
  "w-full rounded-xl border border-[#5d3d24]/15 bg-white px-3 py-2 text-sm text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2";
const labelClass = "grid gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f4e35]";

export default function OrderForm({
  products,
  customers,
}: {
  products: ProductOption[];
  customers: CustomerOption[];
}) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addItem() {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product || qty < 1) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        { productId: product.id, label: product.breed, unit: product.unit, qty, price: product.price },
      ];
    });
    setQty(1);
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function onSelectCustomer(id: string) {
    setCustomerId(id);
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      setCustomerName(customer.name);
      setCustomerContact(customer.email || customer.phone);
    }
  }

  return (
    <form action={createOrderAction} className="grid gap-5">
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <input type="hidden" name="customerId" value={customerId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Existing customer
          <select value={customerId} onChange={(e) => onSelectCustomer(e.target.value)} className={inputClass}>
            <option value="">— New / walk-in —</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Status
          <select name="status" defaultValue="New" className={inputClass}>
            <option>New</option>
            <option>Confirmed</option>
            <option>Fulfilled</option>
            <option>Cancelled</option>
          </select>
        </label>
        <label className={labelClass}>
          Customer name
          <input
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Contact (email or phone)
          <input
            name="customerContact"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="rounded-xl border border-[#5d3d24]/15 bg-white p-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#536c48]">Line items</p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="grid flex-1 gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f4e35]">
            Product
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className={inputClass}>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.breed} — ${p.price}/{p.unit}
                </option>
              ))}
            </select>
          </label>
          <label className="grid w-24 gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f4e35]">
            Qty
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className={inputClass}
            />
          </label>
          <button
            type="button"
            onClick={addItem}
            className="rounded-full bg-[#536c48] px-5 py-2 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
          >
            Add item
          </button>
        </div>

        {items.length > 0 ? (
          <div className="mt-4 grid gap-2">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#f8f0df] px-3 py-2 text-sm"
              >
                <span>
                  {item.qty} × {item.label}{" "}
                  <span className="font-mono text-xs text-[#5f4e35]">(${item.price}/{item.unit})</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-semibold">${item.price * item.qty}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-xs font-semibold text-[#a23b2d] hover:underline"
                  >
                    Remove
                  </button>
                </span>
              </div>
            ))}
            <div className="mt-1 flex justify-between border-t border-[#5d3d24]/10 pt-2 text-sm font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-[#5f4e35]">No items yet — add at least one to create the order.</p>
        )}
      </div>

      <label className={labelClass}>
        Notes
        <textarea name="notes" rows={2} className={inputClass} placeholder="Pickup window, special requests..." />
      </label>

      <button
        type="submit"
        disabled={items.length === 0}
        className="justify-self-start rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] transition hover:bg-[#314a2d] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Create order
      </button>
    </form>
  );
}
