import CarouselBnr from "@/components/CarouselBnr";
import {  CarouselCandles } from "@/components/CarouselCandels";
import { CarouselLamps } from "@/components/CarouselLamps";
import { CarouselProducts } from "@/components/CarouselProducts";
import Container from "@/components/Container";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

import React from "react";

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <>
      <CarouselBnr />
    <Container>
      <CarouselLamps />
      <CarouselProducts/>
      <CarouselCandles />

      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </Container>
    </>
  );
};

export default Home;
