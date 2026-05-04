import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Sparkles as SparklesComp } from "../components/ui/sparkles";
import { TimelineContent } from "../components/ui/timeline-animation";
import { VerticalCutReveal } from "../components/ui/vertical-cut-reveal";
import { cn } from "../lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import SEO from '../components/SEO';

const plans = [
  {
    name: "Basic",
    description: "Fixed-price package covering core website build, performance optimization, and basic SEO.",
    price: 1500,
    yearlyPrice: 18000,
    buttonText: "Select",
    buttonVariant: "outline",
    includes: [
      "Core website build",
      "Performance optimization",
      "Basic SEO"
    ]
  },
  {
    name: "Standard",
    description: "Extended package adding extra pages, logo & brand identity, and copywriting.",
    price: 3000,
    yearlyPrice: 36000,
    buttonText: "Select",
    buttonVariant: "default",
    popular: true,
    includes: [
      "Everything in Basic",
      "Extra pages",
      "Logo & brand identity",
      "Copywriting"
    ]
  },
  {
    name: "Growth",
    description: "Full-service package with custom features, speed & SEO audit, and priority support.",
    price: 6000,
    yearlyPrice: 72000,
    buttonText: "Select",
    buttonVariant: "outline",
    includes: [
      "Everything in Standard",
      "Speed & SEO audit",
      "Custom features",
      "Priority support"
    ]
  }
];

export default function Pricing() {
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <Layout>
      <SEO 
        title="Pricing | Kreato Space" 
        description="Transparent, value-driven pricing for premium web development and design services."
        url="https://kreatospace.com/pricing"
      />
      <div
        className="min-h-screen mx-auto relative bg-brand-bg overflow-x-hidden pt-32 pb-24"
        ref={pricingRef}
      >
        <TimelineContent
          animationNum={4}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="absolute top-0 h-[600px] w-full overflow-hidden opacity-50"
          style={{ maskImage: "radial-gradient(50% 50%, white, transparent)" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:70px_80px]"></div>
          <SparklesComp
            density={800}
            direction="bottom"
            speed={1}
            color="#FFFFFF"
            className="absolute inset-0 h-full w-full opacity-50"
            style={{ maskImage: "radial-gradient(50% 50%, white, transparent 85%)" }}
          />
        </TimelineContent>

        <article className="text-center mb-16 max-w-3xl mx-auto space-y-4 relative z-50 px-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0,
              }}
            >
              Plans that work best for you
            </VerticalCutReveal>
          </h1>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-brand-primary/60 text-lg md:text-xl font-sans max-w-2xl mx-auto"
          >
            Trusted by millions. We help teams all around the world. Explore which
            option is right for you.
          </TimelineContent>
        </article>

        <div
          className="absolute top-[20%] left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, #E60000 0%, transparent 70%)`,
            opacity: 0.15,
            mixBlendMode: "screen",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-6xl gap-8 mx-auto px-6 relative z-10">
          {plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              <Card
                className={`relative text-brand-primary h-full transition-transform duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-brand-surface border-brand-accent shadow-[0_0_80px_rgba(230,0,0,0.15)] z-20 scale-100 lg:scale-105"
                    : "bg-brand-surface border-brand-primary/20 z-10"
                }`}
              >
                <CardHeader className="text-left pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-serif font-bold">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-xs font-bold uppercase tracking-widest bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-sans font-black flex items-center">
                      $
                      <NumberFlow
                        format={{ currency: "USD" }}
                        value={plan.price}
                      />
                    </span>
                    <span className="text-brand-primary/50 ml-2 font-sans">
                      /month
                    </span>
                  </div>
                  <p className="text-sm text-brand-primary/60 font-sans">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col h-[calc(100%-180px)]">
                  <Link
                    to="/contact"
                    state={{ plan: plan.name }}
                    className={`w-full mb-8 py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all duration-300 text-center block ${
                      plan.popular
                        ? "bg-brand-accent text-white hover:bg-white hover:text-brand-accent border border-brand-accent"
                        : "bg-transparent text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-brand-bg"
                    }`}
                  >
                    {plan.buttonText}
                  </Link>

                  <div className="space-y-4 pt-6 border-t border-brand-primary/10 flex-grow">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-brand-primary/80 mb-4">
                      {plan.includes[0]}
                    </h4>
                    <ul className="space-y-4">
                      {plan.includes.slice(1).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(230,0,0,0.8)]"></span>
                          <span className="text-sm text-brand-primary/70 font-sans leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </Layout>
  );
}
