"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { logo } from "@/assets";
import ChangeTheNarrative333Logo from "@/assets/ChangeTheNarrative333Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-screen ${
        isScrolled ? "bg-[#3a3426] z-50 " : "bg-transparent"
      }`}
    >
      <div className="container-custom py-4 w-screen">
        <div className="flex items-center justify-end w-full">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ">
            <Link
              href="/"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/partners"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              Partners
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              Blog
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/donate" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white text-white hover:text-black rounded-full inline-flex gap-2 hover:gap-6 hover:bg-white transition-all ease-in duration-200 p-4">
                  <p className="self-center">DONATE</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
              <Link href="/login" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white  text-white hover:text-black rounded-full inline-flex gap-2 hover:gap-6 hover:bg-white transition-all ease-in duration-200 p-4">
                  <p className="self-center">LOGIN</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
              <Link href="/register" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white text-white hover:text-black rounded-full inline-flex gap-2 hover:gap-6 hover:bg-white transition-all ease-in duration-200 p-4">
                  <p className="self-center">GET HELP</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="relative md:hidden z-40">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} color="white" />
              ) : (
                <Menu size={24} color="white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden w-screen absolute top-0 left-0 bg-[#3A3426] px-6 py-4 space-y-4 z-30 shadow-md">
            <Link
              href="/"
              className="block text-gray-300 hover:text-white font-medium py-2 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-300 hover:text-white font-medium py-2 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/partners"
              className="block text-gray-300 hover:text-white font-medium py-2 transition-colors duration-300"
            >
              Partners
            </Link>
            <Link
              href="/blog"
              className="block text-gray-300 hover:text-white font-medium py-2 transition-colors duration-300"
            >
              Blog
            </Link>
            <div className="flex justify-center space-x-2 pt-2">
              <Link href="/donate" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white text-white rounded-full inline-flex transition-all ease-in duration-100 p-4 md:p-6">
                  <p>DONATE</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
              <Link href="/login" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white text-white rounded-full inline-flex transition-all ease-in duration-100 p-4 md:p-6">
                  <p>LOGIN</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
              <Link href="/register" className="rounded-full w-fit">
                <div className="text-sm font-extrabold font-sans border-2 border-white text-white rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-100 p-4 md:p-6">
                  <p>GET HELP</p>
                  {/* <ArrowRight className="self-center" /> */}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
