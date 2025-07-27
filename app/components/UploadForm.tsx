"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, Loader2, UploadCloud, XCircle } from "lucide-react";

type FileType = {
  _id: string;
  originalname: string;
  filename: string;
  url: string;
  uploadedAt: string;
};

type UploadFormProps = {
  onUploadSuccess: (newFile: FileType) => void;
};

const UploadForm = ({ onUploadSuccess }: UploadFormProps) => {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!fileToUpload || !token) return;

    setUploading(true);
    setMessage({ type: null, text: "" });

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok || !result.file) {
        throw new Error(result.message || "Upload failed");
      }

      onUploadSuccess(result.file);
      setMessage({ type: "success", text: "✅ File uploaded successfully!" });
      setFileToUpload(null);
    } catch (err: unknown) {
      const error = err as Error;
      setMessage({
        type: "error",
        text: error?.message || "❌ Something went wrong during upload.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4">
      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFileToUpload(e.target.files?.[0] || null)
          }
          className="w-full sm:w-[80%] px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="h-5 w-5" />
              Upload
            </>
          )}
        </button>
      </form>

      {message.type && (
        <div
          className={`mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition ${
            message.type === "success"
              ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900"
              : "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
