import PromoBanner from "./PromoBanner";
import HeroVideo from "./HeroVideo";

export const dynamic = "force-dynamic";

const breeds = [
  {
    name: "Lavender Ameraucana",
    eggs: "soft blue eggs",
    price: "$80 / dozen eggs · $15 chicks",
    note: "Docile, friendly birds selected for calm temperament and rich blue shells.",
  },
  {
    name: "Black Copper Maran",
    eggs: "chocolate brown eggs",
    price: "$70 / dozen eggs · $12 chicks",
    note: "Deep color, classic character, and a favorite for colorful egg baskets.",
  },
  {
    name: "Silverudd",
    eggs: "mossy green + speckled eggs",
    price: "$70 / dozen eggs · $12 chicks",
    note: "Curious Swedish-origin birds known for green tones and free-range confidence.",
  },
  {
    name: "Olive Egger",
    eggs: "olive green eggs",
    price: "$70 / dozen eggs · $12 chicks",
    note: "A boutique color project with varied shades, depth, and personality.",
  },
];

const careNotes = [
  "Organic, non-GMO feed",
  "Daily free-ranging on pasture",
  "Strict biosecurity practices",
  "NPIP / AI Clean flock standards",
];

const faqs = [
  {
    q: "How do orders work?",
    a: "Orders are prepaid and fulfilled first-come, first-served by seasonal availability. Request availability or join the next hatch list, then we will confirm seasonal timing, breed options, and pickup or shipping details directly.",
  },
  {
    q: "Can people visit the farm?",
    a: "Farm tours and on-site browsing are limited because biosecurity matters. Pickup and shipping details are coordinated directly.",
  },
  {
    q: "When do lists open?",
    a: "Spring interest opens in January and fall interest opens in July, with fulfillment dependent on laying and hatch windows.",
  },
];

