import { getCustomers } from "@/lib/data";
import { PageHeader, Card, SectionTitle, inputClass, labelClass } from "../ui";
import { createCustomerAction, updateCustomerAction, deleteCustomerAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <>
      <PageHeader
        title="Customers"
        description="Keep a simple book of customers to attach to orders and future marketing."
      />

      <details className="mb-6">
        <summary className="inline-flex cursor-pointer items-center rounded-full bg-[#1f2f1d] px-5 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]">
          + Add a customer
        </summary>
        <Card className="mt-4">
          <SectionTitle>New customer</SectionTitle>
          <form action={createCustomerAction} className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input name="name" required className={inputClass} />
            </label>
            <label className={labelClass}>
              Email
              <input name="email" type="email" className={inputClass} />
            </label>
            <label className={labelClass}>
              Phone
              <input name="phone" className={inputClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Notes
              <textarea name="notes" rows={2} className={inputClass} />
            </label>
            <button
              type="submit"
              className="justify-self-start rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d] sm:col-span-2"
            >
              Add customer
            </button>
          </form>
        </Card>
      </details>

      {customers.length === 0 ? (
        <Card>
          <p className="text-sm text-[#5f4e35]">No customers yet. Add one above.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold tracking-[-0.02em]">{customer.name}</p>
                  <p className="font-mono text-xs text-[#5f4e35]">
                    {[customer.email, customer.phone].filter(Boolean).join(" · ") || "No contact on file"}
                  </p>
                  {customer.notes ? <p className="mt-2 text-sm text-[#5f4e35]">{customer.notes}</p> : null}
                </div>
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-[#536c48] hover:text-[#1f2f1d]">
                  Edit
                </summary>
                <form action={updateCustomerAction} className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="id" value={customer.id} />
                  <label className={labelClass}>
                    Name
                    <input name="name" defaultValue={customer.name} required className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Email
                    <input name="email" type="email" defaultValue={customer.email} className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Phone
                    <input name="phone" defaultValue={customer.phone} className={inputClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Notes
                    <textarea name="notes" defaultValue={customer.notes} rows={2} className={inputClass} />
                  </label>
                  <button
                    type="submit"
                    className="justify-self-start rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
                  >
                    Save changes
                  </button>
                </form>
                <form action={deleteCustomerAction} className="mt-3">
                  <input type="hidden" name="id" value={customer.id} />
                  <button type="submit" className="text-xs font-semibold text-[#a23b2d] hover:underline">
                    Delete this customer
                  </button>
                </form>
              </details>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
