import React from 'react'
import Image from 'next/image';
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react';


const extraData = [
  {
    title: "توصيل مجاني\nوسريع",
    description: "نوصل الثوب إلى بابك مجانًا، في الوقت المحدد، أينما كنت داخل المملكة.",
    icon: <Truck size={45} />,
  },
  {
    title: "ضمان على \n الحشوات والقلاب",
    description: "لأننا واثقون من جودة تفصيلنا، نوفر لك ضمانًا شاملاً على الحشوات والقلاب.",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "جودة عالية\nفي كل تفصيلة",
    description: "من أول غرزة إلى آخر زر، نهتم بأدق التفاصيل لتخرج بثوب يليق بك.",
    icon: <Headset size={45} />,
  },
  {
    title: "جودة عالية\nفي كل تفصيلة",
    description: "من أول غرزة إلى آخر زر، نهتم بأدق التفاصيل لتخرج بثوب يليق بك.",
    icon: <ShieldCheck size={45} />,
  },
];




const SpecHome = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 text-black gap-2 md:gap-4  p-2   py-10">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col mx-auto items-center px-0 md:px-5 text-center gap-5 group text-shadow-kha_light_bg hoverEffect"
          >
            <span >
              {item?.icon}
            </span>
            <p className="text-kha_gold whitespace-pre-line capitalize text-xl md:text-2xl  font-semibold">
              {item?.title}
            </p>
            <p className="text-black text-sm">{item?.description}</p>
          </div>
        ))}
      </div>
  )
}

export default SpecHome