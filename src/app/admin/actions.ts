"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  updatePromotion,
} from "@/lib/data";
import type { Availability, Category, OrderItem, OrderStatus } from "@/lib/types";

function str(formData: FormData, key: string, fallback = ""): string {
  return String(formData.get(key) ?? fallback).trim();
}

function num(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function bool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin", "layout");
}

function parseProductFields(formData: FormData) {
  return {
    breed: str(formData, "breed"),
    category: str(formData, "category", "Hatching Eggs") as Category,
    eggColor: str(formData, "eggColor"),
    price: num(formData, "price"),
    unit: str(formData, "unit", "dozen"),
    stock: num(formData, "stock"),
    availability: str(formData, "availability", "In stock") as Availability,
    swatch: str(formData, "swatch", "#a7cbd0"),
    note: str(formData, "note"),
    active: bool(formData, "active"),
  };
}

/* Products */

export async function createProductAction(formData: FormData) {
  await createProduct(parseProductFields(formData));
  revalidateAll();
}

export async function updateProductAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await updateProduct(id, parseProductFields(formData));
  revalidateAll();
}

export async function deleteProductAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await deleteProduct(id);
  revalidateAll();
}

/* Customers */

export async function createCustomerAction(formData: FormData) {
  await createCustomer({
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    notes: str(formData, "notes"),
  });
  revalidateAll();
}

export async function updateCustomerAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await updateCustomer(id, {
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    notes: str(formData, "notes"),
  });
  revalidateAll();
}

export async function deleteCustomerAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await deleteCustomer(id);
  revalidateAll();
}

/* Orders */

export async function createOrderAction(formData: FormData) {
  let items: OrderItem[] = [];
  try {
    items = JSON.parse(str(formData, "items", "[]")) as OrderItem[];
  } catch {
    items = [];
  }
  items = items.filter((item) => item.productId && item.qty > 0);
  if (items.length === 0) return;

  await createOrder({
    customerId: str(formData, "customerId") || null,
    customerName: str(formData, "customerName"),
    customerContact: str(formData, "customerContact"),
    items,
    status: str(formData, "status", "New") as OrderStatus,
    notes: str(formData, "notes"),
  });
  revalidateAll();
}

export async function updateOrderStatusAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await updateOrderStatus(id, str(formData, "status", "New") as OrderStatus);
  revalidateAll();
}

export async function deleteOrderAction(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;
  await deleteOrder(id);
  revalidateAll();
}

/* Promotion */

export async function updatePromotionAction(formData: FormData) {
  await updatePromotion({
    enabled: bool(formData, "enabled"),
    message: str(formData, "message"),
    ctaLabel: str(formData, "ctaLabel"),
    ctaHref: str(formData, "ctaHref"),
  });
  revalidateAll();
}
