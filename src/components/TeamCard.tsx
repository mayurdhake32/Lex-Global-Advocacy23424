import React from 'react';
import { TeamMember } from '../types';
import { Mail, ArrowRight, Award, MapPin } from 'lucide-react';

interface TeamCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  onRequestConsultation?: (member: TeamMember) => void;
  featuredMode?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  onSelect,
  onRequestConsultation,
  featuredMode = false,
}) => {
  return (
    <article
      onClick={() => onSelect(member)}
      className="group relative bg-[#FFFFFF] border border-[#B99A5B]/25 hover:border-[#B99A5B] transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_2px_8px_rgba(16,28,44,0.04)] hover:shadow-[0_8px_24px_rgba(16,28,44,0.08)]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(member);
        }
      }}
      aria-label={`View full profile of ${member.name}, ${member.designation}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#101C2C]/5 overflow-hidden">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.altText || `Portrait of ${member.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#101C2C] text-[#F7F4ED]">
            <Award className="w-12 h-12 text-[#B99A5B]/40" />
          </div>
        )}

        {/* Subtle top subtle marker if featured */}
        {member.isFeatured && (
          <div className="absolute top-3 left-3 bg-[#101C2C]/90 text-[#B99A5B] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#B99A5B]/40 backdrop-blur-sm">
            Featured Counsel
          </div>
        )}

        {/* Experience badge */}
        <div className="absolute bottom-3 right-3 bg-[#101C2C]/85 text-[#F7F4ED] text-[11px] px-2 py-0.5 border border-[#B99A5B]/30 tabular-nums">
          {member.yearsOfExperience}+ Years Practice
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Department - Clean unboxed text kicker (No Pills) */}
          <div className="text-[11px] uppercase tracking-widest text-[#B99A5B] font-semibold mb-1">
            {member.department}
          </div>

          {/* Advocate Name */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors leading-tight">
            {member.name}
          </h3>

          {/* Official Designation */}
          <p className="text-xs font-medium text-[#101C2C]/80 mt-1 pb-3 border-b border-[#B99A5B]/20">
            {member.designation}
          </p>

          {/* Verified Qualifications & Bar - Unboxed text with typographic bullet separator */}
          <div className="mt-3 text-xs text-[#101C2C]/70 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 font-medium">
              {member.qualifications.map((q, i) => (
                <React.Fragment key={i}>
                  <span>{q}</span>
                  {i < member.qualifications.length - 1 && (
                    <span className="text-[#B99A5B]" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-[11px] text-[#101C2C]/65 truncate pt-0.5">
              <span className="font-medium text-[#101C2C]/80">Bar:</span> {member.barEnrollment}
            </div>
          </div>

          {/* Short Bio Snippet */}
          <p className="text-xs text-[#101C2C]/75 line-clamp-3 mt-3 leading-relaxed">
            {member.biography}
          </p>
        </div>

        {/* Footer info & Action */}
        <div className="mt-5 pt-3 border-t border-[#B99A5B]/15 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-[#101C2C]/60 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
            <span className="truncate">{member.officeLocation}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-[#101C2C] font-semibold group-hover:text-[#B99A5B] transition-colors text-xs whitespace-nowrap">
            Profile <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
