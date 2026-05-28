import { getSettings } from "@/lib/data";
import { PageHeader, Card, SectionTitle, inputClass, labelClass } from "../ui";
import { updatePromotionAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const { promotion } = await getSettings();

  return (
    <>
      <PageHeader
        title="Promotions"
        description="Toggle the promotional call-to-action banner on the public site and edit its message and link."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <SectionTitle>Promotional banner</SectionTitle>
          <form action={updatePromotionAction} className="mt-4 grid gap-4">
            <label className="flex items-center gap-3 rounded-xl border border-[#5d3d24]/15 bg-white px-4 py-3">
              <input
                name="enabled"
                type="checkbox"
                defaultChecked={promotion.enabled}
                className="h-5 w-5"
              />
              <span className="text-sm font-semibold">Show the banner on the site</span>
            </label>
            <label className={labelClass}>
              Message
              <input name="message" defaultValue={promotion.message} className={inputClass} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Button label
                <input name="ctaLabel" defaultValue={promotion.ctaLabel} className={inputClass} />
              </label>
              <label className={labelClass}>
                Button link
                <input name="ctaHref" defaultValue={promotion.ctaHref} className={inputClass} />
              </label>
            </div>
            <button
              type="submit"
              className="justify-self-start rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
            >
              Save promotion
            </button>
          </form>
        </Card>

        <Card className="bg-[#20180f] text-[#fff8e8]">
          <SectionTitle>Preview</SectionTitle>
          <div className="mt-4 rounded-2xl border border-dashed border-[#fff8e8]/25 p-4">
            {promotion.enabled ? (
              <div className="flex flex-col items-center gap-3 rounded-xl bg-[#314a2d] px-4 py-3 text-center sm:flex-row sm:justify-center">
                <span className="text-sm font-semibold">{promotion.message}</span>
                <span className="rounded-full bg-[#fff8e8] px-4 py-1.5 text-xs font-semibold text-[#20180f]">
                  {promotion.ctaLabel}
                </span>
              </div>
            ) : (
              <p className="text-center text-sm text-[#cdbfa6]">Banner is currently hidden from visitors.</p>
            )}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#cdbfa6]">
            When enabled, this banner appears at the top of the homepage and shop.
          </p>
        </Card>
      </div>
    </>
  );
}
