"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function DonatePage() {
  const [amount, setAmount] = useState(5);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDonate() {
    setError("");
    setIsLoading(true);

    if (amount < 5) {
      setError("Minimum donation is $5");
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error?.message ||
            JSON.stringify(data.error) ||
            "Failed to create order"
        );
        return;
      }
      setIsLoading(false);
      // Redirect user to PayPal approval URL
      window.location.href = data.approvalUrl;
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href="https://www.paypal.com/ncp/payment/8UR5V9V3ZCDV2">
        <Button onClick={handleDonate} className="w-full h-12">
          <Image src="/assets/paypal.svg" alt="PayPal" height={30} width={30} />
          Donate with PayPal
        </Button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
