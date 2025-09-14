"use client";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { address } = useUser();

  useEffect(() => {
    if (address) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [address, router]);

  return null;
}
