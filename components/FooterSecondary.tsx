import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import Link from "next/link";

const FooterSecondary = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center p-6">
      <div>
        <div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-600">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-600">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-600">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-600">
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:admin@changethenarrative333.org"
              aria-label="Email"
              className="hover:text-gray-600"
            >
              <Mail size={20} />
            </a>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col items-center gap-4">
            {/* <div className="flex space-x-4">
              <Link href="#" className=" text-gray-400 text-md">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 text-md">
                Terms of Service
              </Link>
            </div> */}
            <p className="text-gray-400 text-sm mb-2 md:mb-0">
              © {currentYear} Change the Narrative 333. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSecondary;
