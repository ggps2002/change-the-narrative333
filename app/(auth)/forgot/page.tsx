'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type StatusType = 'error' | 'success';
interface Status {
  type: StatusType;
  message: string;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status | null>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async () => {
    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email, {
        url : process.env.NEXT_PUBLIC_URL + "/login",
         handleCodeInApp: true
      });
      setStatus({ type: 'success', message: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: 'Failed to send reset email. Please check the email or try again later.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">Forgot Password</h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Enter your email below. We&apos;ll send you a link to reset your password.
        </p>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={handleReset} className="w-full bg-blue-600 text-white">
            Send Reset Email
          </Button>
        </div>

        {status && (
          <div
            className={`mt-6 rounded-lg px-4 py-3 text-sm text-center border ${
              status.type === 'error'
                ? 'bg-red-50 text-red-600 border-red-400'
                : 'bg-green-50 text-green-600 border-green-400'
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
