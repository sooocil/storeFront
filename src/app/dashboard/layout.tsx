"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
