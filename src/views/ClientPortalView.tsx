import React, { useState } from 'react';
import { ClientMatter, TeamMember } from '../types';
import {
  Lock,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Shield,
  Briefcase,
  User,
  ArrowRight,
} from 'lucide-react';

interface ClientPortalViewProps {
  matters: ClientMatter[];
  teamMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  onRequestConsultation: () => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  matters,
  teamMembers,
  onSelectMember,
  onRequestConsultation,
}) => {
  const [selectedMatterId, setSelectedMatterId] = useState(matters[0]?.id || '');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const activeMatter = matters.find((m) => m.id === selectedMatterId) || matters[0];

  const handleSimulateDownload = (docTitle: string) => {
    setDownloadSuccessMsg(`Privileged brief "${docTitle}" encrypted download initiated.`);
    setTimeout(() => setDownloadSuccessMsg(null), 3500);
  };

  const leadAdvocate = teamMembers.find(
    (m) => activeMatter && m.name.toLowerCase().includes(activeMatter.leadAdvocateName.toLowerCase())
  );

  return (
    <div className="pb-24 space-y-12">
      
      {/* 1. PORTAL HEADER */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-10 pb-12 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
              <Lock className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Chambers Privileged Client Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#F7F4ED]">
              Active Proceedings & Docket Repository
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#F7F4ED]/70 font-mono">
              Session: Retained Institutional Client
            </span>
            <button
              onClick={onRequestConsultation}
              className="px-3 py-1.5 bg-[#B99A5B] text-[#101C2C] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
            >
              Instruct Additional Counsel
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN FUNCTIONAL DASHBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Download notification */}
        {downloadSuccessMsg && (
          <div className="p-3 mb-6 bg-[#101C2C] text-[#F7F4ED] border border-[#B99A5B] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Matter Selector List */}
          <div className="lg:col-span-4 bg-white border border-[#B99A5B]/30 p-4 shadow-sm space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A5B] pb-2 border-b border-[#B99A5B]/20">
              Retained Matters ({matters.length})
            </div>

            <div className="space-y-2">
              {matters.map((m) => {
                const isSelected = m.id === selectedMatterId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMatterId(m.id)}
                    className={`w-full text-left p-3 border rounded transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#101C2C] text-[#F7F4ED] border-[#B99A5B]'
                        : 'bg-[#F7F4ED] text-[#101C2C] border-[#B99A5B]/25 hover:border-[#B99A5B]'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                      <span className={isSelected ? 'text-[#B99A5B]' : 'text-[#101C2C]/70'}>
                        {m.matterNumber}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                        isSelected ? 'bg-[#B99A5B]/20 text-[#B99A5B]' : 'bg-white text-[#101C2C]/70'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold font-serif line-clamp-1">
                      {m.title}
                    </div>

                    <div className={`text-[10px] mt-1 ${isSelected ? 'text-[#F7F4ED]/70' : 'text-[#101C2C]/60'}`}>
                      Lead: {m.leadAdvocateName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Docket Information */}
          {activeMatter && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* Matter Summary Card */}
              <div className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#B99A5B]/20">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#B99A5B]">
                      {activeMatter.matterNumber}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#101C2C] mt-0.5">
                      {activeMatter.title}
                    </h2>
                  </div>

                  <div className="text-xs text-right">
                    <span className="text-[10px] uppercase font-semibold text-[#101C2C]/60 block">
                      Procedural Status
                    </span>
                    <span className="font-semibold text-emerald-800 text-xs font-mono">
                      {activeMatter.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#F7F4ED] p-4 border border-[#B99A5B]/25">
                  <div>
                    <span className="text-[#B99A5B] font-semibold uppercase text-[10px] block">
                      Instructing Client
                    </span>
                    <span className="font-medium text-[#101C2C]">{activeMatter.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[#B99A5B] font-semibold uppercase text-[10px] block">
                      Forum / Supervisory Bench
                    </span>
                    <span className="font-medium text-[#101C2C]">{activeMatter.filingCourt}</span>
                  </div>
                  <div>
                    <span className="text-[#B99A5B] font-semibold uppercase text-[10px] block">
                      Next Filing Deadline
                    </span>
                    <span className="font-bold text-red-700 font-mono">{activeMatter.nextFilingDeadline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#101C2C] mb-1">
                    Matter Background & Procedural Scope
                  </h3>
                  <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed font-sans">
                    {activeMatter.summary}
                  </p>
                </div>

                {/* Lead Advocate Link */}
                {leadAdvocate && (
                  <div className="pt-3 border-t border-[#B99A5B]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={leadAdvocate.imageUrl}
                        alt={leadAdvocate.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover object-top border border-[#B99A5B]/30"
                      />
                      <div className="text-xs">
                        <div className="text-[10px] uppercase font-semibold text-[#B99A5B]">
                          Lead Counsel Instructed
                        </div>
                        <div className="font-bold text-[#101C2C]">{leadAdvocate.name}</div>
                        <div className="text-[10px] text-[#101C2C]/70">{leadAdvocate.designation}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectMember(leadAdvocate)}
                      className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] underline"
                    >
                      View Counsel Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Privileged Filings & Documents Table */}
              <div className="bg-white border border-[#B99A5B]/30 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div className="font-serif text-lg font-bold text-[#101C2C] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#B99A5B]" />
                    <span>Privileged Pleadings & Evidentiary Records</span>
                  </div>
                  <span className="text-xs text-[#101C2C]/60 font-mono">
                    256-Bit TLS Encrypted
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#101C2C] text-[#F7F4ED] text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-4">Document Title</th>
                        <th className="py-2.5 px-4">Filing Date</th>
                        <th className="py-2.5 px-4">File Size</th>
                        <th className="py-2.5 px-4 text-right">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B99A5B]/15">
                      {activeMatter.confidentialDocuments.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-[#F7F4ED]">
                          <td className="py-3 px-4 font-medium text-[#101C2C] flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
                            <span>{doc.title}</span>
                          </td>
                          <td className="py-3 px-4 text-[#101C2C]/70 font-mono text-[11px]">
                            {doc.filingDate}
                          </td>
                          <td className="py-3 px-4 text-[#101C2C]/70 font-mono text-[11px]">
                            {doc.size}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleSimulateDownload(doc.title)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-[#101C2C] hover:text-[#B99A5B] border border-[#B99A5B]/30 hover:border-[#B99A5B] rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-[#B99A5B]" />
                              <span>Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
};
