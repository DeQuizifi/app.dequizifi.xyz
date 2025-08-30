"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

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
