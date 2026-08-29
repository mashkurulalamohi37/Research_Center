import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Atom } from 'lucide-react';

// Layouts
import { Layout } from './components/layout/Layout';
import { ResearcherLayout } from './components/layout/ResearcherLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ResearcherRoute, AdminRoute } from './components/auth/ProtectedRoute';

// Loading Placeholder
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse">
      <Atom className="w-6 h-6 text-cyan-400 animate-spin" />
    </div>
    <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">Loading AIRC Node...</span>
  </div>
);

// Lazy Loaded Public Pages
const Home = lazy(() => import('./pages/public/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/public/About').then(m => ({ default: m.About })));
const Research = lazy(() => import('./pages/public/Research').then(m => ({ default: m.Research })));
const ResearchAreaDetail = lazy(() => import('./pages/public/ResearchAreaDetail').then(m => ({ default: m.ResearchAreaDetail })));
const Researchers = lazy(() => import('./pages/public/Researchers').then(m => ({ default: m.Researchers })));
const ResearcherProfile = lazy(() => import('./pages/public/ResearcherProfile').then(m => ({ default: m.ResearcherProfile })));
const Projects = lazy(() => import('./pages/public/Projects').then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/public/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Publications = lazy(() => import('./pages/public/Publications').then(m => ({ default: m.Publications })));
const PublicationDetail = lazy(() => import('./pages/public/PublicationDetail').then(m => ({ default: m.PublicationDetail })));
const News = lazy(() => import('./pages/public/News').then(m => ({ default: m.News })));
const NewsDetail = lazy(() => import('./pages/public/NewsDetail').then(m => ({ default: m.NewsDetail })));
const Events = lazy(() => import('./pages/public/Events').then(m => ({ default: m.Events })));
const EventDetail = lazy(() => import('./pages/public/EventDetail').then(m => ({ default: m.EventDetail })));
const Opportunities = lazy(() => import('./pages/public/Opportunities').then(m => ({ default: m.Opportunities })));
const OpportunityDetail = lazy(() => import('./pages/public/OpportunityDetail').then(m => ({ default: m.OpportunityDetail })));
const Resources = lazy(() => import('./pages/public/Resources').then(m => ({ default: m.Resources })));
const Partners = lazy(() => import('./pages/public/Partners').then(m => ({ default: m.Partners })));
const Collaborate = lazy(() => import('./pages/public/Collaborate').then(m => ({ default: m.Collaborate })));
const Contact = lazy(() => import('./pages/public/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/public/NotFound').then(m => ({ default: m.NotFound })));

// Lazy Loaded Auth Pages
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));

// Lazy Loaded Researcher Portal Pages
const DashboardOverview = lazy(() => import('./pages/researcher/DashboardOverview').then(m => ({ default: m.DashboardOverview })));
const ResearcherProfileEdit = lazy(() => import('./pages/researcher/ResearcherProfileEdit').then(m => ({ default: m.ResearcherProfileEdit })));
const MyPublications = lazy(() => import('./pages/researcher/MyPublications').then(m => ({ default: m.MyPublications })));
const MyProjects = lazy(() => import('./pages/researcher/MyProjects').then(m => ({ default: m.MyProjects })));
const MyStudents = lazy(() => import('./pages/researcher/MyStudents').then(m => ({ default: m.MyStudents })));
const ResearchActivities = lazy(() => import('./pages/researcher/ResearchActivities').then(m => ({ default: m.ResearchActivities })));
const LabResources = lazy(() => import('./pages/researcher/LabResources').then(m => ({ default: m.LabResources })));
const ResearcherNotifications = lazy(() => import('./pages/researcher/ResearcherNotifications').then(m => ({ default: m.ResearcherNotifications })));
const ResearcherSettings = lazy(() => import('./pages/researcher/ResearcherSettings').then(m => ({ default: m.ResearcherSettings })));

// Lazy Loaded Admin Portal Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminResearchers = lazy(() => import('./pages/admin/AdminResearchers').then(m => ({ default: m.AdminResearchers })));
const AdminResearchAreas = lazy(() => import('./pages/admin/AdminResearchAreas').then(m => ({ default: m.AdminResearchAreas })));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects').then(m => ({ default: m.AdminProjects })));
const AdminPublications = lazy(() => import('./pages/admin/AdminPublications').then(m => ({ default: m.AdminPublications })));
const AdminNews = lazy(() => import('./pages/admin/AdminNews').then(m => ({ default: m.AdminNews })));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents').then(m => ({ default: m.AdminEvents })));
const AdminOpportunities = lazy(() => import('./pages/admin/AdminOpportunities').then(m => ({ default: m.AdminOpportunities })));
const AdminApplications = lazy(() => import('./pages/admin/AdminApplications').then(m => ({ default: m.AdminApplications })));
const AdminCollaborations = lazy(() => import('./pages/admin/AdminCollaborations').then(m => ({ default: m.AdminCollaborations })));
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia').then(m => ({ default: m.AdminMedia })));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })));
const AdminAuditLogs = lazy(() => import('./pages/admin/AdminAuditLogs').then(m => ({ default: m.AdminAuditLogs })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));

export const App: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. PUBLIC INSTITUTE PORTAL */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="research" element={<Research />} />
          <Route path="research/:slug" element={<ResearchAreaDetail />} />
          <Route path="researchers" element={<Researchers />} />
          <Route path="researchers/:slug" element={<ResearcherProfile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="publications" element={<Publications />} />
          <Route path="publications/:slug" element={<PublicationDetail />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="opportunities/:slug" element={<OpportunityDetail />} />
          <Route path="resources" element={<Resources />} />
          <Route path="partners" element={<Partners />} />
          <Route path="collaborate" element={<Collaborate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 2. RESEARCHER PORTAL */}
        <Route
          path="/dashboard"
          element={
            <ResearcherRoute>
              <ResearcherLayout />
            </ResearcherRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<ResearcherProfileEdit />} />
          <Route path="publications" element={<MyPublications />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="students" element={<MyStudents />} />
          <Route path="activities" element={<ResearchActivities />} />
          <Route path="resources" element={<LabResources />} />
          <Route path="notifications" element={<ResearcherNotifications />} />
          <Route path="settings" element={<ResearcherSettings />} />
        </Route>

        {/* 3. INSTITUTE ADMIN PORTAL */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminResearchers />} />
          <Route path="researchers" element={<AdminResearchers />} />
          <Route path="students" element={<AdminResearchers />} />
          <Route path="research-areas" element={<AdminResearchAreas />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="opportunities" element={<AdminOpportunities />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="collaborations" element={<AdminCollaborations />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
