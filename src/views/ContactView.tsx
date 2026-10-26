import React, { useState } from 'react';
import { PracticeArea, TeamMember } from '../types';
import { storageService } from '../services/storageService';
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle2, Building2 } from 'lucide-react';

interface ContactViewProps {
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
}

export const ContactView: React.FC<ContactViewProps> = ({
  practiceAreas,
  teamMembers,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientOrg, setClientOrg] = useState('');
  const [practiceArea, setPracticeArea] = useState(practiceAreas[0]?.title || 'International Arbitration & Dispute Resolution');
  const [advocateId, setAdvocateId] = useState('');
  const [consultationType, setConsultationType] = useState<'In-Person Chambers' | 'Encrypted Video Conference' | 'Written Legal Advisory'>('In-Person Chambers');
  const [caseBrief, setCaseBrief] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Instructing client name is required.';
    if (!clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errs.clientEmail = 'Valid business email is required.';
    }
    if (!clientPhone.trim()) errs.clientPhone = 'Direct phone number is required.';
    if (!caseBrief.trim() || caseBrief.trim().length < 20) {
      errs.caseBrief = 'Please provide at least 20 characters summarizing the dispute or transaction.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chosenAdvocate = teamMembers.find((m) => m.id === advocateId);
    const booking = storageService.saveConsultation({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      clientOrganization: clientOrg.trim() || undefined,
      practiceAreaId: practiceArea,
      practiceAreaTitle: practiceArea,
      advocateId: advocateId || undefined,
      advocateName: chosenAdvocate ? chosenAdvocate.name : 'First Available Specialist Counsel',
      consultationType,
      preferredDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      preferredTimeSlot: '10:00 AM (GMT / BST)',
      caseBrief: caseBrief.trim(),
      isUrgent,
    });

    setSubmittedRef(booking.referenceCode);
  };

  return (
    <div className="pb-24 space-y-16">
      
      {/* 1. HERO */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Chambers Registry & Senior Clerk Inquiries</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12] max-w-3xl">
            Instructing Chambers & Consultation Bookings
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
            Formal inquiries, retainer instructions, and emergency injunction applications are received through the Senior Clerk’s registry under strict commercial and litigation confidentiality.
          </p>
        </div>
      </section>

      {/* 2. MAIN FORM & CHAMBERS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Chambers Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                Physical Seats
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#101C2C] mt-1">
                Chambers Directory
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  city: 'London Chambers (Temple)',
                  address: '12 King’s Bench Walk, Temple, London EC4Y 7DX, United Kingdom',
                  phone: '+44 20 7946 0912',
                  email: 'london.clerk@lexglobaladvocacy.com',
                },
                {
                  city: 'Geneva Chambers',
                  address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
                  phone: '+41 22 518 8420',
                  email: 'geneva.clerk@lexglobaladvocacy.com',
                },
                {
                  city: 'Singapore Chambers',
                  address: 'Marina Bay Financial Centre, Tower 2, Singapore 018983',
                  phone: '+65 6720 1840',
                  email: 'singapore.clerk@lexglobaladvocacy.com',
                },
              ].map((loc, i) => (
                <div key={i} className="p-5 bg-white border border-[#B99A5B]/30 space-y-2">
                  <h3 className="font-serif text-base font-bold text-[#101C2C] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#B99A5B]" />
                    {loc.city}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-[#101C2C]/75">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A5B] shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#101C2C]/75">
                    <Phone className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#101C2C]/75">
                    <Mail className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                    <span className="font-mono text-[11px]">{loc.email}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#101C2C] text-[#F7F4ED] border border-[#B99A5B]/40 text-xs space-y-1">
              <div className="font-bold text-[#B99A5B] uppercase text-[10px] tracking-wider">
                Emergency Injunction Protocol
              </div>
              <p className="text-[#F7F4ED]/80 leading-relaxed">
                For urgent freezing orders (Mareva) or maritime vessel arrests outside business hours, mark your submission as "Urgent Proceeding" or contact the on-duty duty clerk.
              </p>
            </div>
          </div>

          {/* Right Column: Formal Consultation Request Form */}
          <div className="lg:col-span-7 bg-white border border-[#B99A5B]/30 p-6 sm:p-10 shadow-sm">
            {submittedRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#101C2C]">
                  Consultation Brief Lodged
                </div>
                <div className="bg-[#F7F4ED] p-4 border border-[#B99A5B]/30 max-w-md mx-auto text-xs space-y-2 text-[#101C2C]">
                  <div>
                    <span className="text-[#B99A5B] font-semibold uppercase text-[10px] block">
                      Registry Reference Code
                    </span>
                    <span className="text-base font-mono font-bold tracking-wider text-[#101C2C]">
                      {submittedRef}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#B99A5B]/15 text-[#101C2C]/80 leading-relaxed">
                    Your preliminary instructions have been submitted to the Senior Clerk’s desk. Formal conflict clearance will proceed within 4 business hours.
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setClientName('');
                    setCaseBrief('');
                  }}
                  className="px-6 py-2 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                    Confidential Instruction
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                    Formal Consultation Request
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Client / Instructing Solicitor *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Eleanor Vance / Senior Counsel"
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    />
                    {errors.clientName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.clientName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={clientOrg}
                      onChange={(e) => setClientOrg(e.target.value)}
                      placeholder="e.g. Maritime Logistics PLC"
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="counsel@firm.com"
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    />
                    {errors.clientEmail && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.clientEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Telephone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+44 20 7946 0912"
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    />
                    {errors.clientPhone && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.clientPhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Practice Jurisdiction *
                    </label>
                    <select
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    >
                      {practiceAreas.map((pa) => (
                        <option key={pa.id} value={pa.title}>
                          {pa.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                      Preferred Advocate (Optional)
                    </label>
                    <select
                      value={advocateId}
                      onChange={(e) => setAdvocateId(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                    >
                      <option value="">Any Senior Specialist Counsel</option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} — {m.designation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Advisory Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'In-Person Chambers',
                      'Encrypted Video Conference',
                      'Written Legal Advisory',
                    ].map((format) => (
                      <button
                        type="button"
                        key={format}
                        onClick={() => setConsultationType(format as any)}
                        className={`p-2 text-center text-xs border rounded transition-colors cursor-pointer ${
                          consultationType === format
                            ? 'bg-[#101C2C] text-[#F7F4ED] border-[#B99A5B]'
                            : 'bg-[#F7F4ED] text-[#101C2C] border-[#B99A5B]/30 hover:border-[#B99A5B]'
                        }`}
                      >
                        {format === 'In-Person Chambers' && 'In-Person'}
                        {format === 'Encrypted Video Conference' && 'Video'}
                        {format === 'Written Legal Advisory' && 'Written Opinion'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Matter Summary & Factual Background *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={caseBrief}
                    onChange={(e) => setCaseBrief(e.target.value)}
                    placeholder="Provide overview of contract dates, arbitral institutions (e.g. LCIA, ICC), opposing parties for conflict search, and urgent deadlines..."
                    className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2.5 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {errors.caseBrief && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.caseBrief}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="contact-urgent-toggle"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded border-[#B99A5B] text-[#101C2C] focus:ring-[#B99A5B]"
                  />
                  <label htmlFor="contact-urgent-toggle" className="text-xs text-[#101C2C]/80 cursor-pointer">
                    Urgent matter involving imminent court deadline or freezing order application.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded shadow transition-colors cursor-pointer"
                >
                  Submit Confidential Request to Registry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
