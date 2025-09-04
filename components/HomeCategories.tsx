import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";


const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-darkColor my-10">
      <Title >Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-black/30 text-gray-300 p-5 flex items-center gap-5 group"
          >
            {category?.image && (
              <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-1">
              <Link href={`/category/${category?.slug?.current}`}>
                <h3 className="text-xl font-semibold capitalize text-gray-200">{category?.title}</h3>
              </Link>
              <p className="text-sm text-gray-400">
                <span className="font-bold text-shop_dark_green ">{`(${category?.productCount})`}</span>{" "}
                items Available
              </p>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
