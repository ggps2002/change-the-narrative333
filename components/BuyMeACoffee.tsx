import Link from "next/link";
import Image from "next/image";
import { BMCButton } from "@/assets";

export default function BuyMeACoffeeButton() {
  return (
    <Link
      href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL ?? "#"}
      target="_blank"
      aria-label="Buy Me a Coffee"
    >
      <Image
        src={BMCButton}
        alt="Buy Me a Coffee"
        width={200}
        height={60}
      />
    </Link>
  );
}
