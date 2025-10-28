import React from "react";
import { FooterSection } from "./sections/FooterSection";
import { MainContentSection } from "./sections/MainContentSection";
import { PricingSection } from "./sections/PricingSection";

export const Frame = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden border-2 border-solid border-[#ced4da] w-full min-w-[1440px] relative">
      <MainContentSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
};
