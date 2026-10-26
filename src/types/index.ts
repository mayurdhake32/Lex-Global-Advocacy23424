export type Department = 
  | 'Dispute Resolution & Arbitration'
  | 'Corporate & Cross-Border M&A'
  | 'Maritime & Admiralty'
  | 'Technology, IP & Regulatory'
  | 'Appellate & Constitutional Advocacy'
  | 'Legal Research & Academics';

export type TeamRole = 
  | 'Managing Partner'
  | 'Senior Advocate'
  | 'Associate Advocate'
  | 'Legal Consultant'
  | 'Legal Researcher'
  | 'Paralegal';

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  department: Department;
  role: TeamRole;
  qualifications: string[];
  barEnrollment: string;
  practiceAreas: string[];
  languages: string[];
  biography: string;
  yearsOfExperience: number;
  milestones: string[];
  publications: string[];
  email: string;
  linkedin?: string;
  officeLocation: string;
  imageUrl: string;
  altText: string;
  order: number;
  isFeatured: boolean;
  isPublished: boolean;
  isArchived: boolean;
  notableCases?: string[];
  updatedAt: string;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullScope: string[];
  leadAdvocateNames: string[];
  regulatoryBodies: string[];
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: 'Foundational' | 'Advanced' | 'Executive Masterclass';
  duration: string;
  instructorId: string;
  instructorName: string;
  instructorDesignation: string;
  description: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  quiz: QuizQuestion[];
  cleCredits: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  authorId: string;
  authorName: string;
  authorDesignation: string;
  authorImageUrl: string;
  publishedDate: string;
  readingTime: string;
  citations: string[];
}

export interface ConsultationBooking {
  id: string;
  referenceCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientOrganization?: string;
  practiceAreaId: string;
  practiceAreaTitle: string;
  advocateId?: string;
  advocateName?: string;
  consultationType: 'In-Person Chambers' | 'Encrypted Video Conference' | 'Written Legal Advisory';
  preferredDate: string;
  preferredTimeSlot: string;
  caseBrief: string;
  isUrgent: boolean;
  status: 'Pending Review' | 'Scheduled' | 'Advisory In Progress' | 'Concluded';
  submittedAt: string;
}

export interface ClientMatter {
  id: string;
  matterNumber: string;
  title: string;
  practiceArea: string;
  leadAdvocateName: string;
  clientName: string;
  filingCourt: string;
  status: 'Pre-Trial Briefing' | 'Arbitration Hearing' | 'Regulatory Review' | 'Judgment Reserved';
  nextFilingDeadline: string;
  summary: string;
  confidentialDocuments: {
    title: string;
    filingDate: string;
    size: string;
  }[];
}
