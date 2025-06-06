"use client";

import { auth } from "@/lib/firebase/utils";
import { useRouter } from "next/navigation";
import { reload, sendEmailVerification, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type StatusType = "error" | "success";
interface Status {
  type: StatusType;
  message: string;
}

export default function VerifyPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const router = useRouter();

  const checkVerification = async () => {
    await reload(auth.currentUser!);
    if (auth.currentUser?.emailVerified) {
      router.push("/dashboard");
    } else {
      setStatus({
        type: "error",
        message: "Email not verified yet. Please verify your email and try again.",
      });
    }
  };

  const handleResend = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setStatus({
          type: "success",
          message: "Verification email has been resent. Please check your inbox.",
        });
      } catch (error: unknown) {
        console.error("Error resending email:", error);
        setStatus({
          type: "error",
          message: "Failed to resend verification email. Please try again later.",
        });
      }
    } else {
      setStatus({
        type: "error",
        message: "No user is currently signed in.",
      });
    }
  };

  const handleWrongEmail = async () => {
    try {
      await signOut(auth);
      router.push("/register");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">Verify Your Email</h1>

        <p className="text-center text-sm text-muted-foreground mb-6">
          We&apos;ve sent a verification link to your email. Once verified, click below.
        </p>

        <div className="flex flex-col gap-4">
          <Button onClick={checkVerification} className="bg-blue-600 text-white w-full">
            I&apos;ve Verified My Email
          </Button>

          <Button className="bg-gray-100 hover:bg-gray-200 text-black" onClick={handleResend}>
            Resend Verification Link
          </Button>

          <div className="text-center">
            I used the wrong email — <span className="hover:underline cursor-pointer" onClick={handleWrongEmail}>Sign up again</span>
          </div>
        </div>

        {status && (
          <div
            className={`mt-6 rounded-lg px-4 py-3 text-sm text-center border ${
              status.type === "error"
                ? "bg-red-50 text-red-600 border-red-400"
                : "bg-green-50 text-green-600 border-green-400"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
