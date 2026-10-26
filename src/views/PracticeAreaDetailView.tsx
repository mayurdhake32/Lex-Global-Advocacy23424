import React from 'react';
import { PracticeArea, TeamMember } from '../types';
import {
  Scale,
  Shield,
  CheckCircle2,
  Calendar,
  Users,
  ArrowLeft,
  ArrowRight,
  Building2,
} from 'lucide-react';

interface PracticeAreaDetailViewProps {
  area: PracticeArea;
  allAreas: PracticeArea[];
  teamMembers: TeamMember[];
  onBack: () => void;
  onSelectArea: (area: PracticeArea) => void;
  onSelectMember: (member: TeamMember) => void;
  onRequestConsultation: (practiceAreaTitle: string) => void;
}

export const PracticeAreaDetailView: React.FC<PracticeAreaDetailViewProps> = ({
  area,
  allAreas,
  teamMembers,
  onBack,
  onSelectArea,
  onSelectMember,
  onRequestConsultation,
}) => {
  // Assigned counsel
  const assignedAdvocates = teamMembers.filter((m) =>
    area.leadAdvocateNames.some(
      (name) =>
        m.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(m.name.toLowerCase())
    )
  );

  const otherAreas = allAreas.filter((a) => a.id !== area.id).slice(0, 3);

  return (
    <div className="pb-24 space-y-12">
      
      {/* 1. BREADCRUMB & HEADER STRIP */}
      <div className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-[#F7F4ED]/70" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Practice Areas</span>
            </button>
            <span className="text-[#B99A5B]/40">/</span>
            <span className="text-[#B99A5B] font-medium">{area.title}</span>
          </nav>

          <div className="pt-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Chambers Practice Jurisdiction</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F4ED] mt-2 leading-tight">
              {area.title}
            </h1>
            <p className="text-sm sm:text-base text-[#B99A5B] mt-1 font-medium">
              {area.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Column: Scope, Precedents & Tribunals (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                Practice Overview & Jurisprudential Focus
              </h2>
              <p className="text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed font-sans">
                {area.shortDescription}
              </p>
            </section>

            {/* Comprehensive Scope */}
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#101C2C] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
                <span>Scope of Representation & Advisory Mandates</span>
              </h2>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {area.fullScope.map((scopeItem, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#F7F4ED] border border-[#B99A5B]/25">
                    <span className="font-mono text-[#B99A5B] font-bold text-sm">
                      0{i + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-[#101C2C]/85 font-medium leading-relaxed">
                      {scopeItem}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Supervisory Benches & Arbitral Tribunals */}
            <section className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#101C2C] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#B99A5B]" />
                <span>Recognized Supervisory Benches & Institutional Tribunals</span>
              </h2>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {area.regulatoryBodies.map((rb, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#F7F4ED] border border-[#B99A5B]/40 text-[#101C2C] font-semibold text-xs rounded"
                  >
                    {rb}
                  </span>
                ))}
              </div>
            </section>

            {/* Other Practice Areas */}
            <section className="pt-6 border-t border-[#B99A5B]/25 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                Explore Adjacent Practice Corridors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherAreas.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => onSelectArea(other)}
                    className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] p-4 flex flex-col justify-between cursor-pointer transition-colors group shadow-sm"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#101C2C] group-hover:text-[#B99A5B] transition-colors">
                        {other.title}
                      </div>
                      <p className="text-[11px] text-[#101C2C]/70 line-clamp-2 mt-1">
                        {other.shortDescription}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-semibold text-[#B99A5B] flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* Sidebar: Lead Counsel & Retainer CTA (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Consultation Box */}
            <div className="bg-[#101C2C] text-[#F7F4ED] p-6 border border-[#B99A5B]/40 space-y-4 shadow-md">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
                Chambers Instruction
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F7F4ED]">
                Retain Chambers for this Practice Area
              </h3>
              <p className="text-xs text-[#F7F4ED]/80 leading-relaxed">
                Conflict searches are initiated immediately upon submission of matter briefs by instructing solicitors or corporate legal departments.
              </p>
              <button
                onClick={() => onRequestConsultation(area.title)}
                className="w-full py-3 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Consultation</span>
              </button>
            </div>

            {/* Designated Lead Advocates */}
            {assignedAdvocates.length > 0 && (
              <div className="bg-white border border-[#B99A5B]/30 p-5 space-y-4 shadow-sm">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Designated Lead Counsel</span>
                </div>

                <div className="space-y-3">
                  {assignedAdvocates.map((adv) => (
                    <div
                      key={adv.id}
                      onClick={() => onSelectMember(adv)}
                      className="p-3 bg-[#F7F4ED] border border-[#B99A5B]/25 hover:border-[#B99A5B] transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={adv.imageUrl}
                        alt={adv.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors truncate">
                          {adv.name}
                        </div>
                        <div className="text-[11px] text-[#101C2C]/70 truncate">
                          {adv.designation}
                        </div>
                        <div className="text-[10px] text-[#B99A5B] mt-0.5">
                          {adv.yearsOfExperience}+ Years Practice
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clerk Desk */}
            <div className="p-4 bg-white border border-[#B99A5B]/20 text-xs text-[#101C2C]/75 space-y-1">
              <strong className="text-[#101C2C] block">Senior Clerk Registry:</strong>
              <div>London: +44 20 7946 0912</div>
              <div>Geneva: +41 22 518 8420</div>
              <div>Singapore: +65 6720 1840</div>
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
};
