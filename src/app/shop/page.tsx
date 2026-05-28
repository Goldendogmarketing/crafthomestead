import { getActiveProducts } from "@/lib/data";
import PromoBanner from "../PromoBanner";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getActiveProducts();

  return (
    <>
      <PromoBanner />
      <ShopClient products={products} />
    </>
  );
}
