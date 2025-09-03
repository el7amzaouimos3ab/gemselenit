"use server";

import { client } from "@/sanity/lib/client";
import { Address } from "@/sanity.types";
import { CartItem } from "@/store";
import { nanoid } from "nanoid";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerStreet: string; 
  clerkUserId?: string;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);
    const discount = 0; // Calculate if you have any discount logic
    const totalPrice = subtotal - discount;

    const orderDoc = {
  _type: "order",
  orderNumber: metadata.orderNumber,
  customerName: metadata.customerName,
  email: metadata.customerEmail,
  phone: metadata.customerPhone,
  customerCity: metadata.customerCity,       // 👈 save city
  customerStreet: metadata.customerStreet,   // 👈 save street
  clerkUserId: metadata.clerkUserId ?? null,
  products: items.map((item) => ({
    _key: nanoid(),
    product: {
      _ref: item.product._id,
      _type: "reference",
    },
    quantity: item.quantity,
  })),
  totalPrice,
  amountDiscount: discount,
  currency: "USD",

  status: "pending",
  orderDate: new Date().toISOString(),
};


    const result = await client.create(orderDoc); // SERVER SIDE TOKEN REQUIRED
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
