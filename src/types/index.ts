export type Role = 'guest' | 'researcher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  title?: string;
  department?: string;
}

export interface ResearchArea {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  leadResearcherId: string;
  publicationCount: number;
  projectCount: number;
  technologies: string[];
  objectives: string[];
  achievements: string[];
  heroImage: string;
  parentAreaId?: string;
}

export interface Researcher {
  id: string;
  slug: string;
  name: string;
  title: string; // e.g. "Director & Chief Scientist", "Principal Investigator", "Senior Postdoctoral Fellow"
  category: 'faculty' | 'postdoc' | 'student' | 'visiting';
  department: string;
  email: string;
  phone?: string;
  office: string;
  avatar: string;
  bio: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  researchAreaIds: string[];
  expertise: string[];
  interests: string[];
  googleScholar?: string;
  orcid?: string;
  linkedin?: string;
  researchGate?: string;
  github?: string;
  hIndex: number;
  citations: number;
  featured: boolean;
  status: 'active' | 'on-leave' | 'alumni';
  joinDate: string;
}

export type ProjectStatus = 'Ongoing' | 'Completed' | 'Proposed';

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  problemStatement: string;
  methodology: string;
  outcomes: string[];
  researchAreaId: string;
  leadResearcherId: string;
  teamMemberIds: string[];
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  fundingBody: string;
  fundingAmount?: string;
  image: string;
  technologies: string[];
  featured: boolean;
  publicationsIds: string[];
  githubUrl?: string;
  demoUrl?: string;
  deliverables?: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export type PublicationType = 'Journal' | 'Conference' | 'Book Chapter' | 'Workshop' | 'Preprint' | 'Technical Report';
export type PublicationStatus = 'Published' | 'Pending Review' | 'Draft' | 'Rejected';

export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  authorIds?: string[];
  venue: string; // e.g. "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)", "NeurIPS 2025"
  year: number;
  month?: string;
  type: PublicationType;
  researchAreaId: string;
  abstract: string;
  keywords: string[];
  doi?: string;
  pdfUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  citations: number;
  featured: boolean;
  status: PublicationStatus;
  submittedDate?: string;
  publisher?: string;
  pages?: string;
  volume?: string;
  issue?: string;
}

export type NewsCategory = 'Research' | 'Publication' | 'Award' | 'Conference' | 'Workshop' | 'Seminar' | 'Collaboration' | 'Announcement';
export type ContentStatus = 'Draft' | 'Review' | 'Published' | 'Archived';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  coverImage: string;
  author: string;
  authorRole?: string;
  publishDate: string;
  featured: boolean;
  status: ContentStatus;
  tags: string[];
  relatedProjectIds?: string[];
  relatedResearcherIds?: string[];
}

export type EventType = 'Symposium' | 'Seminar' | 'Workshop' | 'Conference' | 'Distinguished Lecture' | 'Hackathon';

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: EventType;
  speaker: {
    name: string;
    title: string;
    affiliation: string;
    avatar?: string;
  };
  organizer: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  posterImage?: string;
  registrationOpen: boolean;
  capacity?: number;
  registeredCount: number;
  featured: boolean;
  agenda?: {
    time: string;
    activity: string;
    speaker?: string;
  }[];
}

export type OpportunityType = 'Research Assistant' | 'Internship' | 'Undergraduate Research' | 'Graduate Research' | 'Thesis' | 'Fellowship' | 'Visiting Researcher';

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  type: OpportunityType;
  researchAreaId: string;
  supervisorId: string;
  location: string;
  duration: string;
  stipend?: string;
  deadline: string;
  status: 'Open' | 'Closed' | 'Under Review';
  overview: string;
  eligibility: string[];
  requirements: string[];
  responsibilities: string[];
  applicationProcess: string[];
  featured: boolean;
  postedDate: string;
}

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  currentInstitution: string;
  degreeLevel: string;
  gpa?: string;
  statementOfPurpose: string;
  resumeUrl?: string;
  status: ApplicationStatus;
  submittedDate: string;
  notes?: string;
}

export type ResourceCategory = 'Research Papers' | 'Datasets' | 'Code' | 'Models' | 'Tutorials' | 'Research Guidelines' | 'Reports' | 'Presentations';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  researchAreaId?: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  accessLevel: 'Public' | 'Academic' | 'Internal';
  downloadsCount: number;
  addedDate: string;
  author: string;
}

export type PartnerType = 'Universities' | 'Research Institutions' | 'Industry' | 'Technology Partners';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logo: string;
  website: string;
  description: string;
  collaborationAreas: string[];
  jointProjectsCount: number;
  country: string;
  featured: boolean;
}

export type CollaborationType = 'Joint Research' | 'Industry Collaboration' | 'Sponsored Research' | 'Dataset Collaboration' | 'Technology Transfer' | 'Student Research' | 'Academic Collaboration';
export type CollaborationStatus = 'Submitted' | 'Under Review' | 'In Discussion' | 'Approved' | 'Declined';

export interface Collaboration {
  id: string;
  organization: string;
  contactPerson: string;
  email: string;
  organizationType: string;
  researchAreaId: string;
  collaborationType: CollaborationType;
  proposalSummary: string;
  status: CollaborationStatus;
  submittedDate: string;
  assignedResearcherId?: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'review';
  date: string;
  read: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details: string;
}
