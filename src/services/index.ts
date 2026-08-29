import { mockResearchAreas } from '../data/researchAreas';
import { mockResearchers } from '../data/researchers';
import { mockProjects } from '../data/projects';
import { mockPublications } from '../data/publications';
import { mockNews } from '../data/news';
import { mockEvents } from '../data/events';
import { mockOpportunities } from '../data/opportunities';
import { mockResources } from '../data/resources';
import { mockPartners } from '../data/partners';
import { mockStats } from '../data/statistics';
import { mockApplications, mockCollaborations } from '../data/applications';
import { 
  ResearchArea, Researcher, Project, Publication, 
  NewsArticle, EventItem, Opportunity, Application, 
  ResourceItem, Partner, Collaboration, User 
} from '../types';

const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL as string) || '/api/v1';

// Helper for backend requests with automatic fallback
async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const token = localStorage.getItem('airc_access_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Graceful fallback to client-side data
  }
  return fallbackData;
}

export const researchService = {
  getAreas: async (): Promise<ResearchArea[]> => {
    return fetchWithFallback<ResearchArea[]>('/research-areas', [...mockResearchAreas]);
  },
  getAreaBySlug: async (slug: string): Promise<ResearchArea | undefined> => {
    const areas = await fetchWithFallback<ResearchArea[]>('/research-areas', [...mockResearchAreas]);
    return areas.find(a => a.slug === slug || a.id === slug);
  },
  getResearchers: async (): Promise<Researcher[]> => {
    return fetchWithFallback<Researcher[]>('/researchers', [...mockResearchers]);
  },
  getResearcherBySlug: async (slug: string): Promise<Researcher | undefined> => {
    const list = await fetchWithFallback<Researcher[]>('/researchers', [...mockResearchers]);
    return list.find(r => r.slug === slug || r.id === slug);
  },
  getProjects: async (): Promise<Project[]> => {
    return fetchWithFallback<Project[]>('/projects', [...mockProjects]);
  },
  getProjectBySlug: async (slug: string): Promise<Project | undefined> => {
    const list = await fetchWithFallback<Project[]>('/projects', [...mockProjects]);
    return list.find(p => p.slug === slug || p.id === slug);
  },
  getPublications: async (): Promise<Publication[]> => {
    return fetchWithFallback<Publication[]>('/publications', [...mockPublications]);
  },
  getPublicationBySlug: async (slug: string): Promise<Publication | undefined> => {
    const list = await fetchWithFallback<Publication[]>('/publications', [...mockPublications]);
    return list.find(p => p.slug === slug || p.id === slug);
  },
  getNews: async (): Promise<NewsArticle[]> => {
    return fetchWithFallback<NewsArticle[]>('/news', [...mockNews]);
  },
  getNewsBySlug: async (slug: string): Promise<NewsArticle | undefined> => {
    const list = await fetchWithFallback<NewsArticle[]>('/news', [...mockNews]);
    return list.find(n => n.slug === slug || n.id === slug);
  },
  getEvents: async (): Promise<EventItem[]> => {
    return fetchWithFallback<EventItem[]>('/events', [...mockEvents]);
  },
  getEventBySlug: async (slug: string): Promise<EventItem | undefined> => {
    const list = await fetchWithFallback<EventItem[]>('/events', [...mockEvents]);
    return list.find(e => e.slug === slug || e.id === slug);
  },
  getOpportunities: async (): Promise<Opportunity[]> => {
    return fetchWithFallback<Opportunity[]>('/opportunities', [...mockOpportunities]);
  },
  getOpportunityBySlug: async (slug: string): Promise<Opportunity | undefined> => {
    const list = await fetchWithFallback<Opportunity[]>('/opportunities', [...mockOpportunities]);
    return list.find(o => o.slug === slug || o.id === slug);
  },
  getResources: async (): Promise<ResourceItem[]> => {
    return fetchWithFallback<ResourceItem[]>('/resources', [...mockResources]);
  },
  getPartners: async (): Promise<Partner[]> => {
    return fetchWithFallback<Partner[]>('/partners', [...mockPartners]);
  },
  getStats: async () => {
    return fetchWithFallback('/analytics/overview', { ...mockStats });
  },
  submitCollaboration: async (data: Partial<Collaboration>): Promise<{ success: boolean; id: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collaborations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        return { success: true, id: result.id };
      }
    } catch {
      // Fallback
    }
    const newId = `collab-${Date.now()}`;
    mockCollaborations.unshift({
      id: newId,
      organization: data.organization || 'Anonymous Org',
      contactPerson: data.contactPerson || 'Contact Person',
      email: data.email || 'contact@org.com',
      organizationType: data.organizationType || 'Industry',
      researchAreaId: data.researchAreaId || 'ai-core',
      collaborationType: data.collaborationType || 'Joint Research',
      proposalSummary: data.proposalSummary || '',
      status: 'Submitted',
      submittedDate: new Date().toISOString().split('T')[0],
    });
    return { success: true, id: newId };
  },
  submitApplication: async (data: Partial<Application>): Promise<{ success: boolean; id: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        return { success: true, id: result.id };
      }
    } catch {
      // Fallback
    }
    const newId = `app-${Date.now()}`;
    mockApplications.unshift({
      id: newId,
      opportunityId: data.opportunityId || 'opp-general',
      opportunityTitle: data.opportunityTitle || 'General Research Track',
      applicantName: data.applicantName || 'Applicant',
      applicantEmail: data.applicantEmail || 'applicant@example.edu',
      applicantPhone: data.applicantPhone || '',
      currentInstitution: data.currentInstitution || 'Academic Institution',
      degreeLevel: data.degreeLevel || 'B.S.',
      statementOfPurpose: data.statementOfPurpose || '',
      status: 'Submitted',
      submittedDate: new Date().toISOString().split('T')[0],
    });
    return { success: true, id: newId };
  },
  getApplications: async (): Promise<Application[]> => {
    return fetchWithFallback<Application[]>('/applications', [...mockApplications]);
  },
  getCollaborations: async (): Promise<Collaboration[]> => {
    return fetchWithFallback<Collaboration[]>('/collaborations', [...mockCollaborations]);
  }
};
