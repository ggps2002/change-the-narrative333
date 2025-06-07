"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function DonatePage() {
  const [amount, setAmount] = useState(5);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDonate() {
    setError("");
    setIsLoading(true)

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
      <div className="flex items-center gap-2">
        <p>$</p>
        <Input
          type="number"
          min={5}
          step={0.01}
          value={amount > 5 ? amount : 5}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <Button onClick={handleDonate} className="w-64 h-10">
        {isLoading ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin"/>
                Please wait...
            </>
        ) : (
          <>
            <Image src="/assets/paypal.svg" alt="PayPal" height={30} width={30} />
            Donate with PayPal
          </>
        )}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
