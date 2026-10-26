import React, { useState, useEffect } from 'react';
import { TeamMember, PracticeArea, Course, BlogPost, ClientMatter } from './types';
import { INITIAL_PRACTICE_AREAS } from './data/initialData';
import { storageService } from './services/storageService';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

// Main Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { TeamView } from './views/TeamView';
import { PracticeAreasView } from './views/PracticeAreasView';
import { CoursesView } from './views/CoursesView';
import { BlogsView } from './views/BlogsView';
import { ContactView } from './views/ContactView';
import { ClientPortalView } from './views/ClientPortalView';
import { AdminDashboard } from './components/AdminDashboard';

// Dedicated Detail Page Views
import { TeamDetailView } from './views/TeamDetailView';
import { PracticeAreaDetailView } from './views/PracticeAreaDetailView';
import { CourseDetailView } from './views/CourseDetailView';
import { BlogDetailView } from './views/BlogDetailView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [matters, setMatters] = useState<ClientMatter[]>([]);
  const practiceAreas: PracticeArea[] = INITIAL_PRACTICE_AREAS;

  // Active Detail Page Slugs (Full page views)
  const [activeMemberSlug, setActiveMemberSlug] = useState<string | null>(null);
  const [activeAreaSlug, setActiveAreaSlug] = useState<string | null>(null);
  const [activeCourseSlug, setActiveCourseSlug] = useState<string | null>(null);
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);

  // Consultation scheduler modal
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationAdvocate, setConsultationAdvocate] = useState<TeamMember | null>(null);
  const [consultationArea, setConsultationArea] = useState<string | null>(null);

  const loadData = () => {
    setTeamMembers(storageService.getTeamMembers());
    setCourses(storageService.getCourses());
    setBlogPosts(storageService.getBlogPosts());
    setMatters(storageService.getClientMatters());
  };

  // Sync URL state on mount & popstate
  const syncFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as NavTab | null;
      const slugParam = params.get('slug');
      const areaParam = params.get('area');
      const courseParam = params.get('course');
      const postParam = params.get('post');

      if (tabParam && ['home', 'about', 'practice-areas', 'team', 'courses', 'blogs', 'contact', 'client-portal', 'admin'].includes(tabParam)) {
        setCurrentTab(tabParam);
      } else {
        setCurrentTab('home');
      }

      setActiveMemberSlug(slugParam || null);
      setActiveAreaSlug(areaParam || null);
      setActiveCourseSlug(courseParam || null);
      setActivePostSlug(postParam || null);
    } catch {
      // safe
    }
  };

  useEffect(() => {
    loadData();
    syncFromURL();

    const handlePopState = () => {
      syncFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateURL = (tab: NavTab, params?: Record<string, string | null>) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      
      // Clear detail params by default
      url.searchParams.delete('slug');
      url.searchParams.delete('area');
      url.searchParams.delete('course');
      url.searchParams.delete('post');

      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val) {
            url.searchParams.set(key, val);
          } else {
            url.searchParams.delete(key);
          }
        });
      }

      window.history.pushState({}, '', url.toString());
    } catch {
      // safe
    }
  };

  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    setActiveMemberSlug(null);
    setActiveAreaSlug(null);
    setActiveCourseSlug(null);
    setActivePostSlug(null);
    updateURL(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMember = (member: TeamMember) => {
    setCurrentTab('team');
    setActiveMemberSlug(member.slug);
    setActiveAreaSlug(null);
    setActiveCourseSlug(null);
    setActivePostSlug(null);
    updateURL('team', { slug: member.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTeam = () => {
    setActiveMemberSlug(null);
    updateURL('team');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPracticeArea = (area: PracticeArea) => {
    setCurrentTab('practice-areas');
    setActiveAreaSlug(area.slug);
    setActiveMemberSlug(null);
    setActiveCourseSlug(null);
    setActivePostSlug(null);
    updateURL('practice-areas', { area: area.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPracticeAreas = () => {
    setActiveAreaSlug(null);
    updateURL('practice-areas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    setCurrentTab('courses');
    setActiveCourseSlug(course.slug);
    setActiveMemberSlug(null);
    setActiveAreaSlug(null);
    setActivePostSlug(null);
    updateURL('courses', { course: course.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCourses = () => {
    setActiveCourseSlug(null);
    updateURL('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPost = (post: BlogPost) => {
    setCurrentTab('blogs');
    setActivePostSlug(post.slug);
    setActiveMemberSlug(null);
    setActiveAreaSlug(null);
    setActiveCourseSlug(null);
    updateURL('blogs', { post: post.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogs = () => {
    setActivePostSlug(null);
    updateURL('blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (advocate?: TeamMember | null, practiceAreaTitle?: string | null) => {
    setConsultationAdvocate(advocate || null);
    setConsultationArea(practiceAreaTitle || null);
    setIsConsultationOpen(true);
  };

  // Find active models if slugs exist
  const activeMember = activeMemberSlug
    ? teamMembers.find((m) => m.slug === activeMemberSlug)
    : null;

  const activeArea = activeAreaSlug
    ? practiceAreas.find((a) => a.slug === activeAreaSlug)
    : null;

  const activeCourse = activeCourseSlug
    ? courses.find((c) => c.slug === activeCourseSlug)
    : null;

  const activePost = activePostSlug
    ? blogPosts.find((p) => p.slug === activePostSlug)
    : null;

  const featuredTeam = teamMembers.filter((m) => m.isPublished && !m.isArchived && m.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#101C2C]">
      {/* Institutional Website Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onRequestConsultation={() => handleOpenConsultation(null, null)}
      />

      {/* Main Website Page Router */}
      <main className="flex-1">
        
        {/* 1. DEDICATED FULL-PAGE ADVOCATE PROFILE */}
        {currentTab === 'team' && activeMember ? (
          <TeamDetailView
            member={activeMember}
            allMembers={teamMembers}
            practiceAreas={practiceAreas}
            onBack={handleBackToTeam}
            onSelectMember={handleSelectMember}
            onSelectPracticeArea={(areaTitle) => {
              const found = practiceAreas.find((p) => p.title.toLowerCase() === areaTitle.toLowerCase());
              if (found) handleSelectPracticeArea(found);
            }}
            onRequestConsultation={(mem) => handleOpenConsultation(mem, null)}
          />
        ) : currentTab === 'practice-areas' && activeArea ? (
          /* 2. DEDICATED FULL-PAGE PRACTICE AREA */
          <PracticeAreaDetailView
            area={activeArea}
            allAreas={practiceAreas}
            teamMembers={teamMembers}
            onBack={handleBackToPracticeAreas}
            onSelectArea={handleSelectPracticeArea}
            onSelectMember={handleSelectMember}
            onRequestConsultation={(areaTitle) => handleOpenConsultation(null, areaTitle)}
          />
        ) : currentTab === 'courses' && activeCourse ? (
          /* 3. DEDICATED FULL-PAGE COURSE */
          <CourseDetailView
            course={activeCourse}
            instructor={teamMembers.find(
              (m) =>
                m.id === activeCourse.instructorId ||
                m.name.toLowerCase() === activeCourse.instructorName.toLowerCase()
            )}
            onBack={handleBackToCourses}
            onSelectInstructor={handleSelectMember}
          />
        ) : currentTab === 'blogs' && activePost ? (
          /* 4. DEDICATED FULL-PAGE BLOG TREATISE */
          <BlogDetailView
            post={activePost}
            allPosts={blogPosts}
            authorMember={teamMembers.find(
              (m) =>
                m.id === activePost.authorId ||
                m.name.toLowerCase() === activePost.authorName.toLowerCase()
            )}
            onBack={handleBackToBlogs}
            onSelectPost={handleSelectPost}
            onSelectAuthor={handleSelectMember}
          />
        ) : (
          /* 5. TOP-LEVEL PAGES */
          <>
            {currentTab === 'home' && (
              <HomeView
                featuredTeam={featuredTeam.length > 0 ? featuredTeam : teamMembers.slice(0, 4)}
                practiceAreas={practiceAreas}
                courses={courses}
                recentPosts={blogPosts}
                onSelectMember={handleSelectMember}
                onSelectPracticeArea={handleSelectPracticeArea}
                onSelectCourse={handleSelectCourse}
                onSelectPost={handleSelectPost}
                onRequestConsultation={() => handleOpenConsultation(null, null)}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'about' && (
              <AboutView
                onNavigate={handleNavigate}
                onRequestConsultation={() => handleOpenConsultation(null, null)}
              />
            )}

            {currentTab === 'team' && (
              <TeamView
                members={teamMembers}
                practiceAreas={practiceAreas}
                onSelectMember={handleSelectMember}
                onRequestConsultation={() => handleOpenConsultation(null, null)}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'practice-areas' && (
              <PracticeAreasView
                practiceAreas={practiceAreas}
                teamMembers={teamMembers}
                onSelectArea={handleSelectPracticeArea}
                onSelectMember={handleSelectMember}
                onRequestConsultation={(areaTitle) => handleOpenConsultation(null, areaTitle)}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'courses' && (
              <CoursesView
                courses={courses}
                teamMembers={teamMembers}
                onSelectCourse={handleSelectCourse}
                onSelectMember={handleSelectMember}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'blogs' && (
              <BlogsView
                posts={blogPosts}
                teamMembers={teamMembers}
                onSelectPost={handleSelectPost}
                onSelectAuthor={handleSelectMember}
              />
            )}

            {currentTab === 'contact' && (
              <ContactView
                practiceAreas={practiceAreas}
                teamMembers={teamMembers}
              />
            )}

            {currentTab === 'client-portal' && (
              <ClientPortalView
                matters={matters}
                teamMembers={teamMembers}
                onSelectMember={handleSelectMember}
                onRequestConsultation={() => handleOpenConsultation(null, null)}
              />
            )}

            {currentTab === 'admin' && (
              <AdminDashboard
                teamMembers={teamMembers}
                practiceAreas={practiceAreas}
                courses={courses}
                matters={matters}
                onDataChanged={loadData}
                onPreviewMember={handleSelectMember}
                onNavigateHome={() => handleNavigate('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Institutional Website Footer */}
      {currentTab !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onRequestConsultation={() => handleOpenConsultation(null, null)}
        />
      )}

      {/* Global Consultation Scheduler Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialAdvocate={consultationAdvocate}
        initialPracticeArea={consultationArea}
        practiceAreas={practiceAreas}
        teamMembers={teamMembers.filter((m) => m.isPublished && !m.isArchived)}
      />
    </div>
  );
}
