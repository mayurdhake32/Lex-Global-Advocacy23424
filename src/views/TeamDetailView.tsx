import React from 'react';
import { TeamMember, PracticeArea } from '../types';
import {
  Shield,
  MapPin,
  Mail,
  Linkedin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface TeamDetailViewProps {
  member: TeamMember;
  allMembers: TeamMember[];
  practiceAreas: PracticeArea[];
  onBack: () => void;
  onSelectMember: (member: TeamMember) => void;
  onSelectPracticeArea: (areaTitle: string) => void;
  onRequestConsultation: (member: TeamMember) => void;
}

export const TeamDetailView: React.FC<TeamDetailViewProps> = ({
  member,
  allMembers,
  practiceAreas,
  onBack,
  onSelectMember,
  onSelectPracticeArea,
  onRequestConsultation,
}) => {
  // Related colleagues in same department or sharing practice areas
  const relatedColleagues = allMembers
    .filter((m) => m.id !== member.id && m.isPublished && !m.isArchived)
    .filter(
      (m) =>
        m.department === member.department ||
        m.practiceAreas.some((pa) => member.practiceAreas.includes(pa))
    )
    .slice(0, 3);

  return (
    <div className="pb-24 space-y-12">
      
      {/* 1. BREADCRUMB & HEADER STRIP */}
      <div className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#F7F4ED]/70" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Counsel</span>
            </button>
            <span className="text-[#B99A5B]/40">/</span>
            <span className="text-[#B99A5B] font-medium">{member.name}</span>
          </nav>

          {/* Advocate Title Lockup */}
          <div className="pt-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>{member.department} · {member.role}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F4ED] mt-2 leading-tight">
              {member.name}
            </h1>
            <p className="text-sm sm:text-base text-[#F7F4ED]/80 mt-1 font-medium">
              {member.designation}
            </p>
          </div>

        </div>
      </div>

      {/* 2. EDITORIAL 2-COLUMN PROFILE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait, Credentials & Contact Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Portrait Card */}
            <div className="bg-white border border-[#B99A5B]/30 shadow-sm p-4 sm:p-5 space-y-4">
              <div className="aspect-[3/4] w-full overflow-hidden border border-[#B99A5B]/30 bg-[#0B1420]">
                <img
                  src={member.imageUrl}
                  alt={member.altText || `Portrait of ${member.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Verified Badge */}
              <div className="pt-2 border-t border-[#B99A5B]/20 flex items-center gap-2 text-xs text-[#B99A5B]">
                <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Verified Chambers Advocate
                </span>
              </div>

              {/* Metadata List - Clean unboxed text */}
              <div className="space-y-3 pt-2 text-xs text-[#101C2C]/80">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider block">
                    Chambers Location
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                    <span>{member.officeLocation}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider block">
                    Years in Courtroom & Arbitral Practice
                  </span>
                  <span className="font-mono text-sm font-bold text-[#101C2C]">
                    {member.yearsOfExperience} Years of Verified Practice
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider block">
                    Languages Spoken
                  </span>
                  <span>{member.languages.join(' · ')}</span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider block">
                    Public Contact
                  </span>
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-[#B99A5B] transition-colors flex items-center gap-1.5 mt-0.5 text-xs text-[#101C2C] truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#B99A5B] transition-colors flex items-center gap-1.5 mt-1.5 text-xs text-[#B99A5B]"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#B99A5B]" />
                      <span>Verified LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                  )}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-4 border-t border-[#B99A5B]/30">
                <button
                  onClick={() => onRequestConsultation(member)}
                  className="w-full py-3 px-4 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Retain / Book Counsel</span>
                </button>
                <div className="text-[10px] text-center text-[#101C2C]/60 mt-2">
                  Conflict search performed prior to formal engagement acceptance.
                </div>
              </div>

            </div>

            {/* Quick chambers clerk card */}
            <div className="bg-[#101C2C] text-[#F7F4ED] p-5 border border-[#B99A5B]/40 space-y-2">
              <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider">
                Senior Clerk's Desk
              </div>
              <p className="text-xs text-[#F7F4ED]/80 leading-relaxed">
                For urgent briefing instructions or court deadlines regarding {member.name}:
              </p>
              <div className="pt-2 text-xs text-[#F7F4ED] font-mono">
                clerk@lexglobaladvocacy.com
              </div>
            </div>

          </aside>

          {/* Right Column: In-depth Biography, Qualifications, Precedents (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Bar Admission & Academic Credentials */}
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#101C2C] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B99A5B]" />
                <span>Verified Admissions & Academic Credentials</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                    Statutory Bar Admission
                  </div>
                  <div className="text-xs font-semibold text-[#101C2C] leading-snug">
                    {member.barEnrollment}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                    Academic Degrees & Honours
                  </div>
                  <div className="text-xs font-medium text-[#101C2C]/80 leading-snug">
                    {member.qualifications.join(' · ')}
                  </div>
                </div>
              </div>
            </section>

            {/* Full Professional Biography */}
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#101C2C]">
                Professional Biography & Advocacy Approach
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed font-sans whitespace-pre-line">
                {member.biography}
              </div>
            </section>

            {/* Assigned Practice Jurisdictions */}
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#101C2C] uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#B99A5B]" />
                <span>Assigned Practice Areas & Advisory Focus</span>
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {member.practiceAreas.map((pa, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectPracticeArea(pa)}
                    className="px-3.5 py-1.5 bg-[#F7F4ED] hover:bg-[#B99A5B]/20 border border-[#B99A5B]/40 text-[#101C2C] text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{pa}</span>
                    <ArrowRight className="w-3 h-3 text-[#B99A5B]" />
                  </button>
                ))}
              </div>
            </section>

            {/* Notable Cases & Precedents */}
            {member.notableCases && member.notableCases.length > 0 && (
              <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-[#101C2C] uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#B99A5B]" />
                  <span>Representative Matters & Judicial Precedents</span>
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-[#101C2C]/85">
                  {member.notableCases.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-[#F7F4ED] border border-[#B99A5B]/20">
                      <span className="text-[#B99A5B] font-bold font-mono text-sm mt-0.5">
                        §
                      </span>
                      <span className="font-serif italic leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Institutional Appointments & Milestones */}
            {member.milestones && member.milestones.length > 0 && (
              <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-[#101C2C] uppercase tracking-wider">
                  Institutional Appointments & Milestones
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-[#101C2C]/80">
                  {member.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#B99A5B] font-bold mt-0.5">·</span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Treatises & Publications */}
            {member.publications && member.publications.length > 0 && (
              <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-[#101C2C] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#B99A5B]" />
                  <span>Published Treatises & Journal Papers</span>
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-[#101C2C]/80">
                  {member.publications.map((pub, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#B99A5B] font-bold mt-0.5">·</span>
                      <span className="italic leading-relaxed">{pub}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Colleagues in Chambers */}
            {relatedColleagues.length > 0 && (
              <section className="pt-6 border-t border-[#B99A5B]/25 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                  Related Chambers Counsel & Colleagues
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedColleagues.map((colleague) => (
                    <div
                      key={colleague.id}
                      onClick={() => onSelectMember(colleague)}
                      className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] p-4 flex items-center gap-3 cursor-pointer transition-colors group shadow-sm"
                    >
                      <img
                        src={colleague.imageUrl}
                        alt={colleague.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                      />
                      <div className="truncate text-xs">
                        <div className="font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors truncate">
                          {colleague.name}
                        </div>
                        <div className="text-[10px] text-[#101C2C]/65 truncate">
                          {colleague.designation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>

        </div>
      </div>

    </div>
  );
};
