'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cities from "../../../data/cities";

export default function Home() {
  const router = useRouter();
  const defaultCity = cities[0]?.id || 'istanbul';

  useEffect(() => {
    router.push(`/app/${defaultCity}`);
  }, [router, defaultCity]);

  return null;
}
