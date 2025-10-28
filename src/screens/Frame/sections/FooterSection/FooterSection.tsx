import React from "react";
import { Separator } from "../../../../components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "API", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-slate-800">
      <div className="max-w-[1280px] mx-auto px-20 py-16">
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8"
                  alt="EduGrade AI Logo"
                  src="/div-7.svg"
                />
                <div className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-7 whitespace-nowrap">
                  EduGrade AI
                </div>
              </div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-6">
                Revolutionizing education through intelligent grading
                automation.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                Product
              </h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.product.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                Company
              </h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.company.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                Support
              </h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.support.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col">
            <Separator className="bg-gray-700" />
            <p className="mt-8 [font-family:'Inter',Helvetica] font-normal text-gray-400 text-base text-center tracking-[0] leading-6 whitespace-nowrap">
              © 2024 EduGrade AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
