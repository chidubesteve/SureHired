import { FOOTER_LINKS } from "@/config/nav-links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#E6F2F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-4">
          {/* div for logo and slogan */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="w-[35px]"
              />
              <span className="text-xl font-bold">SureHired</span>
            </div>
            <p className="text-muted-foreground mt-2 font-medium">
              Connecting the best talent with the best opportunities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 font-medium">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
     
        </div>
      </div>
    </footer>
  );
};

export default Footer;
