import React, { useEffect } from 'react';
import { BlogPost, TeamMember } from '../types';
import { X, Clock, Calendar, BookOpen, User, ArrowRight } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  authorMember?: TeamMember;
  onSelectAuthor?: (author: TeamMember) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  authorMember,
  onSelectAuthor,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#101C2C]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#101C2C] text-[#F7F4ED] p-6 sm:p-8 border-b border-[#B99A5B]/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#B99A5B]">
              <span>Lex Journal of Global Advocacy</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>
            <h2 id="blog-modal-title" className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-[#F7F4ED] leading-tight">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#F7F4ED]/75">
              <span>Published {post.publishedDate}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                {post.readingTime}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F7F4ED]/70 hover:text-[#F7F4ED] hover:bg-[#B99A5B]/20 rounded transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-6">
          
          {/* Author Byline */}
          <div className="flex items-center justify-between p-4 bg-white border border-[#B99A5B]/30">
            <div className="flex items-center gap-3.5">
              <img
                src={post.authorImageUrl}
                alt={post.authorName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover object-top border border-[#B99A5B]/30 shrink-0"
              />
              <div>
                <div className="text-xs font-bold text-[#101C2C]">
                  {post.authorName}
                </div>
                <div className="text-[11px] text-[#101C2C]/70">
                  {post.authorDesignation}
                </div>
              </div>
            </div>

            {authorMember && onSelectAuthor && (
              <button
                onClick={() => {
                  onClose();
                  onSelectAuthor(authorMember);
                }}
                className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer"
              >
                <span>Chambers Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Excerpt */}
          <div className="p-4 bg-white border-l-2 border-[#B99A5B] italic font-serif text-sm sm:text-base text-[#101C2C]/90 leading-relaxed">
            "{post.excerpt}"
          </div>

          {/* Main Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-[#101C2C]/85 leading-relaxed font-sans">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:font-serif first-letter:text-2xl first-letter:font-bold first-letter:text-[#101C2C] first-letter:mr-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footnotes & Citations */}
          {post.citations.length > 0 && (
            <div className="pt-6 border-t border-[#B99A5B]/30 space-y-2">
              <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#101C2C] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B99A5B]" />
                Jurisprudential Authorities & Statutory Citations
              </h4>
              <ol className="space-y-1.5 text-xs text-[#101C2C]/75 list-decimal list-inside font-mono">
                {post.citations.map((cite, idx) => (
                  <li key={idx} className="leading-snug">
                    <span className="font-serif italic font-normal text-[#101C2C]/85">
                      {cite}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-6 border-t border-[#B99A5B]/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#101C2C] text-[#F7F4ED] hover:bg-[#1A2A40] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Close Article
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
