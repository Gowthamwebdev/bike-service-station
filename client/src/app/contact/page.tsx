"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !content) {
      alert("Please fill in both fields.");
      return;
    }
    console.log("Submitted:", { email, content });
    setSubmitted(true);
    setEmail("");
    setContent("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 border p-6 rounded-md"
      >
        <h1 className="text-2xl font-medium">Contact Us</h1>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Your Query
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your issue or query"
            rows={4}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Submit
        </button>

        {submitted && (
          toast.success('Query submitted successfully')
        )}
      </form>
    </div>
  );
};

export default ContactPage;