const products = [
  {
    eyebrow: "Hatching Eggs",
    title: "Colorful dozens from selected craft flocks.",
    copy: "Blue, olive, chocolate, cream, and speckled eggs packed with care for homesteaders building a more beautiful basket.",
  },
  {
    eyebrow: "Day-Old Chicks",
    title: "Small-batch chicks by seasonal hatch window.",
    copy: "Specialty breed chicks raised from thoughtfully selected parent stock and offered by waitlist as availability allows.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f0df] text-[#20180f]">
      <PromoBanner />
      <section className="relative isolate flex min-h-screen flex-col px-5 py-6 text-[#fdf7ea] sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0c0a07]">
          <HeroVideo src="/hero/hero.mp4" poster="/hero/hero-poster.webp" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,5,0.86)_0%,rgba(8,7,5,0.6)_38%,rgba(8,7,5,0.26)_66%,rgba(8,7,5,0.1)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,5,0.5)_0%,transparent_22%,transparent_58%,rgba(8,7,5,0.78)_100%)]" />
        </div>
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/12 bg-black/25 px-5 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          <a href="#top" className="font-mono text-xl tracking-[-0.08em] text-[#fdf7ea]">
            craft.
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#e8dcc4] md:flex">
            <a href="#breeds" className="transition hover:text-white">Breeds</a>
            <a href="#care" className="transition hover:text-white">Care</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
            <a href="/shop" className="transition hover:text-white">Shop</a>
          </nav>
          <a
            href="#request"
            className="rounded-full bg-[#fdf7ea] px-4 py-2 text-sm font-semibold text-[#1f2f1d] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Request Availability
          </a>
        </header>

        <div id="top" className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end pb-16 pt-24 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-[#dfe7cf] backdrop-blur-sm">
              small-batch homestead poultry
            </p>
            <h1 className="text-balance text-6xl font-semibold leading-[0.9] tracking-[-0.07em] text-[#fdf7ea] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl">
              Colorful hatching eggs from a small craft homestead.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#e7dcc8] [text-shadow:0_1px_24px_rgba(0,0,0,0.6)] sm:text-xl">
              Craft Homestead raises specialty chicken breeds on Northeast Florida pasture and timberland — with organic non-GMO feed, daily free-ranging, and careful seasonal hatch windows.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#request" className="rounded-full bg-[#fdf7ea] px-7 py-4 text-center font-semibold text-[#1f2f1d] shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:bg-white">
                Request Availability
              </a>
              <a href="#breeds" className="rounded-full border border-white/30 bg-white/5 px-7 py-4 text-center font-semibold text-[#fdf7ea] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/12">
                View Breeds
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#20180f] px-5 py-20 text-[#fff8e8] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#a4b582]">Boutique farm, real care</p>
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
            Built for people who want more than anonymous hatchery stock.
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2">
          {products.map((product) => (
            <article key={product.eyebrow} className="rounded-[2rem] border border-[#fff8e8]/10 bg-[#fff8e8]/7 p-8 shadow-2xl shadow-black/10">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#a7cbd0]">{product.eyebrow}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em]">{product.title}</h3>
              <p className="mt-4 text-lg leading-8 text-[#eadfca]/80">{product.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="breeds" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#536c48]">Selected breeds</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-[#20180f] sm:text-6xl">Color, character, and small-flock selection.</h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-[#5f4e35]">The breed lineup is designed for beautiful baskets and practical homestead birds — from soft blues to deep chocolate and olive tones.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {breeds.map((breed) => (
              <article key={breed.name} className="group rounded-[2rem] border border-[#5d3d24]/10 bg-[#fff8e8]/75 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5d3d24]/10">
                <div className="mb-8 h-36 rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_35%,#a7cbd0,transparent_22%),radial-gradient(circle_at_65%_55%,#8b9862,transparent_24%),linear-gradient(135deg,#ead9b9,#c99b73)] transition group-hover:scale-[1.02]" />
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#20180f]">{breed.name}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[#536c48]">{breed.eggs}</p>
                <p className="mt-5 text-sm font-semibold text-[#7b4b2a]">{breed.price}</p>
                <p className="mt-4 leading-7 text-[#5f4e35]">{breed.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="care" className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#314a2d] text-[#fff8e8] shadow-2xl shadow-[#314a2d]/20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#bfcf9b]">Care standards</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Raised with careful standards from flock to basket.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#efe0c2]">Every order starts with healthy flocks, thoughtful handling, and seasonal rhythm — the details that make a small craft homestead different from anonymous hatchery stock.</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {careNotes.map((note) => (
                <div key={note} className="rounded-2xl border border-[#fff8e8]/10 bg-[#fff8e8]/10 p-4 font-semibold">{note}</div>
              ))}
            </div>
          </div>
          <div className="min-h-[420px] bg-[radial-gradient(circle_at_55%_22%,rgba(248,240,223,0.35),transparent_18%),linear-gradient(160deg,#1f2f1d,#536c48_48%,#d8b992)] p-8">
            <div className="flex h-full items-end rounded-[2rem] border border-[#fff8e8]/20 bg-black/10 p-6 backdrop-blur-[1px]">
              <p className="max-w-sm text-2xl font-semibold tracking-[-0.04em]">Pasture-raised birds, colorful eggs, and seasonal hatch windows handled with care.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#fff8e8] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#536c48]">Pricing preview</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Simple seasonal pricing, finalized by availability.</h2>
            <div className="rounded-[2rem] border border-[#5d3d24]/10 bg-[#f8f0df] p-6">
              <div className="grid gap-3">
                {breeds.map((breed) => (
                  <div key={`pricing-${breed.name}`} className="flex flex-col justify-between gap-2 rounded-2xl bg-[#fff8e8] p-4 sm:flex-row sm:items-center">
                    <span className="font-semibold">{breed.name}</span>
                    <span className="font-mono text-sm text-[#7b4b2a]">{breed.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-[#5f4e35]">Mixed dozens and special requests are quoted directly. Shipping and pickup details depend on the order window.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-mono text-sm uppercase tracking-[0.24em] text-[#536c48]">FAQ</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-center text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">The questions buyers need answered first.</h2>
          <div className="mt-12 grid gap-4">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-[1.5rem] border border-[#5d3d24]/10 bg-[#fff8e8]/70 p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.q}</h3>
                <p className="mt-3 leading-7 text-[#5f4e35]">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-[#20180f] p-8 text-[#fff8e8] sm:p-14 lg:grid-cols-[0.95fr_1.05fr] lg:p-20">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#a7cbd0]">Next hatch window</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Request availability for hatching eggs or day-old chicks.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#eadfca]/80">Tell us what you are looking for and we will follow up with current breed availability, hatch windows, and order details.</p>
          </div>
          <form className="rounded-[2rem] border border-[#fff8e8]/10 bg-[#fff8e8]/10 p-5 shadow-2xl shadow-black/10 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#efe0c2]">
                Name
                <input className="rounded-2xl border border-[#fff8e8]/15 bg-[#fff8e8] px-4 py-3 text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#efe0c2]">
                Email or phone
                <input className="rounded-2xl border border-[#fff8e8]/15 bg-[#fff8e8] px-4 py-3 text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2" placeholder="Best contact" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-[#efe0c2]">
              Interested in
              <select className="rounded-2xl border border-[#fff8e8]/15 bg-[#fff8e8] px-4 py-3 text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2" defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option>Hatching eggs</option>
                <option>Day-old chicks</option>
                <option>Mixed dozen / custom request</option>
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-[#efe0c2]">
              Notes
              <textarea className="min-h-28 rounded-2xl border border-[#fff8e8]/15 bg-[#fff8e8] px-4 py-3 text-[#20180f] outline-none ring-[#a7cbd0] focus:ring-2" placeholder="Breed interests, timing, quantity, pickup/shipping questions..." />
            </label>
            <button type="button" className="mt-5 w-full rounded-full bg-[#fff8e8] px-8 py-4 font-semibold text-[#20180f] transition hover:-translate-y-1 hover:bg-white">
              Send Availability Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
