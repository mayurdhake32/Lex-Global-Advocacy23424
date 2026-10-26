import React, { useState } from 'react';
import { Course, TeamMember } from '../types';
import {
  GraduationCap,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

interface CourseDetailViewProps {
  course: Course;
  instructor?: TeamMember;
  onBack: () => void;
  onSelectInstructor: (instructor: TeamMember) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  instructor,
  onBack,
  onSelectInstructor,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'quiz'>('overview');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    course.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const isPassed = quizSubmitted && calculateScore() === course.quiz.length;

  return (
    <div className="pb-24 space-y-10">
      
      {/* 1. BREADCRUMB & HEADER */}
      <div className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-[#F7F4ED]/70" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to CLE Academy</span>
            </button>
            <span className="text-[#B99A5B]/40">/</span>
            <span className="text-[#B99A5B] font-medium">{course.category}</span>
          </nav>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B99A5B] font-semibold">
              <GraduationCap className="w-4 h-4 text-[#B99A5B]" />
              <span>{course.category} · {course.level} · {course.cleCredits} CLE Credits</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F4ED] mt-2 leading-tight max-w-4xl">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-xs text-[#F7F4ED]/80">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                {course.duration}
              </span>
              <span>·</span>
              <span>Lead Faculty: {course.instructorName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAV TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-b border-[#B99A5B]/30 px-6 flex items-center gap-6 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Course Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Curriculum & Modules ({course.modules.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Jurisprudential Exam & Certificate
          </button>
        </div>
      </div>

      {/* 3. MAIN BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                  Academic Description & Scope
                </h2>
                <p className="text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed font-sans">
                  {course.description}
                </p>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 space-y-4 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                  Verified Learning Outcomes
                </h3>
                <div className="space-y-3">
                  {course.learningOutcomes.map((lo, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#F7F4ED] border border-[#B99A5B]/20">
                      <CheckCircle2 className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#101C2C]/85">{lo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Faculty card */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#B99A5B]/30 p-6 space-y-4 shadow-sm">
                <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider">
                  Lead Course Faculty
                </div>

                <div className="flex items-center gap-4">
                  {instructor && (
                    <img
                      src={instructor.imageUrl}
                      alt={instructor.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-serif text-lg font-bold text-[#101C2C]">
                      {course.instructorName}
                    </div>
                    <div className="text-xs text-[#101C2C]/70">
                      {course.instructorDesignation}
                    </div>
                  </div>
                </div>

                {instructor && (
                  <button
                    onClick={() => onSelectInstructor(instructor)}
                    className="w-full py-2 border border-[#B99A5B]/40 text-[#101C2C] hover:bg-[#B99A5B]/10 font-semibold text-xs rounded transition-colors"
                  >
                    View Faculty Chambers Profile
                  </button>
                )}

                <div className="pt-4 border-t border-[#B99A5B]/20">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="w-full py-3 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    Begin Reading Curriculum →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Module Index */}
            <div className="lg:col-span-4 bg-white border border-[#B99A5B]/30 p-4 space-y-2 shadow-sm">
              <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider pb-2 border-b border-[#B99A5B]/20">
                Curriculum Modules ({course.modules.length})
              </div>
              {course.modules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-3 text-xs rounded transition-colors cursor-pointer ${
                    activeModuleIndex === idx
                      ? 'bg-[#101C2C] text-[#F7F4ED] font-semibold'
                      : 'bg-[#F7F4ED] text-[#101C2C] hover:bg-[#B99A5B]/15 border border-[#B99A5B]/20'
                  }`}
                >
                  <div className="text-[10px] opacity-75">{m.duration}</div>
                  <div className="truncate font-medium">{m.title}</div>
                </button>
              ))}
            </div>

            {/* Reading Content */}
            <div className="lg:col-span-8 bg-white border border-[#B99A5B]/30 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-[#B99A5B]/20 pb-4">
                <span className="text-[10px] uppercase font-semibold text-[#B99A5B] tracking-wider">
                  Module 0{activeModuleIndex + 1}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#101C2C] mt-1">
                  {course.modules[activeModuleIndex].title}
                </h2>
                <p className="text-xs text-[#101C2C]/70 mt-1 italic">
                  {course.modules[activeModuleIndex].summary}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed space-y-4 font-sans bg-[#F7F4ED] p-6 border border-[#B99A5B]/20">
                {course.modules[activeModuleIndex].content}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#B99A5B]/20">
                <button
                  disabled={activeModuleIndex === 0}
                  onClick={() => setActiveModuleIndex((prev) => prev - 1)}
                  className="text-xs text-[#101C2C]/70 hover:text-[#101C2C] disabled:opacity-30 cursor-pointer"
                >
                  ← Previous Module
                </button>

                {activeModuleIndex < course.modules.length - 1 ? (
                  <button
                    onClick={() => setActiveModuleIndex((prev) => prev + 1)}
                    className="px-5 py-2 bg-[#101C2C] text-[#F7F4ED] text-xs font-semibold rounded uppercase tracking-wider cursor-pointer"
                  >
                    Next Module →
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-5 py-2 bg-[#B99A5B] text-[#101C2C] text-xs font-semibold rounded uppercase tracking-wider cursor-pointer shadow"
                  >
                    Take Competency Examination →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#B99A5B]/30 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="border-b border-[#B99A5B]/20 pb-4">
              <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider">
                Formal CLE Accreditation
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#101C2C] mt-1">
                Jurisprudential Competency Examination
              </h2>
              <p className="text-xs text-[#101C2C]/70 mt-1">
                Answer all doctrinal questions correctly to generate your verified Certificate of Continuing Legal Education.
              </p>
            </div>

            <div className="space-y-6">
              {course.quiz.map((q, qIdx) => (
                <div key={q.id} className="p-5 bg-[#F7F4ED] border border-[#B99A5B]/30 space-y-3">
                  <div className="font-medium text-xs sm:text-sm text-[#101C2C]">
                    <span className="text-[#B99A5B] font-bold mr-1">Q{qIdx + 1}.</span>
                    {q.question}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedAnswers[q.id] === optIdx;
                      let optStyle = 'bg-white border-[#B99A5B]/30 text-[#101C2C] hover:border-[#B99A5B]';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                        } else if (isChosen && optIdx !== q.correctIndex) {
                          optStyle = 'bg-red-50 border-red-600 text-red-900';
                        }
                      } else if (isChosen) {
                        optStyle = 'bg-[#101C2C] border-[#101C2C] text-[#F7F4ED]';
                      }

                      return (
                        <button
                          type="button"
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 text-xs border rounded transition-colors cursor-pointer ${optStyle}`}
                        >
                          <span className="font-bold mr-2 uppercase text-[10px]">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-white border-l-2 border-[#B99A5B] text-xs text-[#101C2C]/80 mt-2">
                      <strong className="text-[#101C2C] block mb-0.5 font-semibold">
                        Doctrinal Rationale:
                      </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#B99A5B]/20">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                  className="px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] disabled:opacity-40 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Submit Examination for Accreditation
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F4ED] border border-[#B99A5B]/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className={`w-8 h-8 ${isPassed ? 'text-[#B99A5B]' : 'text-amber-600'}`} />
                      <div>
                        <div className="text-sm font-bold text-[#101C2C]">
                          {isPassed ? 'Accreditation Confirmed: Distinction' : 'Examination Review Required'}
                        </div>
                        <div className="text-xs text-[#101C2C]/70">
                          Score: {calculateScore()} / {course.quiz.length} ({course.cleCredits} CLE Credits Approved)
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedAnswers({});
                      }}
                      className="text-xs text-[#B99A5B] underline cursor-pointer"
                    >
                      Retake Exam
                    </button>
                  </div>

                  {isPassed && (
                    <div className="p-8 bg-[#101C2C] text-[#F7F4ED] border-2 border-[#B99A5B] text-center space-y-3 shadow-xl">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
                        Lex Global Advocacy · Continuing Legal Education Academy
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#F7F4ED]">
                        Official Certificate of Jurisprudential Competency
                      </div>
                      <p className="text-xs text-[#F7F4ED]/80 max-w-md mx-auto">
                        This certifies accredited completion of <strong>{course.title}</strong> under the faculty oversight of <strong>{course.instructorName}</strong>.
                      </p>
                      <div className="text-[11px] font-mono text-[#B99A5B] pt-2">
                        Accreditation ID: CLE-LEX-2026-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
