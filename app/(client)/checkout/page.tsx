"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import PriceFormatter from "@/components/PriceFormatter";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";

import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import useStore from "@/store";
import { useUser } from "@clerk/nextjs";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CheckOut = () => {
  const { getTotalPrice, getSubTotalPrice } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const [, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [customerName, setCustomerName] = useState(user?.fullName ?? "");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("Marrakech"); // initial value

  const [customerStreet, setCustomerStreet] = useState("");

  const [customerEmail, setCustomerEmail] = useState(user?.emailAddresses[0]?.emailAddress ?? "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch addresses
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      setSelectedAddress(defaultAddress ?? data[0] ?? null);
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) {
      toast.error("Please select an address!");
      return;
    }
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName,
        customerEmail,
        customerCity,
        customerPhone,
        customerStreet,
        clerkUserId: user?.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        router.push(`/success?orderNumber=${metadata.orderNumber}`);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to proceed to checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-darkBg text-gray-200 pb-52 md:pb-10">
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-gray-300" />
                <Title>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 border border-shop_light_green/30 bg-darkBg p-6">
                  <h2 className="text-xl font-semibold mb-4">Checkout Form</h2>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block mb-1">Name:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 border text-gray-200"
                        placeholder="your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Phone:</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2 border text-gray-200"
                        required
                        pattern="^[0-9+\-()\s]*$"
                        placeholder="+212 6 12 34 56 78"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="hidden w-full p-2 border text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">City:</label>
                      <select
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full p-2 border text-gray-200 mb-2"
                        required
                      >
                        <option value="Marrakech">Marrakech</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Fes">Fes</option>
                        <option value="Tangier">Tangier</option>
                        <option value="Agadir">Agadir</option>
                        <option value="Oujda">Oujda</option>
                        <option value="Kenitra">Kenitra</option>
                        <option value="Tetouan">Tetouan</option>
                        <option value="Safi">Safi</option>
                        <option value="El Jadida">El Jadida</option>
                        <option value="Khouribga">Khouribga</option>
                        <option value="Meknes">Meknes</option>
                        <option value="Nador">Nador</option>
                        <option value="Beni Mellal">Beni Mellal</option>
                        {/* ➕ add more cities if you need */}  
                      </select>

                      <label className="block mb-1">Street / Address:</label>
                      <input
                        type="text"
                        onChange={(e) => setCustomerStreet(e.target.value)}
                        className="w-full p-2 border text-gray-200"
                        placeholder="Street, building, house number..."
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full rounded-none font-semibold tracking-wide hoverEffect">
                      {loading ? "Processing..." : "Place Order"}
                    </Button>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-darkBg p-6 border border-shop_light_green/30 text-gray-300">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                      </div>
                      <Separator className="bg-shop_light_green/30"/>
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className="text-lg font-bold text-white"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Order Summary */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-darkBg pt-2">
                  <div className="bg-darkBg p-4 border border-shop_light_green/30 text-gray-300 mx-4">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                      </div>
                      <Separator className="bg-shop_light_green/30"/>
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className="text-lg font-bold text-white"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>

    </div>
  );
};

export default CheckOut;
