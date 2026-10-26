import React, { useState } from 'react';
import { Course, TeamMember } from '../types';
import { GraduationCap, Clock, Award, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface CoursesViewProps {
  courses: Course[];
  teamMembers: TeamMember[];
  onSelectCourse: (course: Course) => void;
  onSelectMember: (member: TeamMember) => void;
  onNavigate: (tab: NavTab) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  teamMembers,
  onSelectCourse,
  onSelectMember,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Dispute Resolution', 'Corporate Jurisprudence', 'Technology & Regulatory'];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pb-24 space-y-16">
      {/* 1. HERO */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Chambers Continuing Legal Education (CLE) Academy</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12] max-w-3xl">
            Jurisprudential Masterclasses Instructed by Leading Advocates
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
            Rigorous continuing legal education designed for corporate counsel, litigation associates, and international practitioners seeking doctrinal precision in arbitration, cross-border M&A clearances, and emerging AI regulatory regimes.
          </p>
        </div>
      </section>

      {/* 2. STUDENT CLE DASHBOARD SUMMARY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#B99A5B]/30 p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
              Active CLE Cohort
            </div>
            <div className="font-serif text-2xl font-bold text-[#101C2C] tabular-nums">
              Autumn 2026
            </div>
            <div className="text-xs text-[#101C2C]/70">Accredited Self-Paced Modules</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
              Available CLE Credits
            </div>
            <div className="font-serif text-2xl font-bold text-[#101C2C] tabular-nums">
              28 Credits
            </div>
            <div className="text-xs text-[#101C2C]/70">Across 3 Masterclasses</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
              Instruction Faculty
            </div>
            <div className="font-serif text-2xl font-bold text-[#101C2C]">
              King’s Counsel & PhDs
            </div>
            <div className="text-xs text-[#101C2C]/70">Practicing Advocates Only</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B]">
              Formal Certification
            </div>
            <div className="font-serif text-2xl font-bold text-[#101C2C]">
              Distinction
            </div>
            <div className="text-xs text-[#101C2C]/70">Verified Digital Credential</div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER & COURSE LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#B99A5B]/20 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#101C2C] mr-2">
            Discipline:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#101C2C] text-[#F7F4ED]'
                  : 'bg-white text-[#101C2C]/80 hover:bg-[#B99A5B]/15 border border-[#B99A5B]/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const facultyMember = teamMembers.find(
              (m) => m.id === course.instructorId || m.name.toLowerCase() === course.instructorName.toLowerCase()
            );

            return (
              <div
                key={course.id}
                className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(16,28,44,0.03)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-[#B99A5B] font-semibold uppercase tracking-wider">
                    <span>{course.category}</span>
                    <span className="text-[#101C2C] font-mono font-bold bg-[#F7F4ED] px-2 py-0.5 border border-[#B99A5B]/30">
                      {course.cleCredits} CLE Credits
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#101C2C] leading-snug">
                    {course.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#101C2C]/70 pt-2 border-t border-[#B99A5B]/15">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                      {course.duration}
                    </span>
                    <span>·</span>
                    <span>{course.modules.length} Modules</span>
                    <span>·</span>
                    <span>{course.quiz.length} Questions</span>
                  </div>

                  <div className="p-3 bg-[#F7F4ED] border border-[#B99A5B]/20 flex items-center gap-3">
                    {facultyMember && (
                      <img
                        src={facultyMember.imageUrl}
                        alt={facultyMember.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                      />
                    )}
                    <div className="truncate text-xs">
                      <div className="font-bold text-[#101C2C] truncate">
                        {course.instructorName}
                      </div>
                      <div className="text-[10px] text-[#101C2C]/65 truncate">
                        {course.instructorDesignation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#B99A5B]/20 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2.5 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded border border-[#B99A5B]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Enter Course & Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACCREDITATION DISCLOSURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-[#B99A5B]/30 text-xs text-[#101C2C]/75 flex items-start gap-3">
          <Award className="w-5 h-5 text-[#B99A5B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Lex Global Advocacy Continuing Legal Education Academy is recognized across leading international jurisdictions. Formal certificates bearing chambers seal and lead faculty signature are generated upon completing the end-of-curriculum competency examination.
          </p>
        </div>
      </section>
    </div>
  );
};
