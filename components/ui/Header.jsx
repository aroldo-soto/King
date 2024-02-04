"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import coderhouse from "../../public/coderhouse.png";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { label: "Contact", href: "/contact" },
    { label: "About us", href: "/aboutus" },
  ];

  return (
    <header className="w-full bg-gray-600">
      <div className="container m-auto py-6 flex justify-between items-center">
        <Link href={"/"}>
          <Image src={coderhouse} width={50} height={50} />
        </Link>
        <nav className="flex justify-between gap-2">
          {links.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`${
                  pathname === link.href && "font-bold"
                } text-base text-slate-100 p-3`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
