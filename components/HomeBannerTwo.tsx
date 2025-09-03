import React from "react";

import Image from "next/image";
import { BNR2, BNR2Mobile } from "@/images";

const HomeBannerTwo = () => {
  return (
      
    <div>
      <Image
          src={BNR2}
          alt="banner_2"
          className="hidden md:inline-flex w-full"
        />
        <Image
          src={BNR2Mobile}
          alt="banner_2"
          className="inline-flex md:hidden w-full"
        />
    </div>
  );
};

export default HomeBannerTwo;
