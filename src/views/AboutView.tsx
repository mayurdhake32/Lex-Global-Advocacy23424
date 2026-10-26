import React from 'react';
import { NavTab } from '../components/Navbar';
import { Shield, Scale, Globe, Building2, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
  onRequestConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRequestConsultation }) => {
  return (
    <div className="pb-24 space-y-16 sm:space-y-24">
      
      {/* 1. HERO INTRODUCTION */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Chambers Heritage & Governance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12] max-w-3xl">
            Decades of Doctrinal Rigor & Transnational Courtroom Advocacy
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
            Founded on the classic British and Commonwealth tradition of independent barrister chambers, Lex Global Advocacy represents sovereign entities, multinational corporations, and international institutions before apex judicial courts and arbitral tribunals worldwide.
          </p>
        </div>
      </section>

      {/* 2. EDITORIAL IMAGE & TEXT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
              Our Foundation
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#101C2C] leading-snug">
              An Independent Chambers Free from Institutional Conflicts
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed">
              <p>
                Unlike multi-disciplinary Mega-firms where sprawling corporate retainer networks can dilute courtroom independence, Lex Global Advocacy operates strictly under a specialized chambers model. Each advocate is individually briefed and retained, allowing unhindered, fearless advocacy before high courts and international tribunals.
              </p>
              <p>
                Our members are regularly instructed by international law firms as specialist counsel to conduct trial cross-examinations, argue appellate points of public law, and lead jurisdictional challenges in bilateral investment treaty arbitrations.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('team')}
                className="px-5 py-2.5 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Explore Chambers Roster →
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] border border-[#B99A5B]/40 shadow-xl overflow-hidden bg-[#0B1420]">
              <img
                src="/src/assets/images/architecture_chambers_1793026103819.jpg"
                alt="Classical chambers architecture and international supreme court facade"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#F7F4ED] font-serif italic">
                Chambers Colonnade & High Court Advocacy Benches
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOUR CORE ETHICAL PILLARS */}
      <section className="bg-white border-y border-[#B99A5B]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
              Professional Standards
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#101C2C]">
              The Four Chambers Imperatives
            </h2>
            <div className="h-[1px] w-20 bg-[#B99A5B] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '01. Substantive Mastery',
                desc: 'Every advocate is steeped in the jurisprudence of their discipline. We build our cases on rigorous doctrinal research, avoiding procedural superficiality.',
                icon: BookOpen,
              },
              {
                title: '02. Zero Commercial Conflict',
                desc: 'Because we are an independent chambers rather than a transactional billing syndicate, our advocates can vigorously cross-examine counterparties without conflict hesitations.',
                icon: Shield,
              },
              {
                title: '03. Transnational Velocity',
                desc: 'With chambers located in London, Geneva, Singapore, and New York, our teams file emergency freezing orders and provisional measures across time zones within hours.',
                icon: Globe,
              },
              {
                title: '04. Strict Bar Integrity',
                desc: 'We publish only verified academic degrees, authentic bar admissions, and real judicial appointments. Our reputation is anchored in verifiable legal reality.',
                icon: Scale,
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-6 bg-[#F7F4ED] border border-[#B99A5B]/30 space-y-3">
                  <Icon className="w-6 h-6 text-[#B99A5B]" />
                  <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#101C2C]/75 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CHAMBERS SEATS WORLDWIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A5B]">
            Global Presence
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
            Our Chambers & Physical Jurisdictions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: 'London Chambers (Temple)',
              address: '12 King’s Bench Walk, Temple, London EC4Y 7DX',
              focus: 'Supreme Court, High Court of Admiralty, LCIA, Privy Council',
              clerk: 'seniorclerk@lexglobaladvocacy.com',
            },
            {
              city: 'Geneva Chambers',
              address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
              focus: 'ICC Arbitration, CAS Sports Arbitration, Sovereign Immunity',
              clerk: 'geneva@lexglobaladvocacy.com',
            },
            {
              city: 'Singapore Chambers',
              address: 'Marina Bay Financial Centre, Tower 2, Singapore',
              focus: 'SIAC, SCMA Maritime, Cross-Border Asian Infrastructure M&A',
              clerk: 'singapore@lexglobaladvocacy.com',
            },
            {
              city: 'New York Chambers',
              address: 'Rockefeller Plaza, New York, NY 10020',
              focus: 'Cross-Border M&A, CFIUS National Security, ICC NY',
              clerk: 'newyork@lexglobaladvocacy.com',
            },
          ].map((loc, i) => (
            <div key={i} className="p-6 bg-white border border-[#B99A5B]/30 space-y-3">
              <Building2 className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-serif text-base font-bold text-[#101C2C]">
                {loc.city}
              </h3>
              <p className="text-xs text-[#101C2C]/75">
                {loc.address}
              </p>
              <div className="text-[11px] text-[#101C2C]/65 pt-2 border-t border-[#B99A5B]/20">
                <strong className="text-[#101C2C] block">Core Jurisdictions:</strong>
                {loc.focus}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
