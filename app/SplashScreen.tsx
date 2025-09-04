"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { Loader2 } from "lucide-react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // 1.2s splash
    return () => clearTimeout(timer);
  }, [pathname]); // triggers on every route change

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-darkBg">
        <div className="flex flex-col items-center">
          <Logo />
          <div className="flex justify-center items-center gap-2">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          <p className="mt-4 text-lg text-gray-300 font-medium">Loading</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
