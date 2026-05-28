import { PageHeader, Card, SectionTitle } from "../ui";

export const dynamic = "force-dynamic";

const planned = [
  { title: "Hatch-list email blasts", copy: "Notify the waitlist when a new seasonal window opens." },
  { title: "Seasonal campaigns", copy: "Schedule spring and fall promotions tied to laying windows." },
  { title: "Customer segments", copy: "Group customers by breed interest for targeted outreach." },
  { title: "Conversion tracking", copy: "Measure which promotions drive availability requests." },
];

export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        description="Campaign tools for future development. The foundation (customers, orders, promotions) is already in place."
      />

      <Card className="bg-[#20180f] text-[#fff8e8]">
        <SectionTitle>Coming soon</SectionTitle>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cdbfa6]">
          Marketing campaigns are planned for a later phase. The data this will build on — your customer book,
          order history, and the promotional banner — is managed in the other sections today.
        </p>
      </Card>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {planned.map((item) => (
          <Card key={item.title} className="opacity-90">
            <p className="font-semibold tracking-[-0.02em]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#5f4e35]">{item.copy}</p>
            <span className="mt-4 inline-flex rounded-full bg-[#20180f]/5 px-3 py-1 text-xs font-semibold text-[#5f4e35]">
              Planned
            </span>
          </Card>
        ))}
      </div>
    </>
  );
}
