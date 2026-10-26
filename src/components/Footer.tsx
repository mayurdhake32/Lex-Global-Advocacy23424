import React from 'react';
import { NavTab } from './Navbar';
import { MapPin, Mail, Globe, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onRequestConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestConsultation }) => {
  return (
    <footer className="bg-[#101C2C] text-[#F7F4ED] border-t border-[#B99A5B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#B99A5B]/20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-serif text-2xl font-bold tracking-wider text-[#F7F4ED]">
              LEX GLOBAL ADVOCACY
            </div>
            <div className="text-xs tracking-[0.2em] text-[#B99A5B] uppercase font-sans font-medium">
              Chambers of International Counsel & Arbitrators
            </div>
            <p className="text-sm text-[#F7F4ED]/75 leading-relaxed max-w-sm pt-2">
              Providing rigorous, cross-border courtroom representation, international arbitration, and strategic sovereign advisory across leading global financial jurisdictions.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#B99A5B]">
              <Shield className="w-4 h-4 text-[#B99A5B]" />
              <span>Regulated Advocacy & Verified Bar Memberships</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B]">
              Chambers & Practice
            </h4>
            <ul className="space-y-2 text-sm text-[#F7F4ED]/80">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#B99A5B] transition-colors cursor-pointer text-left"
                >
                  Firm History & Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practice-areas')}
                  className="hover:text-[#B99A5B] transition-colors cursor-pointer text-left"
                >
                  Practice Areas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-[#B99A5B] transition-colors cursor-pointer text-left font-medium text-[#F7F4ED]"
                >
                  Our Team & Advocates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#B99A5B] transition-colors cursor-pointer text-left"
                >
                  CLE Legal Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blogs')}
                  className="hover:text-[#B99A5B] transition-colors cursor-pointer text-left"
                >
                  Legal Insights & Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Chambers Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B]">
              Global Chambers
            </h4>
            <ul className="space-y-3 text-xs text-[#F7F4ED]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F7F4ED] block">London (Main Chambers)</strong>
                  12 King’s Bench Walk, Temple, London EC4Y 7DX
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F7F4ED] block">Geneva Chambers</strong>
                  Rue du Rhône 42, 1204 Genève, Switzerland
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99A5B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F7F4ED] block">Singapore Chambers</strong>
                  Marina Bay Financial Centre, Tower 2, Singapore
                </span>
              </li>
            </ul>
          </div>

          {/* Secure Client Portal & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B]">
              Engagements
            </h4>
            <div className="space-y-2 text-sm text-[#F7F4ED]/80">
              <p className="text-xs leading-relaxed text-[#F7F4ED]/70">
                To retain counsel or schedule a confidential advisory session:
              </p>
              <button
                onClick={onRequestConsultation}
                className="w-full text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] rounded transition-colors cursor-pointer"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => onNavigate('client-portal')}
                className="w-full text-center px-4 py-2 text-xs font-medium uppercase tracking-wider border border-[#B99A5B]/40 text-[#B99A5B] hover:bg-[#B99A5B]/10 rounded transition-colors cursor-pointer"
              >
                Secure Client Portal
              </button>
              <div className="pt-2 text-[11px] text-[#F7F4ED]/60 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B99A5B]" />
                <span>clerk@lexglobaladvocacy.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimers and Copyright */}
        <div className="pt-8 text-xs text-[#F7F4ED]/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="leading-relaxed text-center md:text-left">
            © {new Date().getFullYear()} Lex Global Advocacy. All rights reserved. Professional legal representation is provided solely by authorized advocates and barristers enrolled in their respective statutory bars. No confidential information is transmitted via unencrypted web forms.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#B99A5B] transition-colors"
            >
              Chambers Admin
            </button>
            <span className="text-[#B99A5B]/40">·</span>
            <span>Privacy & Ethics</span>
            <span className="text-[#B99A5B]/40">·</span>
            <span>Bar Roll Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
