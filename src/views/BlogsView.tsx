import React, { useState } from 'react';
import { BlogPost, TeamMember } from '../types';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

interface BlogsViewProps {
  posts: BlogPost[];
  teamMembers: TeamMember[];
  onSelectPost: (post: BlogPost) => void;
  onSelectAuthor: (author: TeamMember) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({
  posts,
  teamMembers,
  onSelectPost,
  onSelectAuthor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Arbitration Jurisprudence', 'Corporate & M&A', 'Maritime & Admiralty'];

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pb-24 space-y-16">
      
      {/* 1. HERO */}
      <section className="bg-[#101C2C] text-[#F7F4ED] pt-12 pb-16 sm:pb-20 border-b border-[#B99A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B99A5B] font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Lex Journal of Global Jurisprudence & Advocacy</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F4ED] leading-[1.12] max-w-3xl">
            Critical Commentary on Precedent & Transnational Law
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/80 leading-relaxed max-w-2xl font-sans">
            Doctrinal treatises, appellate skeleton analyses, and statutory critiques authored by our King’s Counsel, Senior Advocates, and research fellows on emerging judicial rulings.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-wrap items-center gap-2 border-b border-[#B99A5B]/20 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#101C2C] mr-2">
            Journal Category:
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

        {/* Articles List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const author = teamMembers.find(
              (m) => m.id === post.authorId || m.name.toLowerCase() === post.authorName.toLowerCase()
            );

            return (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="bg-white border border-[#B99A5B]/30 hover:border-[#B99A5B] transition-all p-6 sm:p-10 shadow-[0_2px_8px_rgba(16,28,44,0.03)] cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-[#B99A5B] font-semibold uppercase tracking-wider pb-3 border-b border-[#B99A5B]/15">
                  <span>{post.category}</span>
                  <div className="flex items-center gap-3 text-[#101C2C]/70 font-normal">
                    <span>Published {post.publishedDate}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B99A5B]" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#101C2C]/80 leading-relaxed font-sans max-w-4xl">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author footer */}
                <div className="mt-8 pt-4 border-t border-[#B99A5B]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorImageUrl}
                      alt={post.authorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#101C2C]">{post.authorName}</div>
                      <div className="text-[11px] text-[#101C2C]/65">{post.authorDesignation}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#101C2C] group-hover:text-[#B99A5B]">
                    <span>Read Full Treatise</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </section>

    </div>
  );
};
