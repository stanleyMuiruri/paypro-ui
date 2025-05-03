// LoginPage.js
import React, { useState } from 'react';
import logo from '../../assets/pesalink_logo_new.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    localStorage.setItem("user",email)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-pesalink-dark)] px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="PesaLink Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center text-[var(--color-pesalink-blue)] mb-4">Welcome to PesaLink</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-pesalink-blue)] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@pesalink.co.ke"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-pesalink-teal)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-pesalink-blue)] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-pesalink-teal)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[var(--color-pesalink-teal)] hover:bg-[var(--color-pesalink-teal-hover)] text-white font-semibold rounded-md transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-sm text-[var(--color-pesalink-blue)] hover:text-[var(--color-pesalink-orange)] transition">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
