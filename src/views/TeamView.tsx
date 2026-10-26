import React, { useState, useMemo } from 'react';
import { TeamMember, Department, TeamRole, PracticeArea } from '../types';
import { TeamCard } from '../components/TeamCard';
import { filterTeamMembers, sortTeamMembers } from '../utils/filterUtils';
import { Search, Filter, Shield, Scale, MapPin, X, ArrowRight } from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface TeamViewProps {
  members: TeamMember[];
  practiceAreas: PracticeArea[];
  onSelectMember: (member: TeamMember) => void;
  onRequestConsultation: () => void;
  onNavigate: (tab: NavTab) => void;
}

const DEPARTMENTS: (Department | 'All')[] = [
  'All',
  'Dispute Resolution & Arbitration',
  'Corporate & Cross-Border M&A',
  'Maritime & Admiralty',
  'Technology, IP & Regulatory',
  'Appellate & Constitutional Advocacy',
  'Legal Research & Academics',
];

const ROLES: (TeamRole | 'All')[] = [
  'All',
  'Managing Partner',
  'Senior Advocate',
  'Associate Advocate',
  'Legal Consultant',
  'Legal Researcher',
];

export const TeamView: React.FC<TeamViewProps> = ({
  members,
  practiceAreas,
  onSelectMember,
  onRequestConsultation,
  onNavigate,
}) => {
  const [selectedDept, setSelectedDept] = useState<Department | 'All'>('All');
  const [selectedRole, setSelectedRole] = useState<TeamRole | 'All'>('All');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter and sort members
  const filteredMembers = useMemo(() => {
    const filtered = filterTeamMembers(members, {
      department: selectedDept,
      role: selectedRole,
      practiceArea: selectedArea,
      searchQuery,
      onlyPublished: true,
    });
    return sortTeamMembers(filtered);
  }, [members, selectedDept, selectedRole, selectedArea, searchQuery]);

  const hasActiveFilters =
    selectedDept !== 'All' ||
    selectedRole !== 'All' ||
    selectedArea !== 'All' ||
    searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setSelectedDept('All');
    setSelectedRole('All');
    setSelectedArea('All');
    setSearchQuery('');
  };

  return (
    <div className="pb-24 space-y-12 sm:space-y-16">
      
      {/* 1. HERO INTRODUCTION */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Advocates, Counsel & Research Fellows</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12]">
                The People Behind Your Legal Support
              </h1>
              <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
                Our advocacy team brings together King’s Counsel, senior commercial arbitrators, cross-border corporate counsel, and doctrinal scholars. We hold verified enrollments across premier common law and international courts, grounding every case in meticulous legal research and strategic clarity.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onNavigate('practice-areas')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#B99A5B]/50 text-[#F7F4ED] hover:bg-[#B99A5B]/15 transition-colors rounded text-center cursor-pointer whitespace-nowrap"
              >
                View Chambers Practice Areas →
              </button>
              <button
                onClick={onRequestConsultation}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] transition-colors rounded text-center cursor-pointer whitespace-nowrap shadow"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Standards & Transparency Bar */}
          <div className="pt-6 border-t border-[#B99A5B]/20 flex flex-wrap items-center gap-6 text-xs text-[#F7F4ED]/70">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#B99A5B]" />
              <span>Independent Bar & Inns of Court Affiliations</span>
            </div>
            <span>·</span>
            <div>Zero Unverified Titles or Exaggerated Bench Claims</div>
            <span>·</span>
            <div>Direct Principal Partner Oversight on All Proceedings</div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE FILTERS & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#B99A5B]/30 p-5 sm:p-6 shadow-sm space-y-4">
          
          {/* Top Row: Search Input & Clear Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#101C2C]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by advocate name, qualification (e.g. Oxford, Harvard), or practice..."
                className="w-full bg-[#F7F4ED] border border-[#B99A5B]/30 pl-9 pr-4 py-2 text-xs sm:text-sm text-[#101C2C] placeholder-[#101C2C]/50 focus:outline-none focus:border-[#B99A5B] rounded"
                aria-label="Search advocates"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#101C2C]/50 hover:text-[#101C2C]"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Status & Clear Button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
              <span className="text-[#101C2C]/70">
                Displaying <strong className="text-[#101C2C] font-mono">{filteredMembers.length}</strong> of{' '}
                <strong className="text-[#101C2C] font-mono">{members.filter((m) => m.isPublished && !m.isArchived).length}</strong> Verified Advocates
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#B99A5B] hover:text-[#101C2C] underline font-medium cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>

          </div>

          {/* Bottom Row: Department & Role Filter Tabs (Interactive Segmented Controls - NOT static pills) */}
          <div className="pt-3 border-t border-[#B99A5B]/20 space-y-3">
            
            {/* Department Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#101C2C]/80 shrink-0 w-28">
                Department:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#101C2C] text-[#F7F4ED] shadow-sm'
                          : 'bg-[#F7F4ED] text-[#101C2C]/80 hover:bg-[#B99A5B]/15 hover:text-[#101C2C]'
                      }`}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Role Category Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#101C2C]/80 shrink-0 w-28">
                Role:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#101C2C] text-[#F7F4ED] shadow-sm'
                          : 'bg-[#F7F4ED] text-[#101C2C]/80 hover:bg-[#B99A5B]/15 hover:text-[#101C2C]'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practice Area Dropdown filter */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#101C2C]/80 shrink-0 w-28">
                Jurisdiction:
              </span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-[#F7F4ED] border border-[#B99A5B]/30 p-1.5 text-xs text-[#101C2C] rounded focus:outline-none focus:border-[#B99A5B]"
              >
                <option value="All">All Practice Jurisdictions</option>
                {practiceAreas.map((pa) => (
                  <option key={pa.id} value={pa.title}>
                    {pa.title}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* 3. ADVOCATE ROSTER GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredMembers.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#B99A5B]/30 space-y-3">
            <Scale className="w-10 h-10 text-[#B99A5B]/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#101C2C]">
              No Advocates Found
            </h3>
            <p className="text-xs text-[#101C2C]/70 max-w-md mx-auto">
              No verified advocate records match the selected department, role, or search keywords. Please adjust or reset your filters.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-[#101C2C] text-[#F7F4ED] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onSelect={onSelectMember}
                onRequestConsultation={() => onSelectMember(member)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. ETHICAL ADMISSION & PRACTICE DISCLOSURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-[#B99A5B]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#101C2C]/75">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#B99A5B] shrink-0" />
            <p className="leading-relaxed">
              Every advocate profile listed represents an active, verified member of their respective statutory bar or regulatory law society. Chambers strictly forbids the publication of unsubstantiated credentials or fictional client matters.
            </p>
          </div>
          <button
            onClick={onRequestConsultation}
            className="px-5 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold uppercase tracking-wider text-xs rounded transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Instruct Counsel
          </button>
        </div>
      </section>

    </div>
  );
};
