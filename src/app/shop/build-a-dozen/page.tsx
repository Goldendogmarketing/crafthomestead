"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const DOZEN = 12;
const DOZEN_PRICE = 75;

type EggColor = {
  id: string;
  name: string;
  hex: string;
  breed: string;
};

const eggColors: EggColor[] = [
  { id: "sky", name: "Sky Blue", hex: "#a7cbd0", breed: "Lavender Ameraucana" },
  { id: "chocolate", name: "Chocolate", hex: "#7b4b2a", breed: "Black Copper Maran" },
  { id: "moss", name: "Mossy Green", hex: "#8b9862", breed: "Silverudd" },
  { id: "olive", name: "Olive", hex: "#5f6e34", breed: "Olive Egger" },
  { id: "cream", name: "Cream", hex: "#f1e2c0", breed: "Farm mix" },
  { id: "clay", name: "Speckled Clay", hex: "#d9a68f", breed: "Farm mix" },
];

const colorById = Object.fromEntries(eggColors.map((c) => [c.id, c]));

const eggShape = "rounded-[50%_50%_50%_50%/60%_60%_40%_40%]";

function eggBackground(hex: string) {
  return `radial-gradient(circle at 36% 28%, rgba(255,255,255,0.55), transparent 42%), ${hex}`;
}

export default function BuildADozenPage() {
  const [eggs, setEggs] = useState<string[]>([]);

  const isFull = eggs.length >= DOZEN;
  const remaining = DOZEN - eggs.length;

  const tally = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id of eggs) counts[id] = (counts[id] ?? 0) + 1;
    return eggColors.map((c) => ({ color: c, count: counts[c.id] ?? 0 })).filter((t) => t.count > 0);
  }, [eggs]);

  function addEgg(id: string) {
    setEggs((prev) => (prev.length >= DOZEN ? prev : [...prev, id]));
  }

  function removeAt(index: number) {
    setEggs((prev) => prev.filter((_, i) => i !== index));
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
            <Link href="/shop" className="hover:text-[#1f2f1d]">Shop</Link>
            <Link href="/#faq" className="hover:text-[#1f2f1d]">FAQ</Link>
          </nav>
          <Link
            href="/shop"
            className="rounded-full border border-[#1f2f1d]/20 bg-[#fff8e8]/70 px-4 py-2 text-sm font-semibold text-[#1f2f1d] transition hover:-translate-y-0.5 hover:bg-[#fff8e8]"
          >
            Back to shop
          </Link>
        </div>
      </header>

      <section className="px-5 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#536c48]">Craft your own dozen</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Build a basket of color, one egg at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f4e35]">
            Tap a shell color to drop an egg into the carton. Mix blues, chocolates, greens, and cream
            until you have a full dozen — then send it as a request and we will confirm seasonal availability.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Carton */}
          <div className="rounded-[2.5rem] border border-[#5d3d24]/15 bg-[linear-gradient(160deg,#e7cfa6,#d8b992_60%,#c9a878)] p-6 shadow-2xl shadow-[#5d3d24]/15 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#5d3d24]">Your carton</p>
              <p className="font-mono text-sm font-semibold text-[#3c2c1a]">{eggs.length} / {DOZEN}</p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3 rounded-[2rem] bg-[#b9986f]/60 p-4 shadow-inner sm:grid-cols-6 sm:gap-4 sm:p-6">
              {Array.from({ length: DOZEN }).map((_, index) => {
                const id = eggs[index];
                const color = id ? colorById[id] : null;
                return (
                  <div
                    key={index}
                    className="relative flex aspect-[3/4] items-center justify-center rounded-[50%] bg-[#8f7048]/45 shadow-[inset_0_4px_8px_rgba(61,40,18,0.45)]"
                  >
                    {color ? (
                      <button
                        type="button"
                        onClick={() => removeAt(index)}
                        aria-label={`Remove ${color.name} egg`}
                        title={`${color.name} — click to remove`}
                        className={`group h-full w-[78%] ${eggShape} border border-black/10 shadow-md transition hover:-translate-y-0.5`}
                        style={{ background: eggBackground(color.hex) }}
                      >
                        <span className="flex h-full items-center justify-center text-lg font-bold text-white/0 transition group-hover:text-white/80">
                          ×
                        </span>
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#3c2c1a]">
                {isFull
                  ? "Dozen complete — ready to request."
                  : `${remaining} more to fill the dozen.`}
              </p>
              <button
                type="button"
                onClick={() => setEggs([])}
                disabled={eggs.length === 0}
                className="rounded-full border border-[#3c2c1a]/30 bg-[#fff8e8]/70 px-4 py-2 text-sm font-semibold text-[#3c2c1a] transition hover:bg-[#fff8e8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear carton
              </button>
            </div>
          </div>

          {/* Palette + summary */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-[#5d3d24]/10 bg-[#fff8e8]/75 p-6 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#536c48]">Shell colors</p>
              <div className="mt-5 grid gap-3">
                {eggColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => addEgg(color.id)}
                    disabled={isFull}
                    className="flex items-center gap-4 rounded-2xl border border-[#5d3d24]/10 bg-[#fff8e8] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#1f2f1d]/25 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <span
                      className={`h-12 w-9 shrink-0 ${eggShape} border border-black/10 shadow`}
                      style={{ background: eggBackground(color.hex) }}
                    />
                    <span className="flex-1">
                      <span className="block font-semibold tracking-[-0.02em]">{color.name}</span>
                      <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#536c48]">
                        {color.breed}
                      </span>
                    </span>
                    <span className="rounded-full bg-[#1f2f1d] px-3 py-1.5 text-sm font-semibold text-[#fff8e8]">
                      + Add
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#20180f] p-7 text-[#fff8e8] shadow-2xl shadow-[#20180f]/20">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#a7cbd0]">Custom dozen</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {eggs.length === 0 ? "Start adding eggs" : `${eggs.length} egg${eggs.length === 1 ? "" : "s"} in the carton`}
              </h2>

              {tally.length > 0 ? (
                <div className="mt-5 grid gap-2">
                  {tally.map(({ color, count }) => (
                    <div key={color.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-5 w-4 ${eggShape} border border-white/20`}
                          style={{ background: eggBackground(color.hex) }}
                        />
                        {color.name}
                      </span>
                      <span className="font-mono text-[#eadfca]/80">× {count}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-between border-t border-[#fff8e8]/10 pt-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a7cbd0]">Dozen price</span>
                <span className="text-2xl font-semibold">${DOZEN_PRICE}</span>
              </div>

              <button
                type="button"
                disabled={!isFull}
                className="mt-6 w-full rounded-full bg-[#fff8e8] px-6 py-4 font-semibold text-[#20180f] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:bg-[#fff8e8]/30 disabled:text-[#fff8e8]/60 disabled:hover:translate-y-0"
              >
                {isFull ? "Request this dozen" : `Add ${remaining} more egg${remaining === 1 ? "" : "s"}`}
              </button>
              <p className="mt-3 text-center text-xs text-[#eadfca]/60">
                A full dozen is required to request. Final mix is confirmed by seasonal availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
