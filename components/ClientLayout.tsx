"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FooterSecondary from "./FooterSecondary";
import NavbarSecondary from "./NavbarSecondary";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBlogPostPage = /^\/blog\/[^/]+$/.test(pathname);
  const isDonationSuccessPage = pathname === "/donate/success";

  // Routes where both secondary navbar and footer show
  const isSecondaryLayoutRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot");

  return (
    <div className="flex flex-col min-h-screen">
      {isBlogPostPage || isDonationSuccessPage ? (
        // Blog post pages & Donation Success: NavbarSecondary + FooterSecondary
        <div className="w-full max-h-[7rem] overflow-hidden">
          <NavbarSecondary />
        </div>
      ) : !isSecondaryLayoutRoute ? (
        // Normal pages: Navbar + Footer (primary)
        <Navbar />
      ) : (
        // Secondary routes: NavbarSecondary + FooterSecondary
        <div className="w-full max-h-[7rem] overflow-hidden">
          <NavbarSecondary />
        </div>
      )}

      {/* Main content grows to fill space */}
      <main className="flex-1">{children}</main>

      {isBlogPostPage || isDonationSuccessPage || isSecondaryLayoutRoute ? (
        // Show FooterSecondary on donation success too
        <FooterSecondary />
      ) : (
        <Footer />
      )}
    </div>
  );
}
