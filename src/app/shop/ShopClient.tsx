"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Availability, Category, Product } from "@/lib/types";

const filters: Array<"All" | Category> = ["All", "Hatching Eggs", "Day-Old Chicks"];

const availabilityStyles: Record<Availability, string> = {
  "In stock": "border-[#536c48]/30 bg-[#536c48]/15 text-[#314a2d]",
  Limited: "border-[#b5803a]/30 bg-[#e9c489]/30 text-[#7b4b2a]",
  Waitlist: "border-[#5d7b86]/30 bg-[#a7cbd0]/30 text-[#3c5760]",
  "Sold out": "border-[#5d3d24]/20 bg-[#20180f]/5 text-[#5f4e35]",
};

function formatPrice(value: number) {
  return `$${value.toLocaleString()}`;
}

export default function ShopClient({ products }: { products: Product[] }) {
  const [active, setActive] = useState<"All" | Category>("All");
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = useMemo(
    () => (active === "All" ? products : products.filter((item) => item.category === active)),
    [active, products],
  );

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: products.find((i) => i.id === id), qty }))
        .filter((line): line is { item: Product; qty: number } => Boolean(line.item) && line.qty > 0),
    [cart, products],
  );

  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);

  function add(item: Product) {
    setCart((prev) => {
      const next = (prev[item.id] ?? 0) + 1;
      if (next > item.stock) return prev;
      return { ...prev, [item.id]: next };
    });
  }

  function remove(id: string) {
    setCart((prev) => {
      const next = (prev[id] ?? 0) - 1;
      if (next <= 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }

  return (
    <main className="min-h-screen bg-[#f8f0df] text-[#20180f]">
      <header className="sticky top-0 z-30 border-b border-[#5d3d24]/10 bg-[#f8f0df]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="font-mono text-xl tracking-[-0.08em] text-[#1f2f1d]">
            craft.
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#4f422f] md:flex">
            <Link href="/" className="hover:text-[#1f2f1d]">Home</Link>
            <Link href="/#breeds" className="hover:text-[#1f2f1d]">Breeds</Link>
            <Link href="/#faq" className="hover:text-[#1f2f1d]">FAQ</Link>
          </nav>
          <a
            href="#basket"
            className="rounded-full bg-[#1f2f1d] px-4 py-2 text-sm font-semibold text-[#fff8e8] shadow-lg shadow-[#1f2f1d]/15 transition hover:-translate-y-0.5 hover:bg-[#314a2d]"
          >
            Basket · {itemCount}
          </a>
        </div>
      </header>

      <section className="px-5 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#536c48]">Shop &amp; availability</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Current inventory by breed and hatch window.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f4e35]">
            Add what you are after to a request basket. Orders are prepaid and fulfilled first-come,
            first-served by seasonal availability — we confirm timing, pickup, or shipping directly.
          </p>

          <Link
            href="/shop/build-a-dozen"
            className="mt-10 flex flex-col gap-3 rounded-[2rem] border border-[#1f2f1d]/15 bg-[linear-gradient(135deg,#314a2d,#536c48_70%,#8b9862)] p-6 text-[#fff8e8] shadow-xl shadow-[#314a2d]/20 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#dbe7c5]">New</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Craft your own dozen</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#eef3e2]/90">
                Mix shell colors egg by egg and build a custom carton for your basket.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#fff8e8] px-6 py-3 text-sm font-semibold text-[#20180f]">
              Start building →
            </span>
          </Link>

          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  active === filter
                    ? "border-[#1f2f1d] bg-[#1f2f1d] text-[#fff8e8]"
                    : "border-[#5d3d24]/15 bg-[#fff8e8]/70 text-[#4f422f] hover:border-[#1f2f1d]/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {visible.length === 0 ? (
              <p className="text-sm text-[#5f4e35]">No products available in this category right now.</p>
            ) : null}
            {visible.map((item) => {
              const inCart = cart[item.id] ?? 0;
              const soldOut = item.stock === 0;
              const maxed = inCart >= item.stock;
              return (
                <article
                  key={item.id}
                  className="flex flex-col rounded-[2rem] border border-[#5d3d24]/10 bg-[#fff8e8]/75 p-6 shadow-sm"
                >
                  <div
                    className="mb-6 h-32 rounded-[1.5rem]"
                    style={{
                      background: `radial-gradient(circle at 32% 35%, ${item.swatch}, transparent 45%), linear-gradient(135deg, #ead9b9, #c99b73)`,
                    }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-[-0.04em]">{item.breed}</h2>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[#536c48]">
                        {item.category}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${availabilityStyles[item.availability]}`}
                    >
                      {item.availability}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#5f4e35]">{item.note}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#7b4b2a]">{formatPrice(item.price)}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#5f4e35]">
                      / {item.unit}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#5f4e35]">
                    {soldOut ? "None available this window" : `${item.stock} ${item.unit}${item.stock === 1 ? "" : "s"} available`}
                  </p>

                  <div className="mt-auto pt-6">
                    {inCart > 0 ? (
                      <div className="flex items-center justify-between rounded-full border border-[#1f2f1d]/15 bg-[#fff8e8] p-1">
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label={`Remove one ${item.breed}`}
                          className="h-9 w-9 rounded-full bg-[#1f2f1d]/5 text-lg font-semibold text-[#1f2f1d] transition hover:bg-[#1f2f1d]/10"
                        >
                          −
                        </button>
                        <span className="font-semibold">{inCart}</span>
                        <button
                          type="button"
                          onClick={() => add(item)}
                          disabled={maxed}
                          aria-label={`Add one ${item.breed}`}
                          className="h-9 w-9 rounded-full bg-[#1f2f1d]/5 text-lg font-semibold text-[#1f2f1d] transition hover:bg-[#1f2f1d]/10 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => add(item)}
                        disabled={soldOut}
                        className="w-full rounded-full bg-[#1f2f1d] px-6 py-3 text-sm font-semibold text-[#fff8e8] transition hover:-translate-y-0.5 hover:bg-[#314a2d] disabled:cursor-not-allowed disabled:bg-[#20180f]/20 disabled:hover:translate-y-0"
                      >
                        {soldOut ? "Join waitlist" : "Add to basket"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <aside id="basket" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] bg-[#20180f] p-7 text-[#fff8e8] shadow-2xl shadow-[#20180f]/20">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#a7cbd0]">Request basket</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {itemCount === 0 ? "Your basket is empty" : `${itemCount} item${itemCount === 1 ? "" : "s"} selected`}
              </h2>

              {lines.length > 0 ? (
                <div className="mt-6 grid gap-3">
                  {lines.map((line) => (
                    <div
                      key={line.item.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[#fff8e8]/10 bg-[#fff8e8]/10 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{line.item.breed}</p>
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#eadfca]/70">
                          {line.qty} × {formatPrice(line.item.price)} / {line.item.unit}
                        </p>
                      </div>
                      <span className="font-semibold">{formatPrice(line.item.price * line.qty)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#eadfca]/80">
                  Add hatching eggs or chicks to build a request. We will confirm seasonal availability
                  before any payment.
                </p>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-[#fff8e8]/10 pt-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a7cbd0]">Estimated subtotal</span>
                <span className="text-2xl font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <button
                type="button"
                disabled={itemCount === 0}
                className="mt-6 w-full rounded-full bg-[#fff8e8] px-6 py-4 font-semibold text-[#20180f] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:bg-[#fff8e8]/30 disabled:text-[#fff8e8]/60 disabled:hover:translate-y-0"
              >
                Request this basket
              </button>
              <p className="mt-3 text-center text-xs text-[#eadfca]/60">
                Subtotal is an estimate. Final pricing depends on the order window.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
