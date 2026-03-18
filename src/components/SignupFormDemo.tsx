"use client";
import React, { useState, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ChatCircle, Buildings, CaretDown, Paperclip, X } from "@phosphor-icons/react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export function ContactFormDemo() {
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isCoCreate, setIsCoCreate] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: ""
  });

  const [coCreateData, setCoCreateData] = useState({
    name: "",
    email: "",
    selectedServices: [] as string[],
    message: ""
  });

  const services = [
    { value: "org-strengthening", label: "Organisational Strengthening" },
    { value: "capacity-strengthening", label: "Capacity Strengthening" },
    { value: "system-strengthening", label: "System Strengthening" },
    { value: "safety-security", label: "Safety & Security" },
    { value: "other", label: "Other" }
  ];

  const coCreateServices = [
    "Organisational Strengthening",
    "Capacity Strengthening",
    "System Strengthening",
    "Safety & Security",
    "Other"
  ];

  // File upload security configuration
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_FILES = 5;
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File ${file.name} is too large. Maximum size is 10MB.`;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please upload PDF, Word, Excel, text, or image files.`;
    }

    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js'];
    const fileName = file.name.toLowerCase();
    if (suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
      return `File ${file.name} appears to be an executable and is not allowed for security reasons.`;
    }

    return null;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const newErrors: string[] = [];

    if (uploadedFiles.length + files.length > MAX_FILES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        const fileId = Math.random().toString(36).substr(2, 9);
        newFiles.push({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        });
      }
    });

    if (newErrors.length > 0) {
      setErrorMessage(newErrors.join('\n'));
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCoCreateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!coCreateData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!coCreateData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(coCreateData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (coCreateData.selectedServices.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    if (!coCreateData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCoCreateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoCreateData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setCoCreateData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: "" }));
    }
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, service }));
    setIsDropdownOpen(false);
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");
      setErrors({});

      try {
        const response = await fetch('/api/email/contact?v=' + Date.now(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage("Thank you for your message! We'll get back to you soon.");
          setFormData({ name: "", email: "", message: "", service: "" });
          setSelectedService("");
          setUploadedFiles([]);
          setErrors({});
        } else {
          setErrorMessage(result.error || 'Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error sending form:', error);
        setErrorMessage('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCoCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCoCreateForm()) {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      try {
        const response = await fetch('/api/email/co-create?v=' + Date.now(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(coCreateData),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage("Thank you for your engagement request! We'll get back to you soon.");
          setCoCreateData({ name: "", email: "", selectedServices: [], message: "" });
          setUploadedFiles([]);
          setErrors({});
        } else {
          setErrorMessage(result.error || 'Failed to send request. Please try again.');
        }
      } catch (error) {
        console.error('Error sending co-create form:', error);
        setErrorMessage('Failed to send request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div id="contact" className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column - Contact Text */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl leading-tight">
              <span className="title-thin">Get in </span>
              <span className="title-highlight">Touch</span>
            </h2>
            <p className="body-text-large text-neutral-600 dark:text-neutral-300">
              Ready to strengthen your organisation or evaluate your programmes? Whether you need expert consultancy or want to engage DGC for a specific assignment, we&apos;re here to help you achieve your goals.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3D9DD9] to-[#177DA6] flex items-center justify-center">
                <ChatCircle className="w-6 h-6 text-white" weight="fill" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Let&apos;s Start a Conversation
                </h3>
                <p className="body-text text-neutral-600 dark:text-neutral-300 mt-1">
                  Tell us about your organisation&apos;s needs or the assignment you have in mind. We&apos;ll get back to you within 24 hours with tailored advice on how we can help.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3D9DD9] to-[#177DA6] flex items-center justify-center">
                <Buildings className="w-6 h-6 text-white" weight="fill" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Expert Consultancy Across Africa
                </h3>
                <p className="body-text text-neutral-600 dark:text-neutral-300 mt-1">
                  From organisational strengthening and capacity building to MEL systems and safety & security — DGC delivers high-quality consultancy in 22 African countries.
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                📍 The Mint Hub, Westlands, Nairobi, Kenya
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                📞 +254 752 889 900
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                📧 info@devexglobal.com
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="relative">
          <div className="shadow-input rounded-2xl bg-white p-6 md:p-8 dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300 group">
            {/* Form Toggle */}
            <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5">
              <button
                onClick={() => setIsCoCreate(false)}
                className={cn(
                  "flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300",
                  !isCoCreate
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Contact Us
              </button>
              <button
                data-form-toggle="co-create"
                onClick={() => setIsCoCreate(true)}
                className={cn(
                  "flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300",
                  isCoCreate
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Engage DGC
              </button>
            </div>

            {!isCoCreate ? (
              // Contact Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <LabelInputContainer>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "h-12 px-4 border-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#3D9DD9] focus:border-[#3D9DD9] transition-all duration-300 rounded-lg hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.name && "border-red-500 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.name}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "h-12 px-4 border-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#3D9DD9] focus:border-[#3D9DD9] transition-all duration-300 rounded-lg hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.email && "border-red-500 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.email}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="service" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Service Interest *</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={cn(
                        "w-full h-12 flex items-center justify-between px-4 text-sm border-2 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-[#3D9DD9] focus:border-[#3D9DD9] transition-all duration-300 hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                        errors.service && "border-red-500 focus:ring-red-500 focus:border-red-500"
                      )}
                    >
                      <span className={selectedService ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
                        {selectedService ? services.find(s => s.value === selectedService)?.label : "Select service"}
                      </span>
                      <CaretDown className={cn("h-5 w-5 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                        {services.map((service) => (
                          <button
                            key={service.value}
                            type="button"
                            onClick={() => handleServiceSelect(service.value)}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {service.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                        {errors.service}
                      </p>
                    )}
                  </div>
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message *</Label>
                  <textarea
                    id="message"
                    name="message"
                    className={cn(
                      "flex min-h-[140px] w-full rounded-lg border-2 bg-white dark:bg-gray-900 px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D9DD9] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300 hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.message && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.message}
                    </p>
                  )}
                </LabelInputContainer>

                <button
                  className="group/btn relative block h-14 w-full rounded-lg bg-gradient-to-br from-[#3D9DD9] to-[#177DA6] font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message →'}
                  <BottomGradient />
                </button>

                {successMessage && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                  </div>
                )}
              </form>
            ) : (
              // Co-Create / Engage DGC Form
              <form onSubmit={handleCoCreateSubmit} className="space-y-6">
                <LabelInputContainer>
                  <Label htmlFor="coCreateName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name *</Label>
                  <Input
                    id="coCreateName"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    value={coCreateData.name}
                    onChange={handleCoCreateInputChange}
                    className={cn(
                      "h-12 px-4 border-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#3D9DD9] focus:border-[#3D9DD9] transition-all duration-300 rounded-lg hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.name && "border-red-500 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.name}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="coCreateEmail" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email *</Label>
                  <Input
                    id="coCreateEmail"
                    name="email"
                    placeholder="Email address"
                    type="email"
                    value={coCreateData.email}
                    onChange={handleCoCreateInputChange}
                    className={cn(
                      "h-12 px-4 border-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#3D9DD9] focus:border-[#3D9DD9] transition-all duration-300 rounded-lg hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.email && "border-red-500 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.email}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Services required: *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                    {coCreateServices.map((service) => (
                      <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={coCreateData.selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-[#3D9DD9] focus:ring-[#3D9DD9] focus:ring-2 transition-all duration-300 hover:scale-110 transform"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300 group-hover:scale-105 transform">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.services}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="coCreateMessage" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tell us about your assignment</Label>
                  <textarea
                    id="coCreateMessage"
                    name="message"
                    placeholder="Describe the scope, objectives, and timeline of your assignment..."
                    className={cn(
                      "flex min-h-[140px] w-full rounded-lg border-2 bg-white dark:bg-gray-900 px-4 py-3 text-sm ring-offset-background placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D9DD9] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300 hover:border-[#3D9DD9]/50 hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform",
                      errors.message && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={coCreateData.message}
                    onChange={handleCoCreateInputChange}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.message}
                    </p>
                  )}
                </LabelInputContainer>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Attach files (ToR, TOR, etc.)</Label>
                    <span className="text-xs text-gray-500">Max {MAX_FILES} files, 10MB each</span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 text-[#3D9DD9] hover:text-[#177DA6] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#3D9DD9]/10 border border-dashed border-gray-300 hover:border-[#3D9DD9] w-full justify-center hover:shadow-md hover:shadow-[#3D9DD9]/20 hover:scale-[1.02] transform"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span>Choose files</span>
                  </button>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Attached files:</p>
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="flex-1">
                    By sending a message you agree with your information being stored by us in relation to dealing with your enquiry. Please have a look at our{" "}
                    <a href="#" className="underline hover:text-[#3D9DD9] transition-colors">Privacy Policy</a>.
                  </p>
                </div>

                <button
                  className="group/btn relative block h-14 w-full rounded-lg bg-gradient-to-br from-[#3D9DD9] to-[#177DA6] font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Engage DGC →'}
                  <BottomGradient />
                </button>

                {successMessage && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#3D9DD9] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#177DA6] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
