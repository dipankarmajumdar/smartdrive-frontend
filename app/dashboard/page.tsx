"use client";

import UploadForm from "../components/UploadForm";
import FileList from "../components/FileList";
import LogoutButton from "../components/LogoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 relative">
        {/* Logout Button in top-right */}
        <div className="absolute top-4 right-6">
          <LogoutButton />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          📁 Dashboard
        </h1>

        <UploadForm onUploadSuccess={() => location.reload()} />
        <FileList />
      </div>
    </div>
  );
};

export default DashboardPage;
