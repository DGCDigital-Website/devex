'use client'

import React, { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

interface NewsletterFormData {
  name: string;
  email: string;
}

export function NewsletterSubscriptionForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Email is required' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/email/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || undefined
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you for subscribing! Check your email for confirmation.' });
        setFormData({ name: '', email: '' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="relative flex-[0.4]">
            <input
              id="newsletter-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder=" "
              className="peer w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-dgc-blue-1 transition-colors cursor-text"
            />
            <label
              htmlFor="newsletter-name"
              className="absolute left-4 top-3 text-white/60 transition-all duration-200 peer-placeholder-shown:text-white/60 peer-focus:text-dgc-blue-1 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-dgc-dark-blue-1 peer-focus:px-1"
            >
              Your Name
            </label>
          </div>
          <div className="relative flex-[0.6]">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder=" "
              className="peer w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-dgc-blue-1 transition-colors cursor-text"
            />
            <label
              htmlFor="newsletter-email"
              className="absolute left-4 top-3 text-white/60 transition-all duration-200 peer-placeholder-shown:text-white/60 peer-focus:text-dgc-blue-1 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-dgc-dark-blue-1 peer-focus:px-1"
            >
              Email
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-dgc-blue-1 text-white font-medium rounded-lg hover:bg-dgc-blue-2 transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {message && (
        <div className={`text-sm px-4 py-2 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
            : 'bg-red-500/20 text-red-300 border border-red-500/30'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
