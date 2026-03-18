'use client'

import React, { useState } from 'react';
import { Modal } from './modal';

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailPreview({ isOpen, onClose }: EmailPreviewProps) {
  const [previewType, setPreviewType] = useState<'contact' | 'newsletter' | 'co-create'>('contact');
  const referenceId = "DGC-PREVIEW-0001";

  const contactFormData = {
    name: "Jane Doe",
    email: "jane@example.org",
    service: "Organisational Strengthening",
    message: "I'm interested in your organisational strengthening services. Can you provide more information about your approach and methodology?"
  };

  const newsletterData = {
    email: "jane@example.org",
    name: "Jane Doe"
  };

  const coCreateData = {
    name: "John Smith",
    email: "john@example.org",
    selectedServices: ["Capacity Strengthening", "System Strengthening"],
    message: "I'd like to discuss a capacity strengthening initiative for our regional programme. Looking forward to collaborating!"
  };

  const renderContactEmail = () => (
    <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
      <div className="bg-[#0B2D59] text-white p-8 rounded-t-lg">
        <div className="bg-[#0B2D59] p-5 rounded-lg mb-4">
          <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" className="h-10 w-auto" />
        </div>
        <p className="text-lg opacity-90">Powerful Insights | Proven Delivery</p>
        <h2 className="text-2xl font-bold mt-6 mb-2">Thank you for contacting us!</h2>
        <p className="text-lg opacity-90">We've received your message and will get back to you within 24 hours.</p>
      </div>

      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <strong className="text-gray-800">Message Details</strong>
          <span className="text-[#3D9DD9] font-semibold">Reference ID: {referenceId}</span>
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="flex">
            <span className="font-semibold w-40">Name:</span>
            <span>{contactFormData.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Email:</span>
            <span>{contactFormData.email}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Service Interest:</span>
            <span>{contactFormData.service}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Message:</span>
            <span className="flex-1">{contactFormData.message}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-b-lg text-center">
        <p className="text-gray-700 mb-4">
          Our team will review your message and get back to you within 24 hours. In the meantime, feel free to explore our services.
        </p>
        <a href="https://devexglobal.com" className="bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] text-white px-6 py-3 rounded-full font-semibold inline-block">
          Visit Our Website
        </a>
      </div>

      <div className="bg-gray-900 text-white p-6 mt-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Got questions?</h3>
        <p className="text-gray-300">
          Please contact us or visit our website.
        </p>
      </div>
    </div>
  );

  const renderNewsletterEmail = () => (
    <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
      <div className="bg-[#0B2D59] text-white p-8 rounded-t-lg">
        <div className="bg-[#0B2D59] p-5 rounded-lg mb-4">
          <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" className="h-10 w-auto" />
        </div>
        <p className="text-lg opacity-90">Powerful Insights | Proven Delivery</p>
        <h2 className="text-2xl font-bold mt-6 mb-2">Welcome to DGC!</h2>
        <p className="text-lg opacity-90">Thank you for subscribing to our newsletter.</p>
      </div>

      <div className="bg-gray-50 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Subscription Confirmed</h3>
          <p className="text-gray-700 mb-4">
            Hello {newsletterData.name || 'there'}, thank you for subscribing to our newsletter!
          </p>
          <p className="text-gray-700 mb-6">
            You'll now receive updates about our latest services, development sector insights, and consultancy resources.
          </p>
          <a href="https://www.devexglobal.com/#services" className="bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] text-white px-6 py-3 rounded-full font-semibold inline-block">
            Our Services
          </a>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 mt-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
        <p className="text-gray-300">
          For any questions, visit <a href="https://www.devexglobal.com" className="text-[#3D9DD9]">www.devexglobal.com</a>
        </p>
      </div>
    </div>
  );

  const renderCoCreateEmail = () => (
    <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
      <div className="bg-[#0B2D59] text-white p-8 rounded-t-lg">
        <div className="bg-[#0B2D59] p-5 rounded-lg mb-4">
          <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" className="h-10 w-auto" />
        </div>
        <p className="text-lg opacity-90">Powerful Insights | Proven Delivery</p>
        <h2 className="text-2xl font-bold mt-6 mb-2">Engagement Request Received</h2>
        <p className="text-lg opacity-90">We've received your request and will get back to you within 24 hours.</p>
      </div>

      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <strong className="text-gray-800">Engagement Details</strong>
          <span className="text-[#3D9DD9] font-semibold">Reference ID: {referenceId}</span>
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="flex">
            <span className="font-semibold w-40">Name:</span>
            <span>{coCreateData.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Email:</span>
            <span>{coCreateData.email}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Services:</span>
            <span>{coCreateData.selectedServices.join(', ')}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-40">Message:</span>
            <span className="flex-1">{coCreateData.message}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-b-lg text-center">
        <p className="text-gray-700 mb-4">
          Our team will review your engagement request and get back to you within 24 hours with next steps.
        </p>
        <a href="https://www.devexglobal.com/#services" className="bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] text-white px-6 py-3 rounded-full font-semibold inline-block">
          Our Services
        </a>
      </div>

      <div className="bg-gray-900 text-white p-6 mt-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Engage?</h3>
        <p className="text-gray-300">
          For any questions, visit <a href="https://www.devexglobal.com" className="text-[#3D9DD9]">www.devexglobal.com</a>
        </p>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Email Template Preview">
      <div className="space-y-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPreviewType('contact')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewType === 'contact'
                ? 'bg-dgc-blue-1 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Contact Form
          </button>
          <button
            onClick={() => setPreviewType('newsletter')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewType === 'newsletter'
                ? 'bg-dgc-blue-1 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setPreviewType('co-create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewType === 'co-create'
                ? 'bg-dgc-blue-1 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Engagement
          </button>
        </div>

        <div className="overflow-auto max-h-[70vh]">
          {previewType === 'contact' && renderContactEmail()}
          {previewType === 'newsletter' && renderNewsletterEmail()}
          {previewType === 'co-create' && renderCoCreateEmail()}
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          <p>This is a preview of the current email template design.</p>
          <p>Templates use DGC branding and are sent via Brevo.</p>
        </div>
      </div>
    </Modal>
  );
}
