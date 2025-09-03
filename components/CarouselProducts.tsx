"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { productType } from "@/constants/data";
import { Product } from "@/sanity.types";

import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Title from "./Title";
import Link from "next/link";

export function CarouselProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const query = `
    *[_type == "product" && variant == $variant] | order(name asc) {
      ...,
      "categories": categories[]->title
    }
  `;

  const params = { variant: "plates".toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <>
    <div className="w-full">
      <div className="flex items-center flex-wrap gap-5 justify-between my-10">
        <Title >plates</Title>
        <Link
        href={"/category/plates"}
        className="border border-gray-800 px-4 py-1 hover:bg-shop_light_green text-white hover:text-white hover:border-shop_light_green hoverEffect"
      >
        See all
      </Link>
      </div>
      

      {loading && (
        <div className="flex justify-center items-center w-full py-6">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}

      {!loading && products?.length === 0 && <NoProductAvailable />}

      {!loading && products?.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            768: { slidesPerView: 3.5 }, // md screens
            1024: { slidesPerView: 4.5 }, // lg screens
          }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
    </>
  );
}
