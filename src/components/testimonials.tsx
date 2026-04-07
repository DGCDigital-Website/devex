"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const Testimonials = () => {
  const animatedTestimonials = [
    {
      quote: "DGC's consultants brought deep contextual knowledge and methodological rigour to our programme evaluation. Their insights were instrumental in shaping our next strategic cycle.",
      name: "Country Director",
      designation: "Plan International, East Africa",
      src: "/images/clients/plan-international.jpg",
    },
    {
      quote: "The DGC team demonstrated exceptional professionalism and cultural sensitivity throughout the assignment. The final report exceeded our expectations in both quality and timeliness.",
      name: "M&E Director",
      designation: "International Rescue Committee (IRC)",
      src: "/images/clients/irc.jpg",
    },
    {
      quote: "DGC's capacity strengthening work with our national partners has had a lasting impact. Staff confidence and programme quality have measurably improved since the engagement.",
      name: "Programme Manager",
      designation: "World Food Programme (WFP)",
      src: "/images/clients/wfp.jpg",
    },
    {
      quote: "Their system strengthening support helped us build a more robust MEL framework. The tools and processes DGC developed are now embedded across all our programmes.",
      name: "Executive Director",
      designation: "LVCT Health, Kenya",
      src: "/images/clients/lvct.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Section Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-dgc-blue-1/10 border border-dgc-blue-1/20 text-dgc-blue-1 text-sm font-medium">
                Client Success Stories
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                <span className="title-thin">What Our </span>
                <span className="title-highlight">Clients Say</span>
              </h3>

              <p className="body-text-large">
                Real feedback from organisations that have transformed their programmes and systems with DGC. Our clients trust us to deliver powerful insights and proven results across Africa and beyond.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  "98% client satisfaction rate across all engagements",
                  "Responsive, contextually aware consulting teams",
                  "Deep expertise across 22 African countries",
                  "Proven track record over 30+ years in development"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-dgc-blue-1/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-dgc-blue-1"></div>
                    </div>
                    <p className="body-text">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Animated Testimonials */}
            <div className="relative">
              <AnimatedTestimonials testimonials={animatedTestimonials} autoplay={true} />
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dgc-dark-blue-1 via-dgc-dark-blue-2 to-dgc-black border border-dgc-blue-1/20">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-dgc-blue-1 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-dgc-blue-2 rounded-full blur-2xl"></div>
              </div>

              {/* Content */}
              <div className="relative px-8 py-12 lg:px-12 lg:py-16 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-dgc-blue-1/20 border border-dgc-blue-1/30 text-dgc-blue-1 text-sm font-medium mb-8"
                >
                  🌍 Ready to Engage
                </motion.div>

                {/* Heading */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  <span className="title-thin-dark">Get Started with </span>
                  <span className="title-highlight-dark">DGC</span>
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="body-text-large-dark mb-10 max-w-2xl mx-auto opacity-90"
                >
                  Ready to strengthen your organisation, build capacity, or evaluate your programmes? Contact us today to discover how Devex Global Consult can help you achieve lasting impact.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-dgc-blue-1 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
