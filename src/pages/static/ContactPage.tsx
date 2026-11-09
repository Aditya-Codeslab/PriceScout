import React, { useState } from 'react';
import { Mail, MessageCircle, HelpCircle, MapPin, Send, CheckCircle2, Shield, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type InquiryCategory = 'price_mismatch' | 'student' | 'affiliate' | 'bug' | 'general';

export const ContactPage: React.FC = () => {
  const [category, setCategory] = useState<InquiryCategory>('price_mismatch');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setIsSubmitting(true);
    // Simulate real asynchronous submission to support backend
    setTimeout(() => {
      const ticketId = `PSC-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setMessage('');
    setProductUrl('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Support & Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14201D] font-heading">
          Contact PriceScout
        </h1>
        <p className="text-sm text-[#46544F] max-w-2xl">
          Report an out-of-sync price, enquire about student verification, or connect with our affiliate engineering team in Bengaluru.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 shadow-2xs">
          {submittedTicket ? (
            <div className="text-center py-8 space-y-4 animate-slide-up" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#14201D] font-heading">
                  Message Dispatched
                </h2>
                <p className="text-sm text-[#46544F] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#14201D]">{fullName}</span>. Our desk has received your report.
                </p>
                <div className="inline-block px-4 py-2 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs font-mono font-bold text-[#0B5D52]">
                  Ticket Ref: {submittedTicket}
                </div>
              </div>
              <p className="text-xs text-[#46544F] max-w-sm mx-auto">
                We typically respond or adjust catalog price feeds within 2 to 4 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-[44px] px-6 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#14201D] font-heading mb-1">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-[#46544F]">
                  Fill out the details below and we will triage to the correct specialist.
                </p>
              </div>

              {/* Inquiry Category Selector */}
              <div className="space-y-1.5">
                <label htmlFor="category" className="block text-xs font-semibold text-[#14201D]">
                  Topic / Department
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as InquiryCategory)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:bg-white transition-colors"
                >
                  <option value="price_mismatch">Report Price Mismatch or Expired Deal</option>
                  <option value="student">Student Verification / Institutional Email Query</option>
                  <option value="affiliate">Affiliate & Merchant Partnership</option>
                  <option value="bug">Technical Issue / Bug Report</option>
                  <option value="general">General Support & Feedback</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#14201D]">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:bg-white placeholder:text-[#46544F]/50 transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-[#14201D]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="priya@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:bg-white placeholder:text-[#46544F]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Conditional Product URL / ASIN if price mismatch is chosen */}
              {category === 'price_mismatch' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label htmlFor="productUrl" className="block text-xs font-semibold text-[#14201D]">
                    Product URL or Amazon ASIN / Flipkart FSN (Optional)
                  </label>
                  <input
                    id="productUrl"
                    type="text"
                    placeholder="e.g. https://amazon.in/dp/B09G9FPG58 or B09G9FPG58"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:bg-white placeholder:text-[#46544F]/50 transition-colors"
                  />
                </div>
              )}

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-semibold text-[#14201D]">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us what product price changed or how we can assist you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:bg-white placeholder:text-[#46544F]/50 transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] px-6 py-3 bg-[#0B5D52] hover:bg-[#178F7A] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Key Contacts & Official Addresses (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Channels */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 space-y-4 shadow-2xs">
            <h2 className="text-base font-bold text-[#14201D] font-heading">
              Dedicated Email Desks
            </h2>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6]/70 flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[#14201D]">Price Alerts & Feedback</div>
                  <a href="mailto:alerts@pricescout.in" className="text-[#0B5D52] font-medium hover:underline">
                    alerts@pricescout.in
                  </a>
                </div>
              </div>

              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6]/70 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[#14201D]">Affiliate & Commercial Inquiries</div>
                  <a href="mailto:affiliates@pricescout.in" className="text-[#0B5D52] font-medium hover:underline">
                    affiliates@pricescout.in
                  </a>
                </div>
              </div>

              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6]/70 flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[#14201D]">Institutional & Student Verification</div>
                  <a href="mailto:student@pricescout.in" className="text-[#0B5D52] font-medium hover:underline">
                    student@pricescout.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grievance Officer - Mandatory Indian DPDP & IT Rules */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B5D52] uppercase tracking-wider">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Grievance Officer (IT Rules & DPDP)</span>
            </div>
            <div className="text-xs text-[#46544F] space-y-1">
              <p className="font-semibold text-[#14201D]">Mr. Raghav Sharma</p>
              <p>Designation: Resident Grievance & Compliance Officer</p>
              <p>Email: <a href="mailto:grievance@pricescout.in" className="text-[#0B5D52] underline">grievance@pricescout.in</a></p>
              <p className="text-[11px] text-[#46544F]/80">Acknowledgment SLA: Within 24 hours · Resolution SLA: Within 15 business days</p>
            </div>
          </div>

          {/* Physical Headquarters */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 space-y-3 shadow-2xs text-xs text-[#46544F]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#14201D]">
              <MapPin className="w-4 h-4 text-[#0B5D52]" aria-hidden="true" />
              <span>Engineering Office</span>
            </div>
            <p className="leading-relaxed">
              PriceScout Technologies India<br />
              100 Feet Road, 2nd Floor, HAL 2nd Stage,<br />
              Indiranagar, Bengaluru, Karnataka 560038, India
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-[#E1DFD6] text-[11px]">
              <span>Operating Hours:</span>
              <span className="font-medium text-[#14201D]">Mon – Fri, 9:30 AM – 6:30 PM IST</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
