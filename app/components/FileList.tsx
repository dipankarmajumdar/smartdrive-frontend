"use client";

import { useEffect, useState } from "react";
import { CloudDownload, FileText, Loader2, Trash2 } from "lucide-react";

type FileItem = {
  _id: string;
  filename: string;
  size: number;
  s3Url: string;
};

const FileList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const fetchFiles = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized or failed to fetch files");

      const data = await res.json();
      setFiles(data.files || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (fileId: string, filename: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmed || !token) return;

    setDeletingFileId(fileId);

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/auth/files/${fileId}?filename=${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setFiles((prev) => prev.filter((file) => file._id !== fileId));
    } catch (err) {
      alert("❌ Failed to delete the file. Try again.");
    } finally {
      setDeletingFileId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-6">{error}</p>
    );
  }

  if (files.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
        You haven't uploaded any files yet.
      </p>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <ul className="space-y-4">
        {files.map((file) => (
          <li
            key={file._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex items-start gap-3">
              <FileText className="text-indigo-600 dark:text-indigo-400 mt-1" />
              <div>
                <p className="text-sm text-gray-800 dark:text-white sm:max-w-none sm:truncate-none max-w-[180px] truncate">
                  {file.filename}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-4 sm:mt-0 sm:flex-row">
              <a
                href={file.s3Url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
              >
                <CloudDownload className="h-4 w-4 mr-1" />
                Download
              </a>

              <button
                onClick={() => handleDelete(file._id, file.filename)}
                disabled={deletingFileId === file._id}
                className="text-red-600 hover:text-red-700 dark:text-red-400 disabled:opacity-50"
              >
                {deletingFileId === file._id ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
