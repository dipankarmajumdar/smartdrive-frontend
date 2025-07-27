"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
};

export default LogoutButton;
