// src/pages/Signup.tsx
import React, { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

interface GoogleUser {
  email: string;
  name?: string;
  picture?: string;
}

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.username === username)) {
      alert("User already exists!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      alert("Google login failed");
      return;
    }

    // Decode JWT token safely with TypeScript
    const decoded = (jwt_decode as any)(token) as GoogleUser;
    const email = decoded.email;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.find((u: any) => u.username === email)) {
      users.push({ username: email, password: null });
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert(`Logged in with Google as ${email}`);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

      <input
        className="w-full p-3 mb-4 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 border rounded"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="w-full bg-emerald-600 text-white py-3 rounded mb-6 hover:bg-emerald-700 transition"
        onClick={handleSignUp}
      >
        Create Account
      </button>

      <div className="mb-4">Or Sign Up with Google</div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => alert("Google login failed")}
      />

      <p className="mt-6 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-emerald-600 font-semibold">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
