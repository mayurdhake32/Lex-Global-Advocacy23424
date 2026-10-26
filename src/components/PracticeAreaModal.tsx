import React, { useEffect } from 'react';
import { PracticeArea, TeamMember } from '../types';
import { X, CheckCircle2, Shield, Calendar, Users, Scale } from 'lucide-react';

interface PracticeAreaModalProps {
  area: PracticeArea | null;
  onClose: () => void;
  onRequestConsultation: (practiceAreaTitle: string) => void;
  teamMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
}

export const PracticeAreaModal: React.FC<PracticeAreaModalProps> = ({
  area,
  onClose,
  onRequestConsultation,
  teamMembers,
  onSelectMember,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (area) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [area, onClose]);

  if (!area) return null;

  // Find assigned lead advocates
  const assignedAdvocates = teamMembers.filter((m) =>
    area.leadAdvocateNames.some((name) => m.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(m.name.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#101C2C]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="practice-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#101C2C] text-[#F7F4ED] p-6 sm:p-8 border-b border-[#B99A5B]/30 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
              Chambers Practice Area
            </div>
            <h2 id="practice-modal-title" className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#F7F4ED]">
              {area.title}
            </h2>
            <p className="text-xs text-[#B99A5B] mt-1 font-medium tracking-wide">
              {area.subtitle}
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-[#101C2C]/85 leading-relaxed">
            {area.shortDescription}
          </p>

          {/* Full Scope */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#101C2C] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#B99A5B]" />
              Scope of Representation & Advisory
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {area.fullScope.map((scopeItem, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-white border border-[#B99A5B]/25">
                  <CheckCircle2 className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#101C2C]/85 font-medium leading-relaxed">
                    {scopeItem}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tribunals & Regulators */}
          <div>
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#101C2C] mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
              Recognized Arbitral Tribunals & Supervisory Benches
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {area.regulatoryBodies.map((rb, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white border border-[#B99A5B]/30 text-[#101C2C]/80 font-medium"
                >
                  {rb}
                </span>
              ))}
            </div>
          </div>

          {/* Lead Counsel Assigned */}
          {assignedAdvocates.length > 0 && (
            <div>
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#101C2C] mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#B99A5B]" />
                Designated Lead Counsel
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assignedAdvocates.map((adv) => (
                  <div
                    key={adv.id}
                    onClick={() => {
                      onClose();
                      onSelectMember(adv);
                    }}
                    className="p-3 bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-colors flex items-center gap-3 cursor-pointer group"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#B99A5B]/20 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-[#101C2C]/65">
              Conflict searches performed prior to formal engagement acceptance.
            </span>
            <button
              onClick={() => {
                onClose();
                onRequestConsultation(area.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Retain Counsel for this Matter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
