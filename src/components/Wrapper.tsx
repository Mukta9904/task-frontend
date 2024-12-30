"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    // Show a loading state while checking the token
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Return null if the user is unauthenticated to avoid rendering children prematurely
    return null;
  }

  return <>{children}</>;
};

export default Wrapper;
