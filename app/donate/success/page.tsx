"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [message, setMessage] = useState("Processing your donation...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const payerID = urlParams.get("PayerID");

    if (!token || !payerID) {
      setMessage("Invalid payment details.");
      return;
    }

    // Optionally, call your API route to capture payment here
    // For now, just show thank you

    setMessage("Thank you for your donation!");
  }, []);

  return (
    <div className="flex justify-center items-center p-6 min-h-[400px] text-center">
      <div>
        <h1>{message}</h1>
        <Link href="/">Back to homepage</Link>
      </div>
    </div>
  );
}
