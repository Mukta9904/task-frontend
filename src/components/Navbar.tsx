"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <Button size="sm" color="default" onPress={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
