"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const AboutUs = () => {
  const features = [
    {
      icon: BuildingOffice2Icon,
      title: "Organisational Strengthening",
      description: "Building resilient organisations capable of delivering on their mandates effectively",
      color: "#3D9DD9"
    },
    {
      icon: AcademicCapIcon,
      title: "Capacity Strengthening",
      description: "Developing human and institutional capacity to sustain impact",
      color: "#177DA6"
    },
    {
      icon: CogIcon,
      title: "System Strengthening",
      description: "Designing and improving systems that support programme delivery",
      color: "#50D4F2"
    },
    {
      icon: ShieldCheckIcon,
      title: "Safety & Security",
      description: "Strengthening safety and security systems for staff and operations",
      color: "#7ED1F2"
    }
  ];

  return (
    <section id="about" className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-dgc-blue-1/10 border border-dgc-blue-1/20 text-dgc-blue-1 text-sm font-medium">
              Our Story
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              <span className="title-thin">About </span>
              <span className="title-highlight">DGC</span>
            </h2>

            {/* Description */}
            <p className="body-text-large">
              We empower NGOs, government agencies, and international development organisations to achieve their goals through{" "}
              <span className="font-semibold text-dgc-blue-1">evidence-based consultancy and proven delivery</span>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "480+", label: "Evaluations" },
                { value: "130+", label: "Consultancies" },
                { value: "30+", label: "Years Experience" },
                { value: "22", label: "African Countries" }
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50/80 border border-gray-200 rounded-xl p-4">
                  <div className="text-2xl font-bold text-dgc-blue-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="body-text">
                To deliver powerful insights and proven delivery to organisations working in international development — helping them strengthen systems, build capacity, and achieve lasting impact across Africa and beyond.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-dgc-blue-1 text-white font-semibold rounded-xl hover:bg-dgc-blue-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Read more about DGC
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-100 hover:border-dgc-blue-1/30 transition-all duration-300"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="paragraph-text">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
