import React, { useState } from 'react';
import { PracticeArea, TeamMember } from '../types';
import { Scale, CheckCircle2, ArrowRight, Shield, Calendar, Users } from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface PracticeAreasViewProps {
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  onSelectArea: (area: PracticeArea) => void;
  onSelectMember: (member: TeamMember) => void;
  onRequestConsultation: (practiceAreaTitle?: string) => void;
  onNavigate: (tab: NavTab) => void;
}

export const PracticeAreasView: React.FC<PracticeAreasViewProps> = ({
  practiceAreas,
  teamMembers,
  onSelectArea,
  onSelectMember,
  onRequestConsultation,
  onNavigate,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredAreas = practiceAreas.filter((pa) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      pa.title.toLowerCase().includes(q) ||
      pa.shortDescription.toLowerCase().includes(q) ||
      pa.fullScope.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="pb-24 space-y-16">
      
      {/* 1. HERO */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <Scale className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Practice Jurisdictions & Trial Chambers</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12] max-w-3xl">
            Specialized Legal Practice Across Global Commercial Corridors
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
            Our chambers focus selectively on complex, multi-jurisdictional areas of substantive law where strategic courtroom advocacy, deep doctrinal precedent, and international tribunal familiarity are decisive.
          </p>
        </div>
      </section>

      {/* 2. PRACTICE AREAS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-[#B99A5B]/30">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search practice areas by keyword (e.g. Arbitration, Maritime, M&A, AI)..."
            className="w-full sm:max-w-md bg-[#F7F4ED] border border-[#B99A5B]/30 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
          />
          <div className="text-xs text-[#101C2C]/70">
            Showing <strong className="font-mono text-[#101C2C]">{filteredAreas.length}</strong> Practice Jurisdictions
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map((pa) => {
            // Find lead advocates
            const leadAdvocates = teamMembers.filter((m) =>
              pa.leadAdvocateNames.some(
                (name) =>
                  m.name.toLowerCase().includes(name.toLowerCase()) ||
                  name.toLowerCase().includes(m.name.toLowerCase())
              )
            );

            return (
              <div
                key={pa.id}
                className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(16,28,44,0.03)]"
              >
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                      Practice Area
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#101C2C] mt-1 leading-snug">
                      {pa.title}
                    </h2>
                    <div className="text-xs text-[#101C2C]/70 mt-1 font-medium">
                      {pa.subtitle}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed">
                    {pa.shortDescription}
                  </p>

                  {/* Scope bullets */}
                  <div className="space-y-1.5 pt-2 border-t border-[#B99A5B]/15">
                    <div className="text-[10px] uppercase font-semibold text-[#101C2C] tracking-wider mb-1">
                      Key Matters Handled:
                    </div>
                    {pa.fullScope.slice(0, 3).map((scope, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#101C2C]/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{scope}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lead Advocates */}
                  {leadAdvocates.length > 0 && (
                    <div className="pt-3 border-t border-[#B99A5B]/15">
                      <div className="text-[10px] uppercase font-semibold text-[#101C2C] tracking-wider mb-2 flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-[#B99A5B]" />
                        <span>Lead Advocates:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {leadAdvocates.map((adv) => (
                          <button
                            key={adv.id}
                            onClick={() => onSelectMember(adv)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F4ED] hover:bg-[#B99A5B]/20 border border-[#B99A5B]/30 rounded text-xs text-[#101C2C] transition-colors cursor-pointer"
                          >
                            <img
                              src={adv.imageUrl}
                              alt={adv.name}
                              referrerPolicy="no-referrer"
                              className="w-4 h-4 rounded-full object-cover shrink-0"
                            />
                            <span className="font-medium">{adv.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 pt-4 border-t border-[#B99A5B]/20 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectArea(pa)}
                    className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestConsultation(pa.title)}
                    className="px-3 py-1.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Retain
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#101C2C] text-[#F7F4ED] border border-[#B99A5B]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#F7F4ED]">
              Uncertain Which Practice Area Governs Your Proceeding?
            </h3>
            <p className="text-xs text-[#F7F4ED]/75">
              Submit your preliminary matter summary to our Senior Clerk for jurisdictional triage and counsel recommendation.
            </p>
          </div>
          <button
            onClick={() => onRequestConsultation()}
            className="px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded whitespace-nowrap cursor-pointer"
          >
            Request Clerk Advisory
          </button>
        </div>
      </section>

    </div>
  );
};
