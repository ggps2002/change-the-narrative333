"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth, provider } from "@/lib/firebase/utils";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  onIdTokenChanged,
} from "firebase/auth";

const Register = () => {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("help-seeker");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // blocks form render

  // ✅ Guard: prevent form from showing for signed in users

  const handleEmailPasswordSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email.includes("@"))
        throw new Error("Please enter a valid email address");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");

      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      router.push("/verify");
      setIsLoading(false);
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError(err.message || "Failed to register. Please try again.");
      }
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
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) return <div className="text-center p-10">Checking session...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailPasswordSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-3 w-80 sm:w-auto border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-3">
              <Label>I am here to:</Label>
              <RadioGroup
                defaultValue="help-seeker"
                value={userType}
                onValueChange={setUserType}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help-seeker" id="help-seeker" />
                  <Label htmlFor="help-seeker" className="cursor-pointer">
                    Get help and resources
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supporter" id="supporter" />
                  <Label htmlFor="supporter" className="cursor-pointer">
                    Support the mission (volunteer/donate)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-md font-bold font-sans border-2 border-black rounded-full inline-flex hover:bg-black hover:text-white transition-all ease-in duration-200 p-3"
                disabled={isLoading}
              >
                <p className="uppercase">
                  {isLoading ? "Creating..." : "Create Account"}
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
              Sign up with Google
            </Button>
            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-secondary hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
