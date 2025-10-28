import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const PricingSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[linear-gradient(135deg,rgba(99,102,241,1)_0%,rgba(139,92,246,1)_100%)] py-20">
      <div className="container mx-auto px-6 max-w-[896px]">
        <div className="flex flex-col items-center gap-8">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl text-center tracking-[0] leading-10">
            Ready to Transform Your Grading Process?
          </h2>

          <p className="max-w-[672px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffe6] text-xl text-center tracking-[0] leading-7">
            Join thousands of educators who have revolutionized their grading
            workflow with EduGrade AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/signin')}
              className="h-14 px-8 bg-white text-indigo-500 hover:bg-white/90 rounded-xl [font-family:'Inter',Helvetica] font-normal text-base"
            >
              Start Free Trial
            </Button>

            <Button
              variant="outline"
              className="h-14 px-8 bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-xl [font-family:'Inter',Helvetica] font-normal text-base"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
