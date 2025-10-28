import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const features = [
  {
    icon: "/div-6.svg",
    title: "Computer Vision Processing",
    description:
      "Advanced OCR and image processing to accurately extract handwritten text from answer sheets with exceptional precision.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(99,102,241,0.05)_0%,rgba(99,102,241,0.1)_100%)]",
  },
  {
    icon: "/div-4.svg",
    title: "Large Language Models",
    description:
      "Intelligent evaluation using state-of-the-art LLMs to understand context, assess answers, and provide detailed feedback.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(139,92,246,0.05)_0%,rgba(139,92,246,0.1)_100%)]",
  },
  {
    icon: "/div-5.svg",
    title: "Multi-Agent System",
    description:
      "Collaborative AI agents working together to ensure comprehensive and accurate grading across different subjects.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(6,182,212,0.05)_0%,rgba(6,182,212,0.1)_100%)]",
  },
  {
    icon: "/div.svg",
    title: "Scalable Architecture",
    description:
      "Modular design that scales from small prototypes to enterprise-grade deployments handling thousands of papers.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(240,253,244,1)_0%,rgba(220,252,231,1)_100%)]",
  },
  {
    icon: "/div-3.svg",
    title: "Adaptable Deployment",
    description:
      "Flexible deployment options for hackathons, educational institutions, and production environments.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(255,247,237,1)_0%,rgba(255,237,213,1)_100%)]",
  },
  {
    icon: "/div-1.svg",
    title: "Analytics & Insights",
    description:
      "Comprehensive analytics and performance insights to track grading accuracy and student progress.",
    gradient:
      "bg-[linear-gradient(135deg,rgba(250,245,255,1)_0%,rgba(243,232,255,1)_100%)]",
  },
];

