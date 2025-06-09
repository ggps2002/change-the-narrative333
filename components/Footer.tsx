"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { db } from "@/lib/firebase/utils";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "newsletterSubscribed"), {
        email,
      });
      setEmail("");
      toast.success("You are subscribed to newletter.");
    } catch (err) {
      console.error("Error subscribing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">
                Get the latest updates from Change the Narrative 333
              </h2>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
            >
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-80 sm:w-auto border border-gray-300 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#FFF5ED]"
              />
              <button
                type="submit"
                className="text-xl font-extrabold font-sans border-2 border-white rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-200 p-3"
                disabled={loading}
              >
                <p className="uppercase">{loading ? "Subscribing..." : "Subscribe"}</p>
                <ArrowRight className={`self-center ${loading && "opacity-0 hidden"}`}/>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Change the Narrative 333</h3>
            <p className="text-gray-300 mb-4">
              Centering People. Building Access. Driven by Justice.
            </p>
            <p className="text-gray-300 text-sm">
              501(c)(3) Non-Profit Organization
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-white">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Emergency Help
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-300 not-italic text-sm space-y-1">
              <p>Email: admin@changethenarrative333.org</p>
              <p>Phone: 267-453-9416</p>
              <p>Headquarters:  Philadelphia, PA</p>
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:info@changethenarrative333.org"
                aria-label="Email"
                className="hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-2 md:mb-0">
            © {currentYear} Change the Narrative 333. All rights reserved.
          </p>
          {/* <div className="flex space-x-4">
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
