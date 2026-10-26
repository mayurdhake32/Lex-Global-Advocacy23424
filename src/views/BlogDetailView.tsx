import React from 'react';
import { BlogPost, TeamMember } from '../types';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  authorMember?: TeamMember;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectAuthor: (author: TeamMember) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  post,
  allPosts,
  authorMember,
  onBack,
  onSelectPost,
  onSelectAuthor,
}) => {
  const otherPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pb-24 space-y-12">
      
      {/* 1. BREADCRUMB & ARTICLE HEADER */}
      <div className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 pt-8 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-[#F7F4ED]/70" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="hover:text-[#B99A5B] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Legal Insights</span>
            </button>
            <span className="text-[#B99A5B]/40">/</span>
            <span className="text-[#B99A5B] font-medium">{post.category}</span>
          </nav>

          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B99A5B] font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>{post.category} · Lex Journal of Global Advocacy</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F4ED] leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#F7F4ED]/80 font-sans">
              <span>Published {post.publishedDate}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Author Byline Box */}
        <div className="bg-white border border-[#B99A5B]/30 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={post.authorImageUrl}
              alt={post.authorName}
              referrerPolicy="no-referrer"
              className="w-14 h-14 object-cover object-top border border-[#B99A5B]/30 shrink-0"
            />
            <div>
              <div className="text-[10px] font-semibold uppercase text-[#B99A5B] tracking-wider">
                Authored by Chambers Counsel
              </div>
              <div className="font-serif text-lg font-bold text-[#101C2C]">
                {post.authorName}
              </div>
              <div className="text-xs text-[#101C2C]/70">
                {post.authorDesignation}
              </div>
            </div>
          </div>

          {authorMember && (
            <button
              onClick={() => onSelectAuthor(authorMember)}
              className="px-4 py-2 border border-[#B99A5B]/40 text-[#101C2C] hover:bg-[#B99A5B]/10 font-semibold text-xs rounded transition-colors whitespace-nowrap"
            >
              View Full Chambers Profile →
            </button>
          )}
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 bg-white border-l-4 border-[#B99A5B] italic font-serif text-base sm:text-lg text-[#101C2C]/90 leading-relaxed shadow-sm">
          "{post.excerpt}"
        </div>

        {/* Article Body */}
        <div className="bg-white border border-[#B99A5B]/25 p-8 sm:p-12 shadow-sm space-y-6 text-sm sm:text-base text-[#101C2C]/85 leading-relaxed font-sans">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="first-letter:font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-[#101C2C] first-letter:mr-1">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Citations & Authorities */}
        {post.citations.length > 0 && (
          <div className="bg-white border border-[#B99A5B]/30 p-6 sm:p-8 shadow-sm space-y-3">
            <h3 className="font-serif text-base font-bold text-[#101C2C] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B99A5B]" />
              <span>Statutory Authorities & Judicial Citations</span>
            </h3>
            <ol className="space-y-2 text-xs text-[#101C2C]/80 list-decimal list-inside font-mono">
              {post.citations.map((cite, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-serif italic font-normal text-[#101C2C]">
                    {cite}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Adjacent Articles */}
        {otherPosts.length > 0 && (
          <div className="pt-8 border-t border-[#B99A5B]/25 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#101C2C]">
              More Commentary from Lex Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((p) => (
                <article
                  key={p.id}
                  onClick={() => onSelectPost(p)}
                  className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] p-5 cursor-pointer transition-colors group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-[#B99A5B]">
                      {p.category}
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors mt-1">
                      {p.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#B99A5B]/15 text-xs text-[#B99A5B] font-semibold flex items-center gap-1">
                    <span>Read Treatise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
