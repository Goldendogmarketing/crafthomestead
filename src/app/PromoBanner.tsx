import { getSettings } from "@/lib/data";

export default async function PromoBanner() {
  const { promotion } = await getSettings();
  if (!promotion.enabled || !promotion.message) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#314a2d] px-5 py-2.5 text-center text-sm text-[#fff8e8]">
      <span className="font-semibold">{promotion.message}</span>
      {promotion.ctaLabel ? (
        <a
          href={promotion.ctaHref || "#"}
          className="inline-flex rounded-full bg-[#fff8e8] px-3 py-1 text-xs font-semibold text-[#20180f] transition hover:bg-white"
        >
          {promotion.ctaLabel}
        </a>
      ) : null}
    </div>
  );
}
