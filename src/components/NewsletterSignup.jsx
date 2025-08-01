import React, { useState } from "react";
import BackgroundLayout from "./BackgroundLayout";
import backend from "../utils/backend";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await backend.post("/newsletter/subscribe", { email });

    if (res.status === 200) {
      setStatus("🙏 Thank you for subscribing!");
      setEmail("");
    } else {
      setStatus(res.data?.message || "❌ Something went wrong.");
    }
  } catch (err) {
    setStatus("❌ Server error. Try again later.");
    console.error(err);
  }
  };

  return (
    <BackgroundLayout>
    <div className="max-w-md mx-auto p-8 bg-cream/50 rounded-lg border border-yellow-800/10 mt-6">
      <h2 className="text-2xl font-semibold text-charcoal text-center mb-4 font-lora">📬 Subscribe to the Weekly Wisdom</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
        >
          Subscribe
        </button>
        {status && <p className="text-sm text-center text-gray-700">{status}</p>}
      </form>
    </div>
    </BackgroundLayout>
  );
}
