import React, { useEffect } from 'react';
import { TeamMember } from '../types';
import { X, Mail, Linkedin, Globe, MapPin, Award, BookOpen, Briefcase, CheckCircle2, Calendar } from 'lucide-react';

interface TeamProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onRequestConsultation: (member: TeamMember) => void;
  onSelectPracticeArea?: (areaTitle: string) => void;
}

export const TeamProfileModal: React.FC<TeamProfileModalProps> = ({
  member,
  onClose,
  onRequestConsultation,
  onSelectPracticeArea,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#101C2C]/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-member-name"
    >
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl flex flex-col md:flex-row z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#101C2C]/70 hover:text-[#101C2C] bg-[#F7F4ED]/80 hover:bg-[#F7F4ED] border border-[#B99A5B]/30 rounded-full transition-colors cursor-pointer"
          aria-label="Close Profile Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Portrait & Public Credentials */}
        <div className="w-full md:w-5/12 bg-[#101C2C] text-[#F7F4ED] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#B99A5B]/30">
          <div>
            {/* Portrait Image */}
            <div className="aspect-[3/4] w-full max-w-[280px] mx-auto overflow-hidden border border-[#B99A5B]/40 shadow-lg bg-[#0B1420]">
              <img
                src={member.imageUrl}
                alt={member.altText || `Portrait of ${member.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Verification Status */}
            <div className="mt-5 pt-4 border-t border-[#B99A5B]/30 flex items-center gap-2 text-xs text-[#B99A5B]">
              <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                Verified Chambers Advocate
              </span>
            </div>

            {/* Quick Facts */}
            <div className="mt-4 space-y-3 text-xs text-[#F7F4ED]/80">
              <div>
                <span className="text-[#B99A5B] block font-semibold uppercase text-[10px] tracking-wider">
                  Chambers Location
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>{member.officeLocation}</span>
                </div>
              </div>

              <div>
                <span className="text-[#B99A5B] block font-semibold uppercase text-[10px] tracking-wider">
                  Experience
                </span>
                <span className="tabular-nums font-medium text-sm text-[#F7F4ED]">
                  {member.yearsOfExperience} Years of Verified Practice
                </span>
              </div>

              <div>
                <span className="text-[#B99A5B] block font-semibold uppercase text-[10px] tracking-wider">
                  Languages Spoken
                </span>
                <span>{member.languages.join(' · ')}</span>
              </div>

              <div>
                <span className="text-[#B99A5B] block font-semibold uppercase text-[10px] tracking-wider">
                  Public Contact
                </span>
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-[#B99A5B] transition-colors flex items-center gap-1.5 mt-0.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                  <span className="truncate">{member.email}</span>
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#B99A5B] transition-colors flex items-center gap-1.5 mt-1.5 text-[11px] text-[#B99A5B]"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#B99A5B]" />
                    <span>Verified LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Consultation CTA in Sidebar */}
          <div className="mt-8 pt-4 border-t border-[#B99A5B]/30">
            <button
              onClick={() => {
                onClose();
                onRequestConsultation(member);
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] transition-colors rounded shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Retain / Book Counsel
            </button>
          </div>
        </div>

        {/* Right Column: Full Editorial Biography & Legal Credentials */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B99A5B] font-semibold">
              {member.department} · {member.role}
            </div>
            <h2
              id="modal-member-name"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#101C2C] mt-1"
            >
              {member.name}
            </h2>
            <div className="text-sm font-medium text-[#101C2C]/80 mt-1">
              {member.designation}
            </div>
          </div>

          {/* Bar Admission & Academic Qualifications */}
          <div className="bg-[#FFFFFF] p-4 border border-[#B99A5B]/30 space-y-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                Bar Admission & Regulatory Enrollment
              </div>
              <div className="text-xs font-medium text-[#101C2C] mt-0.5">
                {member.barEnrollment}
              </div>
            </div>

            <div className="pt-2 border-t border-[#B99A5B]/15">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                Academic Qualifications & Honours
              </div>
              <div className="text-xs text-[#101C2C]/80 mt-0.5">
                {member.qualifications.join(' · ')}
              </div>
            </div>
          </div>

          {/* Professional Biography */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#101C2C]">
              Professional Biography
            </h3>
            <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed whitespace-pre-line">
              {member.biography}
            </p>
          </div>

          {/* Practice Areas */}
          <div className="space-y-2">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#101C2C] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#B99A5B]" />
              Assigned Practice Jurisdictions
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {member.practiceAreas.map((area, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onSelectPracticeArea) {
                      onClose();
                      onSelectPracticeArea(area);
                    }
                  }}
                  className="px-2.5 py-1 bg-white border border-[#B99A5B]/40 text-[#101C2C] hover:border-[#B99A5B] hover:text-[#B99A5B] transition-colors rounded text-left cursor-pointer"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Notable Cases / Experience */}
          {member.notableCases && member.notableCases.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#101C2C] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B99A5B]" />
                Representative Matters & Precedents
              </h3>
              <ul className="space-y-1.5 text-xs text-[#101C2C]/80 list-disc list-inside">
                {member.notableCases.map((c, idx) => (
                  <li key={idx} className="leading-snug">
                    <span className="font-serif italic">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Milestones & Appointments */}
          {member.milestones && member.milestones.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#101C2C]">
                Institutional Appointments & Milestones
              </h3>
              <ul className="space-y-1 text-xs text-[#101C2C]/75">
                {member.milestones.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B99A5B] font-bold">·</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Publications */}
          {member.publications && member.publications.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#101C2C] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B99A5B]" />
                Treatises & Doctrinal Publications
              </h3>
              <ul className="space-y-1 text-xs text-[#101C2C]/75">
                {member.publications.map((pub, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B99A5B] font-bold">·</span>
                    <span className="italic">{pub}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
