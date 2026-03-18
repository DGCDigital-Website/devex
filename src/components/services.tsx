"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  CogIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const Services = () => {
  const [activeTab, setActiveTab] = useState("org-strengthening");

  const serviceTabs = [
    {
      id: "org-strengthening",
      label: "Organisational Strengthening",
      icon: BuildingOffice2Icon,
      active: true
    },
    {
      id: "capacity-strengthening",
      label: "Capacity Strengthening",
      icon: AcademicCapIcon,
      active: false
    },
    {
      id: "system-strengthening",
      label: "System Strengthening",
      icon: CogIcon,
      active: false
    },
    {
      id: "safety-security",
      label: "Safety & Security",
      icon: ShieldCheckIcon,
      active: false
    }
  ];

  const serviceContent = {
    "org-strengthening": {
      title: "Building Resilient Organisations",
      description: "We help NGOs, government agencies, and international development organisations strengthen their internal structures, governance frameworks, and operational processes to deliver on their mandates effectively and sustainably.",
      features: [
        "Organisational assessment and diagnostic reviews",
        "Governance and board effectiveness support",
        "Strategic planning and organisational development",
        "Change management and restructuring",
        "Performance management frameworks",
        "Institutional capacity appraisals"
      ],
      imageSrc: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Organisational development and strengthening"
    },
    "capacity-strengthening": {
      title: "Developing Human & Institutional Capacity",
      description: "Our capacity strengthening services build the skills, knowledge, and systems that individuals and institutions need to deliver high-quality programmes and sustain meaningful impact over the long term.",
      features: [
        "Training needs assessments and capacity audits",
        "Curriculum design and facilitation of training",
        "Coaching and mentorship programmes",
        "M&E capacity building and learning systems",
        "Knowledge management and documentation",
        "Community of practice facilitation"
      ],
      imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Capacity building and training"
    },
    "system-strengthening": {
      title: "Improving Systems for Programme Delivery",
      description: "We design, evaluate, and improve the systems that underpin effective programme delivery — from monitoring, evaluation and learning (MEL) systems to procurement, supply chain, and operational infrastructure.",
      features: [
        "MEL system design and review",
        "Data quality audits and management systems",
        "Baseline, mid-term, and end-line evaluations",
        "Programme reviews and impact assessments",
        "Supply chain and logistics system strengthening",
        "Accountability and feedback mechanisms"
      ],
      imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Systems strengthening and evaluation"
    },
    "safety-security": {
      title: "Strengthening Safety & Security Systems",
      description: "We help humanitarian and development organisations build robust safety and security management systems to protect staff, assets, and operations in complex and high-risk environments.",
      features: [
        "Safety and security risk assessments",
        "Security management plan development",
        "Staff security training and awareness",
        "Incident reporting and response systems",
        "Security policy review and development",
        "Emergency preparedness and response planning"
      ],
      imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Safety and security management"
    }
  };

  return (
    <section id="services" className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          {/* Tab bar — horizontal scroll on mobile so it never wraps awkwardly */}
          <div
            data-service-tab
            className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                data-service-id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`snap-start flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-dgc-blue-1 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Service Content */}
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
                Development Consultancy
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                {serviceContent[activeTab as keyof typeof serviceContent].title.split(' ').map((word, index, array) => {
                  if (index === array.length - 1) {
                    return <span key={index} className="title-highlight">{word} </span>;
                  }
                  return <span key={index} className="title-thin">{word} </span>;
                })}
              </h3>

              <p className="body-text-large">
                {serviceContent[activeTab as keyof typeof serviceContent].description}
              </p>

              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-dgc-blue-1/30 text-dgc-blue-2 font-semibold hover:bg-dgc-blue-1/10 transition-colors"
                >
                  View all services
                </Link>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {serviceContent[activeTab as keyof typeof serviceContent].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-dgc-blue-1/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-dgc-blue-1"></div>
                    </div>
                    <p className="body-text">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Service Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-dgc-blue-1/20">
                <Image
                  src={serviceContent[activeTab as keyof typeof serviceContent].imageSrc}
                  alt={serviceContent[activeTab as keyof typeof serviceContent].imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
