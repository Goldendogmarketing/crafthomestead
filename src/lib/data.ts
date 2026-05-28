import { readCollection, writeCollection, genId } from "./store";
import type {
  Product,
  Customer,
  Order,
  OrderStatus,
  Settings,
  Category,
  Availability,
} from "./types";

const PRODUCT_SEED: Product[] = [
  { id: "lavender-ameraucana-eggs", breed: "Lavender Ameraucana", category: "Hatching Eggs", eggColor: "soft blue eggs", price: 80, unit: "dozen", stock: 6, availability: "In stock", swatch: "#a7cbd0", note: "Docile birds selected for calm temperament and rich blue shells.", active: true },
  { id: "lavender-ameraucana-chicks", breed: "Lavender Ameraucana", category: "Day-Old Chicks", eggColor: "soft blue eggs", price: 15, unit: "chick", stock: 0, availability: "Waitlist", swatch: "#a7cbd0", note: "Next hatch window pending — join the list for seasonal timing.", active: true },
  { id: "black-copper-maran-eggs", breed: "Black Copper Maran", category: "Hatching Eggs", eggColor: "chocolate brown eggs", price: 70, unit: "dozen", stock: 3, availability: "Limited", swatch: "#7b4b2a", note: "Deep color and classic character for colorful egg baskets.", active: true },
  { id: "black-copper-maran-chicks", breed: "Black Copper Maran", category: "Day-Old Chicks", eggColor: "chocolate brown eggs", price: 12, unit: "chick", stock: 8, availability: "In stock", swatch: "#7b4b2a", note: "Small-batch chicks raised from thoughtfully selected parent stock.", active: true },
  { id: "silverudd-eggs", breed: "Silverudd", category: "Hatching Eggs", eggColor: "mossy green + speckled eggs", price: 70, unit: "dozen", stock: 5, availability: "In stock", swatch: "#8b9862", note: "Curious Swedish-origin birds known for green tones and confidence.", active: true },
  { id: "silverudd-chicks", breed: "Silverudd", category: "Day-Old Chicks", eggColor: "mossy green + speckled eggs", price: 12, unit: "chick", stock: 0, availability: "Sold out", swatch: "#8b9862", note: "This window is fully spoken for — check back next season.", active: true },
  { id: "olive-egger-eggs", breed: "Olive Egger", category: "Hatching Eggs", eggColor: "olive green eggs", price: 70, unit: "dozen", stock: 4, availability: "Limited", swatch: "#6d7b3a", note: "A boutique color project with varied shades, depth, and personality.", active: true },
  { id: "olive-egger-chicks", breed: "Olive Egger", category: "Day-Old Chicks", eggColor: "olive green eggs", price: 12, unit: "chick", stock: 10, availability: "In stock", swatch: "#6d7b3a", note: "Specialty breed chicks offered by waitlist as availability allows.", active: true },
];

const SETTINGS_SEED: Settings = {
  promotion: {
    enabled: false,
    message: "Spring hatch list is open — reserve your dozen now.",
    ctaLabel: "Request availability",
    ctaHref: "/shop",
  },
};

const PRODUCTS_FILE = "products.json";
const CUSTOMERS_FILE = "customers.json";
const ORDERS_FILE = "orders.json";
const SETTINGS_FILE = "settings.json";

/* Products */

export async function getProducts(): Promise<Product[]> {
  return readCollection<Product[]>(PRODUCTS_FILE, PRODUCT_SEED);
}

export async function getActiveProducts(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.active);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.id === id);
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  const products = await getProducts();
  const product: Product = { ...input, id: genId("prod") };
  await writeCollection(PRODUCTS_FILE, [...products, product]);
  return product;
}

export async function updateProduct(id: string, input: Partial<Omit<Product, "id">>): Promise<void> {
  const products = await getProducts();
  await writeCollection(
    PRODUCTS_FILE,
    products.map((p) => (p.id === id ? { ...p, ...input } : p)),
  );
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts();
  await writeCollection(
    PRODUCTS_FILE,
    products.filter((p) => p.id !== id),
  );
}

/* Customers */

export async function getCustomers(): Promise<Customer[]> {
  return readCollection<Customer[]>(CUSTOMERS_FILE, []);
}

export async function getCustomer(id: string): Promise<Customer | undefined> {
  return (await getCustomers()).find((c) => c.id === id);
}

export async function createCustomer(input: Omit<Customer, "id" | "createdAt">): Promise<Customer> {
  const customers = await getCustomers();
  const customer: Customer = { ...input, id: genId("cust"), createdAt: new Date().toISOString() };
  await writeCollection(CUSTOMERS_FILE, [...customers, customer]);
  return customer;
}

export async function updateCustomer(id: string, input: Partial<Omit<Customer, "id" | "createdAt">>): Promise<void> {
  const customers = await getCustomers();
  await writeCollection(
    CUSTOMERS_FILE,
    customers.map((c) => (c.id === id ? { ...c, ...input } : c)),
  );
}

export async function deleteCustomer(id: string): Promise<void> {
  const customers = await getCustomers();
  await writeCollection(
    CUSTOMERS_FILE,
    customers.filter((c) => c.id !== id),
  );
}

/* Orders */

export async function getOrders(): Promise<Order[]> {
  const orders = await readCollection<Order[]>(ORDERS_FILE, []);
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return (await getOrders()).find((o) => o.id === id);
}

export async function createOrder(input: Omit<Order, "id" | "reference" | "createdAt" | "total">): Promise<Order> {
  const orders = await readCollection<Order[]>(ORDERS_FILE, []);
  const total = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order: Order = {
    ...input,
    id: genId("ord"),
    reference: `CH-${String(orders.length + 1).padStart(4, "0")}`,
    total,
    createdAt: new Date().toISOString(),
  };
  await writeCollection(ORDERS_FILE, [...orders, order]);
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const orders = await readCollection<Order[]>(ORDERS_FILE, []);
  await writeCollection(
    ORDERS_FILE,
    orders.map((o) => (o.id === id ? { ...o, status } : o)),
  );
}

export async function deleteOrder(id: string): Promise<void> {
  const orders = await readCollection<Order[]>(ORDERS_FILE, []);
  await writeCollection(
    ORDERS_FILE,
    orders.filter((o) => o.id !== id),
  );
}

/* Settings */

export async function getSettings(): Promise<Settings> {
  return readCollection<Settings>(SETTINGS_FILE, SETTINGS_SEED);
}

export async function updatePromotion(promotion: Settings["promotion"]): Promise<void> {
  const settings = await getSettings();
  await writeCollection(SETTINGS_FILE, { ...settings, promotion });
}

export type { Product, Customer, Order, OrderStatus, Category, Availability };
