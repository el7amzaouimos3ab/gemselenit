import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
import Title from "./Title";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] bg-darkColor border-gray-900 group ">
      <div className="relative group overflow-hidden ">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full object-contain overflow-hidden transition-transform duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs text-white border  px-2 group-hover:bg-gray-700 hoverEffect">
            Sale!
          </p>
        ) : product?.status === "new" ? (
          <p className="absolute top-2 left-2 z-10 text-xs text-white bg-green-600 border border-green-600 px-2 group-hover:bg-green-700 hoverEffect">
            New!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}

      </div>
      <div className="p-3 flex flex-col gap-2">
        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="text-xl font-semibold text-gray-100 line-clamp-2">{product?.name}</Title>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-green-effect" : " text-lightText"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs tracking-wide">5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium text-gray-400">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-darckBlue font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-none" />
      </div>
    </div>
  );
};

export default ProductCard;
