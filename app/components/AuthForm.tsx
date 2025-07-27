"use client";

import { Lock, Mail, Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AuthPayload } from "@/types";
import { loginUser, registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const toggleMode = () => setIsRegister((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: AuthPayload = {
      email: form.email,
      password: form.password,
    };

    try {
      if (isRegister) {
        await registerUser(payload);
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        const res = await loginUser(payload);
        localStorage.setItem("accessToken", res.accessToken);
        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl transition-all">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {isRegister ? "Create an Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              {isRegister ? "Registering..." : "Logging in..."}
            </>
          ) : (
            <>{isRegister ? "Register" : "Login"}</>
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-indigo-600 hover:underline font-medium"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
