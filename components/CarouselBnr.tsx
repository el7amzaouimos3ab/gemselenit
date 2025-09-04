"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import HomeBanner from "./HomeBanner"
import HomeBannerTwo from "./HomeBannerTwo"
import HomeBannerThree from "./HomeBannerThree"

import {  motion } from "framer-motion";


export default function CarouselBnr() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        className="w-full"
      >
        <SwiperSlide>
          <HomeBanner />
        </SwiperSlide>
        <SwiperSlide>
          <HomeBannerTwo />
        </SwiperSlide>
        <SwiperSlide>
          <HomeBannerThree />
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation buttons */}
      <button
        className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 
        text-4xl text-white rounded-full 
        w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
      >
        ‹
      </button>
      <button
        className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 
        text-4xl text-white rounded-full 
        w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
      >
        ›
      </button>
    </div>
    </motion.div>
  )
}
