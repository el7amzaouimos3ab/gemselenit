import React from "react";

import Image from "next/image";
import { BNR1, BNR1Mobile } from "@/images";

const HomeBanner = () => {
  return (
      
    <div>
      <Image
          src={BNR1}
          alt="banner_1"
          className="hidden md:inline-flex w-full"
        />
        <Image
          src={BNR1Mobile}
          alt="banner_1"
          className="inline-flex md:hidden w-full"
        />
    </div>
  );
};

export default HomeBanner;
