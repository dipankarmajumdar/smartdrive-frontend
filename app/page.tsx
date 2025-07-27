import AuthForm from "./components/AuthForm";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-10 py-12">
        {/* Left Branding Section (Hidden on small screens) */}
        <div className="hidden md:flex flex-col flex-1 items-start justify-center text-white space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-snug">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              SmartDrive
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Secure cloud storage for your files with modern UI, seamless UX, and
            real-time features.
          </p>
        </div>

        {/* Right Auth Form Section */}
        <div className="w-full md:w-[400px] bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 transition">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
