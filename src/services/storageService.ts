import { TeamMember, Course, BlogPost, ClientMatter, ConsultationBooking } from '../types';
import {
  INITIAL_TEAM_MEMBERS,
  INITIAL_COURSES,
  INITIAL_BLOG_POSTS,
  INITIAL_CLIENT_MATTERS,
} from '../data/initialData';
import { validateTeamMember } from '../utils/filterUtils';

const STORAGE_KEYS = {
  TEAM_MEMBERS: 'lex_global_team_v1',
  COURSES: 'lex_global_courses_v1',
  BLOGS: 'lex_global_blogs_v1',
  MATTERS: 'lex_global_matters_v1',
  CONSULTATIONS: 'lex_global_consultations_v1',
  ADMIN_AUTH: 'lex_global_admin_session',
};

// Available verified portrait presets for new additions
export const PORTRAIT_PRESETS = [
  {
    url: '/src/assets/images/portrait_elena_vance_1793026040571.jpg',
    label: 'Senior Managing Advocate Portrait (Elena Vance)',
    roleHint: 'Managing Partner / Senior Silk',
  },
  {
    url: '/src/assets/images/portrait_marcus_sterling_1793026077880.jpg',
    label: 'Senior Admiralty Counsel Portrait (Marcus Sterling)',
    roleHint: 'Senior Advocate / Admiralty',
  },
  {
    url: '/src/assets/images/portrait_tariq_almansoor_1793026078955.jpg',
    label: 'Arbitration Counsel Portrait (Tariq Al-Mansoor)',
    roleHint: 'Senior Counsel / Dispute Resolution',
  },
  {
    url: '/src/assets/images/portrait_amara_chen_1793026077073.jpg',
    label: 'Corporate Partner Portrait (Amara Chen)',
    roleHint: 'Associate Advocate / Corporate M&A',
  },
  {
    url: '/src/assets/images/portrait_sophia_reyes_1793026078307.jpg',
    label: 'Technology & IP Consultant Portrait (Sofia Hernandez)',
    roleHint: 'Legal Consultant / IP Governance',
  },
  {
    url: '/src/assets/images/hero_lex_global_1793026042044.jpg',
    label: 'Chambers Research Scholar / Moot Hall Setting',
    roleHint: 'Researcher / Academic Fellow',
  },
];

class StorageService {
  // ---- TEAM MEMBERS ----

