import React, { useState, useEffect } from "react";
import vid from "../assets/vid.mp4"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Video Section */}
      <div className="lg:w-1/2 relative h-72 lg:h-screen overflow-hidden">
        <video
          src={vid}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 opacity-60"></div>
        {/* Optional overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl lg:text-5xl font-bold drop-shadow-lg mb-2">
            Welcome Back!
          </h1>
          <p className="text-lg lg:text-xl drop-shadow-md">
            Enter your credentials to access your account
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 bg-gray-100 lg:bg-transparent">
        <form id="form"
          onSubmit={handleSubmit}
          className="bg-white lg:bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn flex-1 "
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <div className="relative mb-6">
            <input  
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition "
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full p-4 rounded-lg text-white font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 transition-all shadow-md"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <span className="text-red-500 font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
