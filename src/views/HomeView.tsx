import React from 'react';
import { TeamMember, PracticeArea, Course, BlogPost } from '../types';
import { TeamCard } from '../components/TeamCard';
import { NavTab } from '../components/Navbar';
import {
  Scale,
  Shield,
  Globe,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap,
} from 'lucide-react';

interface HomeViewProps {
  featuredTeam: TeamMember[];
  practiceAreas: PracticeArea[];
  courses: Course[];
  recentPosts: BlogPost[];
  onSelectMember: (member: TeamMember) => void;
  onSelectPracticeArea: (area: PracticeArea) => void;
  onSelectCourse: (course: Course) => void;
  onSelectPost: (post: BlogPost) => void;
  onRequestConsultation: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  featuredTeam,
  practiceAreas,
  courses,
  recentPosts,
  onSelectMember,
  onSelectPracticeArea,
  onSelectCourse,
  onSelectPost,
  onRequestConsultation,
  onNavigate,
}) => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#101C2C] text-[#F7F4ED] overflow-hidden pt-8 pb-16 sm:pb-24 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Proposition & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
                <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
                <span>International Chambers of Counsel & Arbitrators</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4ED] leading-[1.12]">
                Authoritative Advocacy Before Supreme Courts & Global Tribunals
              </h1>

              <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
                Lex Global Advocacy unites King’s Counsel, senior commercial arbitrators, and specialized cross-border advocates. We deliver decisive representation in high-stakes disputes, maritime casualties, cross-border M&A regulatory screens, and emerging technology governance.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onRequestConsultation}
                  className="px-6 py-3 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] transition-colors font-semibold text-xs sm:text-sm uppercase tracking-wider rounded shadow-md cursor-pointer whitespace-nowrap"
                >
                  Schedule Consultation
                </button>
                <button
                  onClick={() => onNavigate('team')}
                  className="px-6 py-3 border border-[#B99A5B]/50 text-[#F7F4ED] hover:bg-[#B99A5B]/15 transition-colors font-semibold text-xs sm:text-sm uppercase tracking-wider rounded cursor-pointer whitespace-nowrap"
                >
                  Meet Our Advocates →
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-[#B99A5B]/20 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#B99A5B] tabular-nums">
                    30+ Years
                  </div>
                  <div className="text-[11px] text-[#F7F4ED]/70">Courtroom Precedents</div>
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#B99A5B] tabular-nums">
                    4 Chambers
                  </div>
                  <div className="text-[11px] text-[#F7F4ED]/70">London · Geneva · SG · NY</div>
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#B99A5B] tabular-nums">
                    100% Verified
                  </div>
                  <div className="text-[11px] text-[#F7F4ED]/70">Bar Roll Admissions</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Architectural Chambers Photography */}
            <div className="lg:col-span-5 relative flex items-center">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] overflow-hidden border border-[#B99A5B]/40 shadow-2xl bg-[#0B1420]">
                <img
                  src="/src/assets/images/hero_lex_global_1793026042044.jpg"
                  alt="Lex Global Advocacy Chambers and Private Law Library"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-[#F7F4ED]/90 flex items-center justify-between">
                  <span className="font-serif italic">Main Chambers Library & Council, London</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B99A5B] font-mono">Est. 1994</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. INSTITUTIONAL ETHOS / CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 sm:p-8 bg-white border border-[#B99A5B]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]/40">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#101C2C]">
              Courtroom & Arbitral Independence
            </h3>
            <p className="text-xs sm:text-sm text-[#101C2C]/75 leading-relaxed font-sans">
              Our barristers and advocates act unencumbered by institutional multi-service conflicts. Every brief receives uncompromised, strategic advocacy guided solely by law and evidence.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white border border-[#B99A5B]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]/40">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#101C2C]">
              Cross-Border Multi-Jurisdictional Reach
            </h3>
            <p className="text-xs sm:text-sm text-[#101C2C]/75 leading-relaxed font-sans">
              Coordinated chambers in London, Geneva, Singapore, and New York ensure seamless enforcement across New York Convention states and apex Commonwealth benches.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white border border-[#B99A5B]/30 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]/40">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#101C2C]">
              Doctrinal & Academic Excellence
            </h3>
            <p className="text-xs sm:text-sm text-[#101C2C]/75 leading-relaxed font-sans">
              Chambers authors leading treatises on arbitration, cross-border injunctions, and maritime law, directing our Continuing Legal Education Academy for international counsel.
            </p>
          </div>

        </div>
      </section>

      {/* 3. MANDATORY MODULE: MEET OUR TEAM SECTION */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-24 border-y border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#B99A5B]/25">
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
                Chambers Advocacy Roster
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4ED]">
                Meet Our Advocates & Counsel
              </h2>
              <p className="text-xs sm:text-sm text-[#F7F4ED]/75 max-w-xl">
                Senior advocates, King's Counsel, and international legal researchers dedicated to rigorous, principled representation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('team')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer shadow"
            >
              <span>View Full Team Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Advocates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeam.slice(0, 4).map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onSelect={onSelectMember}
                featuredMode
              />
            ))}
          </div>

          {/* Bottom Bar Info */}
          <div className="pt-4 border-t border-[#B99A5B]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F4ED]/70 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
              <span>All advocate enrollments verified through respective statutory law societies and bar councils.</span>
            </div>
            <button
              onClick={() => onNavigate('team')}
              className="text-[#B99A5B] hover:underline font-semibold cursor-pointer"
            >
              Browse by Department or Role →
            </button>
          </div>

        </div>
      </section>

      {/* 4. PRACTICE AREAS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#B99A5B]/25">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
              Core Jurisprudential Practice
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101C2C] mt-1">
              Distinguished Practice Areas
            </h2>
          </div>
          <button
            onClick={() => onNavigate('practice-areas')}
            className="text-xs font-semibold uppercase tracking-wider text-[#101C2C] hover:text-[#B99A5B] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore All Practice Jurisdictions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {practiceAreas.slice(0, 3).map((pa) => (
            <div
              key={pa.id}
              onClick={() => onSelectPracticeArea(pa)}
              className="bg-white p-6 sm:p-8 border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all flex flex-col justify-between cursor-pointer group shadow-[0_2px_8px_rgba(16,28,44,0.03)]"
            >
              <div className="space-y-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                  Practice Jurisdiction
                </div>
                <h3 className="font-serif text-xl font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors leading-snug">
                  {pa.title}
                </h3>
                <p className="text-xs text-[#101C2C]/75 leading-relaxed">
                  {pa.shortDescription}
                </p>

                <div className="pt-2 text-[11px] text-[#101C2C]/65">
                  <span className="font-semibold text-[#101C2C]">Designated Counsel:</span>{' '}
                  {pa.leadAdvocateNames.join(' · ')}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B99A5B]/15 flex items-center justify-between text-xs font-semibold text-[#101C2C] group-hover:text-[#B99A5B]">
                <span>Review Scope of Representation</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. CONTINUING LEGAL EDUCATION (CLE ACADEMY HIGHLIGHT) */}
      <section className="bg-white border-y border-[#B99A5B]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
                Professional Education & Masterclasses
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101C2C] mt-1">
                The Lex Global Advocacy Academy
              </h2>
              <p className="text-xs sm:text-sm text-[#101C2C]/75 max-w-xl mt-1">
                Accredited Continuing Legal Education courses instructed directly by chambers advocates and King's Counsel.
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse All Masterclasses →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.slice(0, 2).map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCourse(c)}
                className="p-6 bg-[#F7F4ED] border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                    <span>{c.category}</span>
                    <span>·</span>
                    <span>{c.level}</span>
                    <span>·</span>
                    <span>{c.cleCredits} CLE Credits</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#101C2C]/75 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="text-xs text-[#101C2C]/70">
                    Faculty Lead: <strong className="text-[#101C2C]">{c.instructorName}</strong> ({c.instructorDesignation})
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#B99A5B]/20 flex items-center justify-between text-xs font-semibold text-[#101C2C]">
                  <span>Explore Syllabus & Exam</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. RECENT LEGAL INSIGHTS / BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#B99A5B]/25">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
              Jurisprudential Journal
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
              Recent Chambers Insights & Commentary
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blogs')}
            className="text-xs font-semibold uppercase tracking-wider text-[#101C2C] hover:text-[#B99A5B] flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Journal Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white p-6 border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
                  {post.category} · {post.readingTime}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#101C2C]/75 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B99A5B]/15 flex items-center gap-3">
                <img
                  src={post.authorImageUrl}
                  alt={post.authorName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover object-top border border-[#B99A5B]/30 shrink-0"
                />
                <div className="truncate text-xs">
                  <div className="font-bold text-[#101C2C] truncate">{post.authorName}</div>
                  <div className="text-[10px] text-[#101C2C]/60 truncate">{post.publishedDate}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* 7. FORMAL CONSULTATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101C2C] text-[#F7F4ED] p-8 sm:p-12 border border-[#B99A5B]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
              Confidential Instruction
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F4ED]">
              Retain Chambers for Dispute Representation or Strategic Advisory
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F4ED]/75 leading-relaxed">
              We accept instructions from corporate counsel, solicitors, law firms, and international enterprises. Complete confidential conflict clearance is performed prior to retainer confirmation.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onRequestConsultation}
              className="px-6 py-3 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded shadow transition-colors text-center cursor-pointer whitespace-nowrap"
            >
              Request Consultation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 border border-[#B99A5B]/50 text-[#F7F4ED] hover:bg-[#B99A5B]/15 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors text-center cursor-pointer whitespace-nowrap"
            >
              Chambers Directory
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
