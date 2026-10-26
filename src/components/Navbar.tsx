import React, { useState } from 'react';
import { Menu, X, Shield, Lock, Phone, Globe, UserCheck, Calendar } from 'lucide-react';

export type NavTab = 
  | 'home'
  | 'about'
  | 'practice-areas'
  | 'team'
  | 'courses'
  | 'blogs'
  | 'contact'
  | 'client-portal'
  | 'admin';

interface NavbarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onRequestConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onRequestConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'team', label: 'Our Team' },
    { id: 'courses', label: 'Courses' },
    { id: 'blogs', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 shadow-md">
      
      {/* Top Pre-Header Bar (Institutional Chambers Strip) */}
      <div className="hidden md:block bg-[#0B1420] border-b border-[#B99A5B]/20 text-[11px] text-[#F7F4ED]/75 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#B99A5B]" />
              <span>Chambers: London · Geneva · Singapore · New York</span>
            </span>
            <span className="text-[#B99A5B]/40">·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#B99A5B]" />
              <span>Senior Clerk: +44 20 7946 0912</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate('client-portal')}
              className={`hover:text-[#B99A5B] transition-colors flex items-center gap-1 cursor-pointer ${
                currentTab === 'client-portal' ? 'text-[#B99A5B] font-semibold' : ''
              }`}
            >
              <UserCheck className="w-3 h-3 text-[#B99A5B]" />
              <span>Client Portal</span>
            </button>
            <span className="text-[#B99A5B]/40">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className={`hover:text-[#B99A5B] transition-colors flex items-center gap-1 cursor-pointer ${
                currentTab === 'admin' ? 'text-[#B99A5B] font-semibold' : ''
              }`}
            >
              <Lock className="w-3 h-3 text-[#B99A5B]" />
              <span>Chambers Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Website Header (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 lg:gap-8">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A5B] rounded py-1 shrink-0"
          aria-label="Lex Global Advocacy Homepage"
        >
          <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#F7F4ED] group-hover:text-[#B99A5B] transition-colors whitespace-nowrap">
            LEX GLOBAL ADVOCACY
          </div>
          <div className="text-[10px] tracking-[0.25em] text-[#B99A5B] uppercase font-sans font-medium whitespace-nowrap">
            International Chambers & Counsel
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-[11px] xl:text-xs uppercase tracking-widest transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#B99A5B] font-semibold'
                    : 'text-[#F7F4ED]/80 hover:text-[#F7F4ED]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B99A5B]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onRequestConsultation}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] transition-colors rounded shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A5B] whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultation</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F7F4ED] hover:text-[#B99A5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A5B] rounded cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1420] border-t border-[#B99A5B]/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm uppercase tracking-wider rounded ${
                currentTab === link.id
                  ? 'bg-[#101C2C] text-[#B99A5B] font-semibold'
                  : 'text-[#F7F4ED]/80 hover:bg-[#101C2C]/50 hover:text-[#F7F4ED]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#B99A5B]/20 space-y-2 px-3">
            <button
              onClick={() => {
                onNavigate('client-portal');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#F7F4ED]/80 hover:text-[#B99A5B] flex items-center gap-1.5 py-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
              Secure Client Portal
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#B99A5B] flex items-center gap-1.5 py-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Chambers Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
