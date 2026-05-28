export type Category = "Hatching Eggs" | "Day-Old Chicks";

export type Availability = "In stock" | "Limited" | "Waitlist" | "Sold out";

export const CATEGORIES: Category[] = ["Hatching Eggs", "Day-Old Chicks"];
export const AVAILABILITIES: Availability[] = ["In stock", "Limited", "Waitlist", "Sold out"];

export type Product = {
  id: string;
  breed: string;
  category: Category;
  eggColor: string;
  price: number;
  unit: string;
  stock: number;
  availability: Availability;
  swatch: string;
  note: string;
  active: boolean;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
};

export type OrderStatus = "New" | "Confirmed" | "Fulfilled" | "Cancelled";

export const ORDER_STATUSES: OrderStatus[] = ["New", "Confirmed", "Fulfilled", "Cancelled"];

export type OrderItem = {
  productId: string;
  label: string;
  unit: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  reference: string;
  customerId: string | null;
  customerName: string;
  customerContact: string;
  items: OrderItem[];
  status: OrderStatus;
  notes: string;
  total: number;
  createdAt: string;
};

export type Promotion = {
  enabled: boolean;
  message: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Settings = {
  promotion: Promotion;
};
