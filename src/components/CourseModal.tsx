import React, { useState, useEffect } from 'react';
import { Course, TeamMember } from '../types';
import { X, BookOpen, CheckCircle2, Award, Clock, FileCheck, ArrowRight } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  instructor?: TeamMember;
  onSelectInstructor?: (instructor: TeamMember) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  instructor,
  onSelectInstructor,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'quiz'>('overview');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (course) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#101C2C]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl z-10 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-[#101C2C] text-[#F7F4ED] p-6 sm:p-8 border-b border-[#B99A5B]/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
              <span>CLE Academy</span>
              <span>·</span>
              <span>{course.level}</span>
              <span>·</span>
              <span>{course.cleCredits} Accredited Credits</span>
            </div>
            <h2 id="course-modal-title" className="font-serif text-xl sm:text-2xl font-bold mt-1 text-[#F7F4ED]">
              {course.title}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-xs text-[#F7F4ED]/80">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                {course.duration}
              </span>
              <span>·</span>
              <span>Lead Faculty: {course.instructorName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F7F4ED]/70 hover:text-[#F7F4ED] hover:bg-[#B99A5B]/20 rounded transition-colors cursor-pointer"
            aria-label="Close course modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#B99A5B]/25 px-6 flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Course Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Curriculum & Modules ({course.modules.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#B99A5B] text-[#101C2C]'
                : 'border-transparent text-[#101C2C]/60 hover:text-[#101C2C]'
            }`}
          >
            Jurisprudential Exam & CLE Accreditation
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#101C2C] mb-2">
                  Academic Description
                </h3>
                <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Faculty Banner */}
              <div className="p-4 bg-white border border-[#B99A5B]/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {instructor && (
                    <img
                      src={instructor.imageUrl}
                      alt={instructor.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                    />
                  )}
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-[#B99A5B] tracking-wider">
                      Faculty Lead
                    </div>
                    <div className="text-sm font-bold text-[#101C2C]">
                      {course.instructorName}
                    </div>
                    <div className="text-xs text-[#101C2C]/70">
                      {course.instructorDesignation}
                    </div>
                  </div>
                </div>

                {instructor && onSelectInstructor && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectInstructor(instructor);
                    }}
                    className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] underline"
                  >
                    View Faculty Profile
                  </button>
                )}
              </div>

              {/* Learning Outcomes */}
              <div>
                <h3 className="font-serif text-base font-bold text-[#101C2C] mb-3">
                  Verified Learning Outcomes
                </h3>
                <div className="space-y-2">
                  {course.learningOutcomes.map((lo, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#101C2C]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                      <span>{lo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#B99A5B]/20 flex justify-end">
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className="px-5 py-2.5 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Start Reading Modules →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Module list */}
              <div className="space-y-2 border-r border-[#B99A5B]/20 pr-4">
                <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider mb-2">
                  Modules
                </div>
                {course.modules.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`w-full text-left p-2.5 text-xs rounded transition-colors cursor-pointer ${
                      activeModuleIndex === idx
                        ? 'bg-[#101C2C] text-[#F7F4ED] font-semibold'
                        : 'bg-white text-[#101C2C]/80 hover:bg-[#B99A5B]/15 border border-[#B99A5B]/20'
                    }`}
                  >
                    <div className="text-[10px] opacity-75">{m.duration}</div>
                    <div className="truncate">{m.title}</div>
                  </button>
                ))}
              </div>

              {/* Module Content */}
              <div className="md:col-span-2 space-y-4">
                <div className="border-b border-[#B99A5B]/20 pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                    {course.modules[activeModuleIndex].title}
                  </h3>
                  <p className="text-xs text-[#101C2C]/70 mt-1 italic">
                    {course.modules[activeModuleIndex].summary}
                  </p>
                </div>

                <div className="bg-white p-5 border border-[#B99A5B]/25 text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed space-y-3 font-sans">
                  {course.modules[activeModuleIndex].content}
                </div>

                <div className="flex justify-between items-center pt-2">
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
                      className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] cursor-pointer"
                    >
                      Next Module →
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-4 py-1.5 bg-[#B99A5B] text-[#101C2C] text-xs font-semibold rounded uppercase tracking-wider cursor-pointer"
                    >
                      Take Final Exam →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="border-b border-[#B99A5B]/20 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                  Jurisprudential Competency Examination
                </h3>
                <p className="text-xs text-[#101C2C]/70 mt-0.5">
                  Answer all substantive questions correctly to unlock your formal Certificate of Continuing Legal Education.
                </p>
              </div>

              <div className="space-y-6">
                {course.quiz.map((q, qIdx) => (
                  <div key={q.id} className="p-4 bg-white border border-[#B99A5B]/30 space-y-3">
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
                            className={`w-full text-left p-2.5 text-xs border rounded transition-colors cursor-pointer ${optStyle}`}
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
                      <div className="p-3 bg-[#F7F4ED] border-l-2 border-[#B99A5B] text-xs text-[#101C2C]/80 mt-2">
                        <strong className="text-[#101C2C] block mb-0.5 font-semibold">
                          Doctrinal Rationale:
                        </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit & Results */}
              <div className="pt-4 border-t border-[#B99A5B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] disabled:opacity-40 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Submit Answers for Certification
                  </button>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="p-4 bg-white border border-[#B99A5B]/40 flex items-center justify-between">
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
                      <div className="p-5 bg-[#101C2C] text-[#F7F4ED] border border-[#B99A5B] text-center space-y-2">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
                          Lex Global Advocacy · Continuing Legal Education Academy
                        </div>
                        <div className="font-serif text-lg font-bold text-[#F7F4ED]">
                          Official Certificate of Jurisprudential Competency
                        </div>
                        <div className="text-xs text-[#F7F4ED]/80 max-w-lg mx-auto">
                          Issued under the direction of {course.instructorName} for completion of {course.title}.
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
    </div>
  );
};
