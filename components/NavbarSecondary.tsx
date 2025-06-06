import React from "react";
import ChangeTheNarrative333Logo from "@/assets/ChangeTheNarrative333Logo";
import Link from "next/link";

const NavbarSecondary = () => {
  return (
    <div className="flex justify-start px-6 h-[7rem]">
      <div className="rounded-full flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center w-[7rem] h-[7rem]"
        >
          <ChangeTheNarrative333Logo />
        </Link>
      </div>
    </div>
  );
};

export default NavbarSecondary;
