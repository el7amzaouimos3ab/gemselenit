"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./SplashScreen";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useState, useEffect, useRef } from "react";

// Helper to identify dynamic page type
const getPageType = (pathname: string) => {
  if (pathname.startsWith("/category/")) return "category";
  if (pathname.startsWith("/product/")) return "product";
  return "static";
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPageType = useRef<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const currentPageType = getPageType(pathname);

    if (prevPageType.current === null) setShowSplash(true);
    else if (currentPageType === "category" && prevPageType.current === "category")
      setShowSplash(false);
    else setShowSplash(true);

    prevPageType.current = currentPageType;
  }, [pathname]);

  return (
    <>
      <ProgressBar
        height="4px"
        color="#FF0000"
        options={{ showSpinner: true }}
        shallowRouting
      />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key={pathname}>{children}</SplashScreen>
        ) : (
          <motion.div
            key={pathname} // ensures motion detects route change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
