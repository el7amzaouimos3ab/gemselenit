import React from "react";

import Image from "next/image";
import { BNR3, BNR3Mobile } from "@/images";

const HomeBannerThree = () => {
  return (
      
    <div>
      <Image
          src={BNR3}
          alt="banner_3"
          className="hidden md:inline-flex w-full"
        />
        <Image
          src={BNR3Mobile}
          alt="banner_3"
          className="inline-flex md:hidden w-full"
        />
    </div>
  );
};

export default HomeBannerThree;
