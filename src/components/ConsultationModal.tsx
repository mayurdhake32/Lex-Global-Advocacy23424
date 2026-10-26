import React, { useState, useEffect } from 'react';
import { TeamMember, PracticeArea } from '../types';
import { storageService } from '../services/storageService';
import { X, Calendar, Clock, Video, Building2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAdvocate?: TeamMember | null;
  initialPracticeArea?: string | null;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialAdvocate,
  initialPracticeArea,
  practiceAreas,
  teamMembers,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>('');
  const [selectedAdvocateId, setSelectedAdvocateId] = useState<string>('');
  const [consultationType, setConsultationType] = useState<
    'In-Person Chambers' | 'Encrypted Video Conference' | 'Written Legal Advisory'
  >('In-Person Chambers');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('10:00 AM (GMT / BST)');
  
  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [caseBrief, setCaseBrief] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  // Status & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceCode, setReferenceCode] = useState<string>('');

  useEffect(() => {
    if (initialAdvocate) {
      setSelectedAdvocateId(initialAdvocate.id);
      if (initialAdvocate.practiceAreas.length > 0) {
        setSelectedPracticeArea(initialAdvocate.practiceAreas[0]);
      }
    } else if (initialPracticeArea) {
      setSelectedPracticeArea(initialPracticeArea);
    } else if (practiceAreas.length > 0 && !selectedPracticeArea) {
      setSelectedPracticeArea(practiceAreas[0].title);
    }

    // Set default date to 3 days from now
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateStr = d.toISOString().split('T')[0];
    setPreferredDate(dateStr);
  }, [initialAdvocate, initialPracticeArea, practiceAreas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Full client name is required.';
    if (!clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errs.clientEmail = 'A valid commercial or personal email is required.';
    }
    if (!clientPhone.trim()) errs.clientPhone = 'Contact telephone is required.';
    if (!caseBrief.trim() || caseBrief.trim().length < 15) {
      errs.caseBrief = 'Please provide at least 15 characters describing the legal matter.';
    }
    if (!preferredDate) errs.preferredDate = 'Please select a preferred date.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const chosenAdvocate = teamMembers.find((m) => m.id === selectedAdvocateId);

    const booking = storageService.saveConsultation({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      clientOrganization: clientOrganization.trim() || undefined,
      practiceAreaId: selectedPracticeArea,
      practiceAreaTitle: selectedPracticeArea,
      advocateId: selectedAdvocateId || undefined,
      advocateName: chosenAdvocate ? chosenAdvocate.name : 'First Available Specialist Counsel',
      consultationType,
      preferredDate,
      preferredTimeSlot,
      caseBrief: caseBrief.trim(),
      isUrgent,
    });

    setReferenceCode(booking.referenceCode);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setCaseBrief('');
    setReferenceCode('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#101C2C]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#101C2C] text-[#F7F4ED] p-6 border-b border-[#B99A5B]/30 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
              Privileged & Confidential Engagement
            </div>
            <h2 id="consultation-modal-title" className="font-serif text-2xl font-bold mt-1 text-[#F7F4ED]">
              Schedule Legal Consultation
            </h2>
            <p className="text-xs text-[#F7F4ED]/70 mt-1">
              Connect with Senior Advocates and International Chambers Counsel.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F7F4ED]/70 hover:text-[#F7F4ED] hover:bg-[#B99A5B]/20 rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              {/* Practice Area Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1.5">
                  1. Practice Jurisdictions
                </label>
                <select
                  value={selectedPracticeArea}
                  onChange={(e) => setSelectedPracticeArea(e.target.value)}
                  className="w-full bg-white border border-[#B99A5B]/40 p-2.5 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                >
                  {practiceAreas.map((pa) => (
                    <option key={pa.id} value={pa.title}>
                      {pa.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Counsel */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1.5">
                  2. Preferred Counsel or Advocate (Optional)
                </label>
                <select
                  value={selectedAdvocateId}
                  onChange={(e) => setSelectedAdvocateId(e.target.value)}
                  className="w-full bg-white border border-[#B99A5B]/40 p-2.5 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                >
                  <option value="">Any Available Senior Specialist Counsel</option>
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.designation} ({m.officeLocation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Format */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-2">
                  3. Advisory Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'In-Person Chambers',
                      title: 'In-Person Chambers',
                      desc: 'London, Geneva, or Singapore',
                      icon: Building2,
                    },
                    {
                      id: 'Encrypted Video Conference',
                      title: 'Secure Video',
                      desc: 'End-to-end encrypted session',
                      icon: Video,
                    },
                    {
                      id: 'Written Legal Advisory',
                      title: 'Written Opinion',
                      desc: 'Formal doctrinal memorandum',
                      icon: FileText,
                    },
                  ].map((format) => {
                    const Icon = format.icon;
                    const isSelected = consultationType === format.id;
                    return (
                      <button
                        type="button"
                        key={format.id}
                        onClick={() => setConsultationType(format.id as any)}
                        className={`p-3 text-left border rounded transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#101C2C] text-[#F7F4ED] border-[#B99A5B]'
                            : 'bg-white text-[#101C2C] border-[#B99A5B]/30 hover:border-[#B99A5B]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#B99A5B]' : 'text-[#101C2C]/70'}`} />
                        <div className="text-xs font-semibold">{format.title}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#F7F4ED]/70' : 'text-[#101C2C]/60'}`}>
                          {format.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  >
                    <option value="10:00 AM (GMT / BST)">10:00 AM (GMT / BST)</option>
                    <option value="02:00 PM (GMT / BST)">02:00 PM (GMT / BST)</option>
                    <option value="04:30 PM (GMT / BST)">04:30 PM (GMT / BST)</option>
                    <option value="09:00 AM (EST / New York)">09:00 AM (EST / New York)</option>
                    <option value="03:00 PM (SGT / Singapore)">03:00 PM (SGT / Singapore)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B99A5B]/20 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded border border-[#B99A5B]/40 transition-colors cursor-pointer"
                >
                  Proceed to Client Details →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Client / Instructing Party Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Lord Alistair Thorne / General Counsel"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {errors.clientName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Company / Organization (If Applicable)
                  </label>
                  <input
                    type="text"
                    value={clientOrganization}
                    onChange={(e) => setClientOrganization(e.target.value)}
                    placeholder="e.g. North Sea Marine Logistics PLC"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Direct Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="counsel@enterprise.com"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {errors.clientEmail && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.clientEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Direct Telephone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {errors.clientPhone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.clientPhone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                  Summary of Legal Matter / Brief *
                </label>
                <textarea
                  required
                  rows={4}
                  value={caseBrief}
                  onChange={(e) => setCaseBrief(e.target.value)}
                  placeholder="Outline jurisdictional seats, counterparties, key contractual obligations, or imminent procedural deadlines..."
                  className="w-full bg-white border border-[#B99A5B]/40 p-2.5 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                />
                {errors.caseBrief && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.caseBrief}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgent-toggle"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-[#B99A5B] text-[#101C2C] focus:ring-[#B99A5B]"
                />
                <label htmlFor="urgent-toggle" className="text-xs text-[#101C2C]/80 cursor-pointer">
                  Urgent matter involving imminent court deadline or freezing order application.
                </label>
              </div>

              <div className="pt-4 border-t border-[#B99A5B]/20 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#101C2C]/70 hover:text-[#101C2C] underline cursor-pointer"
                >
                  ← Back to Selection
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded shadow transition-colors cursor-pointer"
                >
                  Submit Formal Request
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="font-serif text-2xl font-bold text-[#101C2C]">
                Consultation Request Lodged
              </div>

              <div className="bg-white p-4 border border-[#B99A5B]/30 max-w-md mx-auto text-xs space-y-2 text-[#101C2C]">
                <div>
                  <span className="text-[#B99A5B] font-semibold uppercase text-[10px] block">
                    Chambers Reference Code
                  </span>
                  <span className="text-base font-mono font-bold tracking-wider text-[#101C2C]">
                    {referenceCode}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#B99A5B]/15 text-[#101C2C]/80 leading-relaxed">
                  Your briefing has been transferred to the Senior Clerk’s desk. Formal conflict clearance will occur within 4 business hours, after which secure calendar invitations will be dispatched.
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded border border-[#B99A5B]/40 transition-colors cursor-pointer"
                >
                  Close & Return to Chambers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