const steps = [
  {
    number: "1",
    title: "Upload Answer Sheets",
    description:
      "Simply upload scanned or photographed handwritten answer sheets to the platform.",
    bgColor: "bg-indigo-500",
  },
  {
    number: "2",
    title: "AI Processing",
    description:
      "Computer vision extracts text while AI agents analyze and understand the content.",
    bgColor: "bg-violet-500",
  },
  {
    number: "3",
    title: "Intelligent Grading",
    description:
      "LLMs evaluate answers against rubrics and provide detailed scoring and feedback.",
    bgColor: "bg-cyan-500",
  },
  {
    number: "4",
    title: "Results & Analytics",
    description:
      "Get comprehensive results with analytics and insights for continuous improvement.",
    bgColor: "bg-green-500",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individual educators",
    price: "$29",
    period: "/month",
    features: ["Up to 500 sheets/month", "Basic analytics", "Email support"],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    bgColor: "bg-gray-50",
    textColor: "text-slate-800",
    buttonClass: "bg-gray-800 text-white hover:bg-gray-700",
  },
  {
    name: "Professional",
    description: "For schools and departments",
    price: "$99",
    period: "/month",
    features: [
      "Up to 5,000 sheets/month",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    bgColor:
      "bg-[linear-gradient(180deg,rgba(112,80,255,1)_0%,rgba(189,132,204,1)_100%)]",
    textColor: "text-white",
    buttonClass: "bg-white text-[#7554fc] hover:bg-gray-100",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large institutions",
    price: "Custom",
    period: "",
    features: [
      "Unlimited sheets",
      "Custom integrations",
      "Dedicated support",
      "On-premise deployment",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "default" as const,
    bgColor: "bg-gray-50",
    textColor: "text-slate-800",
    buttonClass: "bg-gray-800 text-white hover:bg-gray-700",
  },
];

const dashboardItems = [
  {
    name: "Math_Exam_Sheet_001.jpg",
    score: "95/100",
    scoreColor: "text-green-600",
  },
  {
    name: "Physics_Quiz_Sheet_002.jpg",
    score: "Processing...",
    scoreColor: "text-blue-600",
  },
  {
    name: "Chemistry_Test_Sheet_003.jpg",
    score: "87/100",
    scoreColor: "text-orange-600",
  },
];

const statBadges = [
  { icon: "/i.svg", text: "99.2% Accuracy" },
  { icon: "/i.svg", text: "10x Faster" },
  { icon: "/i.svg", text: "Scalable" },
];

const navLinks = [
  { text: "Features", href: "#" },
  { text: "How It Works", href: "#" },
  { text: "Architecture", href: "#" },
  { text: "Pricing", href: "#" },
];

export const MainContentSection = (): JSX.Element => {
  return (
    <div className="relative w-full bg-slate-50">
      <header className="w-full bg-white border-b border-gray-100 shadow-[0px_1px_2px_#0000000d]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between h-[76px]">
            <div className="flex items-center gap-3">
              <img className="w-10 h-10" alt="Logo" src="/div-2.svg" />
              <div className="flex flex-col">
                <div className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl leading-7 whitespace-nowrap">
                  EduGrade AI
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs leading-4 whitespace-nowrap">
                  Intelligent Grading System
                </div>
              </div>
            </div>

            <nav className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base leading-6"
                >
                  {link.text}
                </a>
              ))}
              <Button className="bg-indigo-500 text-white hover:bg-indigo-600 h-10 px-6 rounded-lg">
                Get Started
              </Button>
            </nav>

            <a
              href="#"
              className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base text-center leading-6"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>

      <main className="w-full">
        <section className="bg-[linear-gradient(135deg,rgba(99,102,241,0.05)_0%,rgba(139,92,246,0.05)_50%,rgba(6,182,212,0.05)_100%)]">
          <div className="max-w-[1280px] mx-auto px-6 py-[136px]">
            <div className="flex gap-[72px] items-start">
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Badge className="w-fit flex items-center gap-2 bg-[#6366f11a] text-indigo-500 hover:bg-[#6366f11a] h-9 px-4 rounded-full border-0">
                    <img className="w-3.5 h-5" alt="Icon" src="/i-16.svg" />
                    <span className="[font-family:'Inter',Helvetica] font-medium text-sm">
                      AI-Powered Grading Revolution
                    </span>
                  </Badge>

                  <h1 className="[font-family:'Inter',Helvetica] font-normal text-5xl leading-[60px]">
                    <span className="font-bold text-slate-800">
                      Automate Answer
                    </span>
                    <span className="font-bold text-indigo-500">
                      {" "}
                      Handwritten
                    </span>
                    <span className="font-bold text-slate-800">
                      {" "}
                      Sheet Grading
                    </span>
                  </h1>

                  <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl leading-[33px]">
                    Multi-agentic AI system that combines computer vision and
                    large language models to intelligently evaluate handwritten
                    answers with unprecedented accuracy and speed.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-indigo-500 text-white hover:bg-indigo-600 h-14 px-8 rounded-xl">
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    className="h-[58px] px-8 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Watch Demo
                  </Button>
                </div>

                <div className="flex gap-8">
                  {statBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img
                        className="w-[12.25px] h-5"
                        alt="Icon"
                        src={badge.icon}
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-sm leading-5 whitespace-nowrap">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative">
                <Card className="bg-white rounded-2xl border-gray-100 shadow-[0px_25px_50px_#00000040]">
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <h3 className="[font-family:'Inter',Helvetica] font-normal text-slate-800 text-base leading-6">
                          Grading Dashboard
                        </h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full opacity-60" />
                      </div>

                      <div className="flex flex-col gap-4">
                        {dashboardItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                className="w-3 h-6"
                                alt="File icon"
                                src="/i-5.svg"
                              />
                              <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm leading-5">
                                {item.name}
                              </span>
                            </div>
                            <span
                              className={`[font-family:'Inter',Helvetica] font-medium text-sm ${item.scoreColor}`}
                            >
                              {item.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="absolute -top-4 right-20 w-24 h-24 rounded-full bg-[linear-gradient(135deg,rgba(139,92,246,1)_0%,rgba(6,182,212,1)_100%)] opacity-20" />
                <div className="absolute bottom-12 -left-4 w-16 h-16 rounded-full bg-[linear-gradient(135deg,rgba(99,102,241,1)_0%,rgba(139,92,246,1)_100%)] opacity-30" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-3 text-center">
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-4xl leading-10">
                  Powerful Features
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl leading-7">
                  Advanced AI capabilities designed to revolutionize the grading
                  process
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`${feature.gradient} rounded-2xl border-0`}
                  >
                    <CardContent className="p-8 flex flex-col gap-6">
                      <img
                        className="w-12 h-12"
                        alt="Feature icon"
                        src={feature.icon}
                      />
                      <h3 className="[font-family:'Inter',Helvetica] font-normal text-slate-800 text-xl leading-7">
                        {feature.title}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base leading-6">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,rgba(249,250,251,1)_0%,rgba(255,255,255,1)_100%)] py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-3 text-center">
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-4xl leading-10">
                  How It Works
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl leading-7">
                  Simple 4-step process powered by advanced AI technology
                </p>
              </div>

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 items-center text-center"
                  >
                    <div
                      className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-slate-800 text-xl leading-7">
                      {step.title}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base leading-6">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-3 text-center">
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-4xl leading-10">
                  Simple Pricing
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl leading-7">
                  Choose the plan that fits your needs
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`${plan.bgColor} rounded-2xl border-0 relative ${plan.popular ? "shadow-[0px_4px_4px_#00000040]" : ""}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-800 hover:bg-yellow-400 h-7 px-4 rounded-full border-0">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-sm">
                          Most Popular
                        </span>
                      </Badge>
                    )}
                    <CardContent className="p-8 flex flex-col gap-6">
                      <div className="flex flex-col">
                        <h3
                          className={`[font-family:'Inter',Helvetica] font-bold text-2xl leading-8 ${plan.popular ? "text-white" : "text-slate-800"}`}
                        >
                          {plan.name}
                        </h3>
                        <p
                          className={`[font-family:'Inter',Helvetica] font-normal text-base leading-6 ${plan.popular ? "text-blue-100" : "text-gray-600"}`}
                        >
                          {plan.description}
                        </p>
                      </div>

                      <div className="relative">
                        <span
                          className={`[font-family:'Inter',Helvetica] font-bold text-4xl ${plan.popular ? "text-white" : "text-slate-800"}`}
                        >
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span
                            className={`[font-family:'Inter',Helvetica] font-bold text-lg ml-2 ${plan.popular ? "text-blue-200" : "text-gray-600"}`}
                          >
                            {plan.period}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        {plan.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-3"
                          >
                            <img
                              className="w-3.5 h-6"
                              alt="Check icon"
                              src="/i.svg"
                            />
                            <span
                              className={`[font-family:'Inter',Helvetica] font-normal text-base leading-6 ${plan.popular ? "text-white" : "text-black"}`}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`${plan.buttonClass} h-12 rounded-lg h-auto`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
