export interface InstitutionalStats {
  publicationsCount: number;
  publicationsDisplay: string;
  projectsCount: number;
  projectsDisplay: string;
  researchersCount: number;
  researchersDisplay: string;
  researchAreasCount: number;
  researchAreasDisplay: string;
  collaborationsCount: number;
  collaborationsDisplay: string;
  grantsAmount: string;
  citationsTotal: string;
  patentsGranted: number;
}

export const mockStats: InstitutionalStats = {
  publicationsCount: 154,
  publicationsDisplay: '150+',
  projectsCount: 32,
  projectsDisplay: '30+',
  researchersCount: 28,
  researchersDisplay: '25+',
  researchAreasCount: 8,
  researchAreasDisplay: '8 Core',
  collaborationsCount: 24,
  collaborationsDisplay: '20+',
  grantsAmount: '$18.5M+',
  citationsTotal: '48,000+',
  patentsGranted: 14,
};
