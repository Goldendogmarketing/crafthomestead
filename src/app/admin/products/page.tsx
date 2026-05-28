import { getProducts } from "@/lib/data";
import { CATEGORIES, AVAILABILITIES, type Product } from "@/lib/types";
import { PageHeader, Card, SectionTitle, inputClass, labelClass } from "../ui";
import { createProductAction, updateProductAction, deleteProductAction } from "../actions";

export const dynamic = "force-dynamic";

function ProductFields({ product }: { product?: Product }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={`${labelClass} sm:col-span-2`}>
        Breed / name
        <input name="breed" defaultValue={product?.breed} required className={inputClass} />
      </label>
      <label className={labelClass}>
        Category
        <select name="category" defaultValue={product?.category ?? "Hatching Eggs"} className={inputClass}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Availability
        <select name="availability" defaultValue={product?.availability ?? "In stock"} className={inputClass}>
          {AVAILABILITIES.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Price ($)
        <input name="price" type="number" min="0" step="1" defaultValue={product?.price ?? 0} required className={inputClass} />
      </label>
      <label className={labelClass}>
        Unit
        <input name="unit" defaultValue={product?.unit ?? "dozen"} className={inputClass} />
      </label>
      <label className={labelClass}>
        Stock
        <input name="stock" type="number" min="0" step="1" defaultValue={product?.stock ?? 0} className={inputClass} />
      </label>
      <label className={labelClass}>
        Shell swatch
        <input name="swatch" type="color" defaultValue={product?.swatch ?? "#a7cbd0"} className={`${inputClass} h-10 p-1`} />
      </label>
      <label className={labelClass}>
        Egg color label
        <input name="eggColor" defaultValue={product?.eggColor} className={inputClass} />
      </label>
      <label className={`${labelClass}`}>
        <span className="flex items-center gap-2 normal-case tracking-normal">
          <input name="active" type="checkbox" defaultChecked={product?.active ?? true} className="h-4 w-4" />
          Visible on shop
        </span>
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Note
        <textarea name="note" defaultValue={product?.note} rows={2} className={inputClass} />
      </label>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        title="Products"
        description="Add, edit pricing and stock, toggle shop visibility, or remove products. Changes show on the shop immediately."
      />

      <details className="mb-6">
        <summary className="inline-flex cursor-pointer items-center rounded-full bg-[#1f2f1d] px-5 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]">
          + Add a product
        </summary>
        <Card className="mt-4">
          <SectionTitle>New product</SectionTitle>
          <form action={createProductAction} className="mt-4">
            <ProductFields />
            <button
              type="submit"
              className="mt-5 rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
            >
              Create product
            </button>
          </form>
        </Card>
      </details>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border border-black/10"
                  style={{ background: product.swatch }}
                />
                <div>
                  <p className="font-semibold tracking-[-0.02em]">{product.breed}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#536c48]">
                    {product.category} · ${product.price}/{product.unit} · {product.stock} in stock
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.active ? "bg-[#536c48]/15 text-[#314a2d]" : "bg-[#20180f]/5 text-[#5f4e35]"}`}>
                  {product.active ? "On shop" : "Hidden"}
                </span>
              </div>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-[#536c48] hover:text-[#1f2f1d]">
                Edit
              </summary>
              <form action={updateProductAction} className="mt-4">
                <input type="hidden" name="id" value={product.id} />
                <ProductFields product={product} />
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-[#1f2f1d] px-6 py-2.5 text-sm font-semibold text-[#fff8e8] hover:bg-[#314a2d]"
                  >
                    Save changes
                  </button>
                </div>
              </form>
              <form action={deleteProductAction} className="mt-3">
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  className="text-xs font-semibold text-[#a23b2d] hover:underline"
                >
                  Delete this product
                </button>
              </form>
            </details>
          </Card>
        ))}
      </div>
    </>
  );
}
