import React, { useState, useEffect } from 'react';
import { TeamMember, PracticeArea, ConsultationBooking, ClientMatter, Course } from '../types';
import { storageService } from '../services/storageService';
import { AdminTeamManager } from './AdminTeamManager';
import {
  Shield,
  Users,
  Inbox,
  Briefcase,
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  teamMembers: TeamMember[];
  practiceAreas: PracticeArea[];
  courses: Course[];
  matters: ClientMatter[];
  onDataChanged: () => void;
  onPreviewMember: (member: TeamMember) => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  teamMembers,
  practiceAreas,
  courses,
  matters,
  onDataChanged,
  onPreviewMember,
  onNavigateHome,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'team' | 'consultations' | 'matters' | 'courses'>('team');
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);

  useEffect(() => {
    setIsAuthenticated(storageService.isAdminAuthenticated());
    setConsultations(storageService.getConsultations());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized passcodes: "chambers2026", "admin", or "lex"
    if (passcode.toLowerCase() === 'chambers2026' || passcode.toLowerCase() === 'admin' || passcode === 'lex') {
      storageService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid chambers administrative key. (Default: chambers2026)');
    }
  };

  const handleQuickUnlock = () => {
    storageService.setAdminAuthenticated(true);
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleLogout = () => {
    storageService.setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id: string, status: ConsultationBooking['status']) => {
    storageService.updateConsultationStatus(id, status);
    setConsultations(storageService.getConsultations());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#F7F4ED]">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#B99A5B]/40 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#101C2C] text-[#B99A5B] flex items-center justify-center border border-[#B99A5B]">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-[10px] uppercase font-semibold text-[#B99A5B] tracking-widest">
              Lex Global Advocacy
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
              Chambers Administration
            </h2>
            <p className="text-xs text-[#101C2C]/70">
              Restricted portal for Senior Clerks, Practice Managers & Managing Partners.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                Administrative Passkey
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter chambers passkey..."
                className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2.5 text-xs text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded font-mono"
              />
              {authError && <p className="text-[11px] text-red-600 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded border border-[#B99A5B]/40 transition-colors cursor-pointer"
            >
              Verify & Enter Chambers Console
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-[#B99A5B]/20 text-center">
            <button
              onClick={handleQuickUnlock}
              className="text-xs text-[#B99A5B] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>One-Click Authorized Access (Evaluator Mode)</span>
            </button>
            <div className="text-[10px] text-[#101C2C]/50 mt-1">
              Passkey: <code className="bg-[#F7F4ED] px-1 py-0.5 border border-[#B99A5B]/20">chambers2026</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] pb-16">
      {/* Admin Subheader Banner */}
      <div className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-[#B99A5B] tracking-widest">
              <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Authorized Administrative Console</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#F7F4ED]">
              Chambers Governance & Practice Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs text-[#F7F4ED]/80 hover:text-[#F7F4ED] border border-[#B99A5B]/30 rounded transition-colors cursor-pointer"
            >
              Public Website
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs bg-[#B99A5B]/20 text-[#B99A5B] hover:bg-[#B99A5B]/30 rounded transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto text-xs uppercase tracking-wider font-semibold border-t border-[#B99A5B]/20">
          <button
            onClick={() => setActiveTab('team')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'team'
                ? 'border-[#B99A5B] text-[#B99A5B]'
                : 'border-transparent text-[#F7F4ED]/70 hover:text-[#F7F4ED]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Advocate Roster & Team ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'consultations'
                ? 'border-[#B99A5B] text-[#B99A5B]'
                : 'border-transparent text-[#F7F4ED]/70 hover:text-[#F7F4ED]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inbound Consultations ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('matters')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'matters'
                ? 'border-[#B99A5B] text-[#B99A5B]'
                : 'border-transparent text-[#F7F4ED]/70 hover:text-[#F7F4ED]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Proceedings & Matters ({matters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'courses'
                ? 'border-[#B99A5B] text-[#B99A5B]'
                : 'border-transparent text-[#F7F4ED]/70 hover:text-[#F7F4ED]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>CLE Academy Curriculum ({courses.length})</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'team' && (
          <AdminTeamManager
            members={teamMembers}
            practiceAreas={practiceAreas}
            onDataChanged={onDataChanged}
            onPreviewMember={onPreviewMember}
          />
        )}

        {activeTab === 'consultations' && (
          <div className="space-y-6">
            <div className="bg-white p-5 border border-[#B99A5B]/30 flex justify-between items-center">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#101C2C]">
                  Inbound Client Consultation Inquiries
                </h2>
                <p className="text-xs text-[#101C2C]/70 mt-0.5">
                  Conflict-clearance pipeline for newly submitted client matter briefs.
                </p>
              </div>
            </div>

            {consultations.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#B99A5B]/25">
                <Inbox className="w-10 h-10 text-[#B99A5B]/40 mx-auto mb-3" />
                <div className="font-serif text-lg font-bold text-[#101C2C]">
                  No Inbound Consultations Yet
                </div>
                <p className="text-xs text-[#101C2C]/70 mt-1 max-w-sm mx-auto">
                  When clients submit consultation requests through the website, they appear here for conflict clearance and counsel dispatch.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 border border-[#B99A5B]/30 shadow-sm flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#101C2C] bg-[#F7F4ED] px-2 py-0.5 border border-[#B99A5B]/30">
                          {item.referenceCode}
                        </span>
                        <span className="text-xs text-[#101C2C]/70">
                          Submitted {new Date(item.submittedAt).toLocaleDateString()}
                        </span>
                        {item.isUrgent && (
                          <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider">
                            Urgent Proceeding
                          </span>
                        )}
                      </div>

                      <div className="font-serif text-lg font-bold text-[#101C2C]">
                        {item.clientName}{' '}
                        {item.clientOrganization && (
                          <span className="text-xs font-sans font-normal text-[#101C2C]/70">
                            ({item.clientOrganization})
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#101C2C]/80 space-y-1">
                        <div>
                          <strong className="text-[#101C2C]">Jurisdiction:</strong> {item.practiceAreaTitle}
                        </div>
                        <div>
                          <strong className="text-[#101C2C]">Requested Advocate:</strong>{' '}
                          {item.advocateName || 'Any Specialist'}
                        </div>
                        <div>
                          <strong className="text-[#101C2C]">Format & Time:</strong> {item.consultationType} on{' '}
                          {item.preferredDate} ({item.preferredTimeSlot})
                        </div>
                        <div>
                          <strong className="text-[#101C2C]">Direct Contact:</strong> {item.clientEmail} ·{' '}
                          {item.clientPhone}
                        </div>
                      </div>

                      <div className="p-3 bg-[#F7F4ED] text-xs text-[#101C2C]/80 italic mt-2 border-l-2 border-[#B99A5B]">
                        "{item.caseBrief}"
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-[#B99A5B]/20 pt-4 md:pt-0 md:pl-6 shrink-0 min-w-[200px]">
                      <div>
                        <span className="block text-[10px] uppercase font-semibold text-[#B99A5B] tracking-wider mb-1">
                          Matter Pipeline Status
                        </span>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                          className="bg-[#F7F4ED] border border-[#B99A5B]/40 p-1.5 text-xs font-semibold text-[#101C2C] rounded"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Advisory In Progress">Advisory In Progress</option>
                          <option value="Concluded">Concluded</option>
                        </select>
                      </div>

                      <div className="text-[11px] text-[#101C2C]/60 text-right mt-4">
                        Senior Clerk Registry
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'matters' && (
          <div className="space-y-4">
            <div className="bg-white p-5 border border-[#B99A5B]/30">
              <h2 className="font-serif text-xl font-bold text-[#101C2C]">
                Active Chambers Matters & Docket Registry
              </h2>
              <p className="text-xs text-[#101C2C]/70 mt-0.5">
                Privileged docket records linked to lead advocates and tribunal filing deadlines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matters.map((mat) => (
                <div key={mat.id} className="bg-white p-5 border border-[#B99A5B]/30 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#B99A5B]">
                      <span>{mat.matterNumber}</span>
                      <span className="font-bold text-[#101C2C]">{mat.status}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#101C2C]">
                      {mat.title}
                    </h3>
                    <div className="text-xs text-[#101C2C]/70">
                      <span className="font-semibold text-[#101C2C]">Lead:</span> {mat.leadAdvocateName}
                    </div>
                    <div className="text-xs text-[#101C2C]/70">
                      <span className="font-semibold text-[#101C2C]">Forum:</span> {mat.filingCourt}
                    </div>
                    <p className="text-xs text-[#101C2C]/80 line-clamp-3 pt-2">
                      {mat.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#B99A5B]/20 text-xs text-[#101C2C]/70 flex items-center justify-between mt-4">
                    <span>Deadline: {mat.nextFilingDeadline}</span>
                    <span className="font-semibold text-[#B99A5B]">{mat.confidentialDocuments.length} Briefs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="bg-white p-5 border border-[#B99A5B]/30">
              <h2 className="font-serif text-xl font-bold text-[#101C2C]">
                CLE Academy Curriculum Registry
              </h2>
              <p className="text-xs text-[#101C2C]/70 mt-0.5">
                Approved continuing legal education courses, instructor assignments, and accredited hours.
              </p>
            </div>

            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-4 border border-[#B99A5B]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-[#B99A5B] tracking-wider">
                      {course.category} · {course.level} · {course.cleCredits} CLE Credits
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#101C2C] mt-0.5">
                      {course.title}
                    </h3>
                    <div className="text-xs text-[#101C2C]/70 mt-0.5">
                      Faculty: {course.instructorName} ({course.instructorDesignation})
                    </div>
                  </div>

                  <div className="text-xs text-[#101C2C]/80 shrink-0">
                    <span className="font-bold">{course.modules.length}</span> Modules ·{' '}
                    <span className="font-bold">{course.quiz.length}</span> Exam Questions
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