  getTeamMembers(): TeamMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS);
      if (!data) {
        this.saveTeamMembersList(INITIAL_TEAM_MEMBERS);
        return INITIAL_TEAM_MEMBERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  }

  getPublishedTeamMembers(): TeamMember[] {
    return this.getTeamMembers().filter((m) => m.isPublished && !m.isArchived);
  }

  getTeamMemberBySlug(slug: string): TeamMember | undefined {
    return this.getTeamMembers().find((m) => m.slug === slug);
  }

  saveTeamMember(memberData: Partial<TeamMember>): { success: boolean; errors?: Record<string, string>; member?: TeamMember } {
    const validation = validateTeamMember(memberData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const currentList = this.getTeamMembers();
    const existingIndex = currentList.findIndex((m) => m.id === memberData.id);

    const slug =
      memberData.slug ||
      memberData.name!
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const completeMember: TeamMember = {
      id: memberData.id || `team-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug,
      name: memberData.name!.trim(),
      designation: memberData.designation!.trim(),
      department: memberData.department!,
      role: memberData.role!,
      qualifications: memberData.qualifications || [],
      barEnrollment: memberData.barEnrollment!.trim(),
      practiceAreas: memberData.practiceAreas || [],
      languages: memberData.languages || ['English'],
      biography: memberData.biography!.trim(),
      yearsOfExperience: Number(memberData.yearsOfExperience) || 0,
      milestones: memberData.milestones || [],
      publications: memberData.publications || [],
      email: memberData.email!.trim(),
      linkedin: memberData.linkedin?.trim(),
      officeLocation: memberData.officeLocation?.trim() || 'London Chambers',
      imageUrl: memberData.imageUrl || PORTRAIT_PRESETS[0].url,
      altText: memberData.altText?.trim() || `Professional portrait of ${memberData.name}`,
      order: memberData.order ?? (existingIndex >= 0 ? currentList[existingIndex].order : currentList.length + 1),
      isFeatured: Boolean(memberData.isFeatured),
      isPublished: memberData.isPublished !== undefined ? memberData.isPublished : true,
      isArchived: Boolean(memberData.isArchived),
      notableCases: memberData.notableCases || [],
      updatedAt: new Date().toISOString(),
    };

    let updatedList: TeamMember[];
    if (existingIndex >= 0) {
      updatedList = [...currentList];
      updatedList[existingIndex] = completeMember;
    } else {
      updatedList = [...currentList, completeMember];
    }

    this.saveTeamMembersList(updatedList);
    return { success: true, member: completeMember };
  }

  togglePublishMember(id: string): boolean {
    const list = this.getTeamMembers();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    list[idx].isPublished = !list[idx].isPublished;
    list[idx].updatedAt = new Date().toISOString();
    this.saveTeamMembersList(list);
    return true;
  }

  toggleFeaturedMember(id: string): boolean {
    const list = this.getTeamMembers();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    list[idx].isFeatured = !list[idx].isFeatured;
    list[idx].updatedAt = new Date().toISOString();
    this.saveTeamMembersList(list);
    return true;
  }

  archiveMember(id: string): boolean {
    const list = this.getTeamMembers();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    list[idx].isArchived = true;
    list[idx].isPublished = false;
    list[idx].updatedAt = new Date().toISOString();
    this.saveTeamMembersList(list);
    return true;
  }

  deleteMember(id: string): boolean {
    const list = this.getTeamMembers();
    const updated = list.filter((m) => m.id !== id);
    this.saveTeamMembersList(updated);
    return true;
  }

  reorderMembers(orderedIds: string[]): void {
    const list = this.getTeamMembers();
    const map = new Map(list.map((m) => [m.id, m]));
    const updated: TeamMember[] = [];
    
    orderedIds.forEach((id, index) => {
      const member = map.get(id);
      if (member) {
        member.order = index + 1;
        updated.push(member);
        map.delete(id);
      }
    });

    // Append any unmentioned members
    map.forEach((member) => {
      member.order = updated.length + 1;
      updated.push(member);
    });

    this.saveTeamMembersList(updated);
  }

  resetTeamToDefaults(): TeamMember[] {
    this.saveTeamMembersList(INITIAL_TEAM_MEMBERS);
    return INITIAL_TEAM_MEMBERS;
  }

  private saveTeamMembersList(members: TeamMember[]): void {
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
  }

  // ---- COURSES ----

  getCourses(): Course[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
        return INITIAL_COURSES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COURSES;
    }
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.getCourses().find((c) => c.slug === slug);
  }

  // ---- BLOG POSTS ----

  getBlogPosts(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(INITIAL_BLOG_POSTS));
        return INITIAL_BLOG_POSTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find((b) => b.slug === slug);
  }

  // ---- CLIENT MATTERS ----

  getClientMatters(): ClientMatter[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATTERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MATTERS, JSON.stringify(INITIAL_CLIENT_MATTERS));
        return INITIAL_CLIENT_MATTERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CLIENT_MATTERS;
    }
  }

  // ---- CONSULTATIONS ----

  getConsultations(): ConsultationBooking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveConsultation(booking: Omit<ConsultationBooking, 'id' | 'referenceCode' | 'status' | 'submittedAt'>): ConsultationBooking {
    const current = this.getConsultations();
    const referenceCode = `LEX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: ConsultationBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      referenceCode,
      status: 'Pending Review',
      submittedAt: new Date().toISOString(),
    };
    const updated = [newBooking, ...current];
    localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(updated));
    return newBooking;
  }

  updateConsultationStatus(id: string, status: ConsultationBooking['status']): void {
    const list = this.getConsultations();
    const idx = list.findIndex((b) => b.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(list));
    }
  }

  // ---- ADMIN AUTHENTICATION STATE ----

  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  }

  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }
}

export const storageService = new StorageService();
