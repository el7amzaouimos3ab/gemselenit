import React from "react";
import {  Headset, ShieldCheck, Truck, BanknoteIcon } from "lucide-react";

const extraData = [
  {
    title: "quality guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={50} />,
  },
  {
    title: "Free Delivery",
    description: "Free shipping on morocco",
    icon: <Truck size={50} />,
  },
  {
    title: "cash on delivery",
    description: "open and check, than pay.",
    icon: <BanknoteIcon size={50} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={50} />,
  },
  
];

const ShopByBrands = async () => {
  return (
    
    <div className="mb-10 lg:mb-20">
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 hover:shadow-shop_light_green/20 ">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col w-full mx-auto border border-shop_light_green/20 p-7 text-gray-400 items-center px-3 md:px-5 text-center gap-3 md:gap-5 group hoverEffect"
          >
            <span className="inline-flex text-gray-200 scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-200  font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-gray-400">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
