"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { auth, provider } from "@/lib/firebase/utils";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  reload,
} from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user?.email === "admin@changethenarrative333.org") {
        router.push("/admin");
      } else if (user?.emailVerified) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await reload(userCredential.user);

      if (userCredential.user.email === "admin@changethenarrative333.org") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Please Wait...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailPasswordSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot"
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-md font-bold font-sans border-2 border-black rounded-full inline-flex hover:bg-black hover:text-white transition-all ease-in duration-200 py-3 px-6"
                disabled={isLoading}
              >
                <p className="uppercase">
                  {isLoading ? "Loging In..." : "Log In"}
                </p>
              </button>
            </div>
          </form>

          <div className="mt-8">
            <p className="text-center text-muted-foreground mb-4">
              Or continue with
            </p>
            <Button
              className="w-full mb-4 bg-gray-100 hover:bg-gray-200 text-black"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </Button>

            <p className="text-center text-sm mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-secondary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
