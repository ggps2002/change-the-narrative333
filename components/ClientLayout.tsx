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
  const isAdminRoute = pathname.startsWith("/admin");

  const isSecondaryLayoutRoute =
    !isAdminRoute &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/verify") ||
      pathname.startsWith("/forgot"));

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && (
        <>
          {isBlogPostPage || isDonationSuccessPage ? (
            <div className="w-full max-h-[7rem] overflow-hidden">
              <NavbarSecondary />
            </div>
          ) : isSecondaryLayoutRoute ? (
            <div className="w-full max-h-[7rem] overflow-hidden">
              <NavbarSecondary />
            </div>
          ) : (
            <Navbar />
          )}
        </>
      )}

      {/* Main content grows to fill space */}
      <main className="flex-1">{children}</main>

      {isBlogPostPage ||
      isDonationSuccessPage ||
      isSecondaryLayoutRoute ||
      isAdminRoute ? (
        <FooterSecondary />
      ) : (
        <Footer />
      )}
    </div>
  );
}
