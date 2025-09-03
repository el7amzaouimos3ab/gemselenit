import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from 'next/image'
import { logo } from '@/images'



const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex items-center gap-2">
      <Image 
          src={logo} 
          alt="logo1"
          loading="lazy"
          width="388"
          height="303"
          className={cn(
          "w-17 h-17",
          className
          )}
          decoding="async"
          data-nimg="1"
          />
      <h2
        className={cn(
          "hidden md:inline text-2xl text-shop_dark_green font-black tracking-wider uppercase hover:text-shop_light_green hoverEffect group font-sans",
          className
        )}
      >
        gems
        <span
          className={cn(
            "hidden md:inline text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
            spanDesign
          )}
        >
          elenit
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
