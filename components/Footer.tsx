import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-shop_light_green/20">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText className="text-gray-200">
              Discover Gemselenit’s thoughtfully curated selenite and gemstone collections, where timeless beauty and spiritual harmony come together to elevate your lifestyle.
            </SubText>
            <SocialMedia
              className="text-gray-200/60"
              iconClassName="border-gray-200/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-gray-200 text-black rounded-none"
            />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green hoverEffect font-medium text-gray-500"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="hover:text-shop_light_green hoverEffect font-medium text-gray-500"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </SubText>
            <form className="space-y-3">
              <Input className="rounded-none" placeholder="Enter your email" type="email" required />
              <Button className="w-full rounded-none">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t border-shop_light_green/20 text-center text-sm text-gray-400">
          <div>
            © {new Date().getFullYear()} GEMSELENIT. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
