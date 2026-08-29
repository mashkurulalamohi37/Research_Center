import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Briefcase, Calendar, Clock, DollarSign, MapPin, 
  ArrowLeft, CheckCircle2, FileText, Upload, Sparkles, Send, Check 
} from 'lucide-react';
import { mockOpportunities } from '../../data/opportunities';
import { mockResearchers } from '../../data/researchers';
import { researchService } from '../../services';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const OpportunityDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    currentInstitution: '',
    degreeLevel: 'Ph.D. Candidate',
    gpa: '',
    statementOfPurpose: '',
  });

  const { success, error } = useToast();

  const opp = mockOpportunities.find(o => o.slug === slug || o.id === slug) || mockOpportunities[0];
  const supervisor = mockResearchers.find(r => r.id === opp.supervisorId);

  useDocumentTitle(`${opp.title} — Fellowships & Careers`);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 25MB
    if (file.size > 25 * 1024 * 1024) {
      error('File Size Exceeded', 'The attached file exceeds the 25MB size limit.');
      e.target.value = '';
      setCvFileName(null);
      return;
    }

    // Check format
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExtension) {
      error('Invalid File Type', 'Please attach a valid PDF or Word (.docx) document.');
      e.target.value = '';
      setCvFileName(null);
      return;
    }

    setCvFileName(file.name);
    success('Dossier Attached', `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.applicantEmail || !formData.statementOfPurpose) {
      error('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.applicantEmail)) {
      error('Invalid Email', 'Please provide a valid institutional email address.');
      return;
    }

    if (formData.statementOfPurpose.trim().length < 15) {
      error('Statement Too Short', 'Please enter at least 15 characters for your statement.');
      return;
    }

    setIsSubmitting(true);
    try {
      await researchService.submitApplication({
        opportunityId: opp.id,
        opportunityTitle: opp.title,
        ...formData,
      });
      setIsSubmitting(false);
      setApplyModalOpen(false);
      success('Application Submitted Successfully', `Your application for "${opp.title}" has been registered. Reference: APP-${Date.now().toString().slice(-4)}`);
      setFormData({
        applicantName: '',
        applicantEmail: '',
        applicantPhone: '',
        currentInstitution: '',
        degreeLevel: 'Ph.D. Candidate',
        gpa: '',
        statementOfPurpose: '',
      });
      setCvFileName(null);
    } catch {
      setIsSubmitting(false);
      error('Submission Error', 'Failed to transmit application. Please try again.');
    }
  };

  return (
    <div className="py-10 space-y-12">
      {/* Top Back Nav */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunities & Fellowships
        </Link>
      </div>

      {/* Main Header Banner */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan">{opp.type}</Badge>
            <Badge variant={opp.status === 'Open' ? 'success' : 'secondary'}>{opp.status}</Badge>
            <span className="text-xs text-emerald-400 font-mono font-semibold">Deadline: {opp.deadline}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-snug">
            {opp.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Location</span>
                <strong className="text-slate-200">{opp.location}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Duration</span>
                <strong className="text-slate-200">{opp.duration}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Compensation / Grant</span>
                <strong className="text-emerald-400">{opp.stipend || 'Competitive'}</strong>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            {supervisor && (
              <span className="text-xs text-slate-400">
                Primary Mentor: <Link to={`/researchers/${supervisor.slug}`} className="text-cyan-400 font-semibold hover:underline">{supervisor.name}</Link>
              </span>
            )}
            <Button variant="cyan" size="lg" onClick={() => setApplyModalOpen(true)}>
              Apply for this Position
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-8">
        {/* Overview */}
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Position Overview</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {opp.overview}
          </p>
        </Card>

        {/* Eligibility */}
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Eligibility Criteria</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {opp.eligibility.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Dossier & Application Requirements</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {opp.requirements.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Responsibilities */}
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Core Responsibilities</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {opp.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Application Process */}
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Evaluation & Selection Process</h3>
          <div className="space-y-3">
            {opp.applicationProcess.map((step, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  {i + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-200">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Interactive Application Modal Dialog */}
      <Dialog
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title="Submit Research Application"
        description={`Application for ${opp.title}`}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmitApplication} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name *</label>
              <Input
                required
                value={formData.applicantName}
                onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                placeholder="e.g. Dr. Julian Richter"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
              <Input
                type="email"
                required
                value={formData.applicantEmail}
                onChange={e => setFormData({ ...formData, applicantEmail: e.target.value })}
                placeholder="j.richter@university.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
              <Input
                value={formData.applicantPhone}
                onChange={e => setFormData({ ...formData, applicantPhone: e.target.value })}
                placeholder="+1 (555) 019-2834"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Current Institution *</label>
              <Input
                required
                value={formData.currentInstitution}
                onChange={e => setFormData({ ...formData, currentInstitution: e.target.value })}
                placeholder="e.g. Oxford / MIT"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Degree Level *</label>
              <Select
                value={formData.degreeLevel}
                onChange={e => setFormData({ ...formData, degreeLevel: e.target.value })}
              >
                <option value="Ph.D. Graduate">Ph.D. Graduate</option>
                <option value="Ph.D. Candidate">Ph.D. Candidate</option>
                <option value="Master's Student">Master's Student</option>
                <option value="Undergraduate">Undergraduate</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Statement of Purpose & Research Alignment (Brief) *
            </label>
            <Textarea
              required
              rows={4}
              value={formData.statementOfPurpose}
              onChange={e => setFormData({ ...formData, statementOfPurpose: e.target.value })}
              placeholder="Outline your research background, technical skills, and why your interests align with AIRC..."
            />
          </div>

          {/* Validated File Upload */}
          <div className="relative p-5 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 text-center space-y-2 hover:border-cyan-500/40 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {cvFileName ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs">
                <Check className="w-4 h-4" />
                <span>{cvFileName}</span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-cyan-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-200">Click or Drag & Drop Curriculum Vitae & Publications</p>
                <p className="text-[11px] text-slate-500">PDF, DOC, DOCX up to 25MB</p>
              </>
            )}
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit" isLoading={isSubmitting}>
              <Send className="w-3.5 h-3.5 mr-1" /> Submit Application
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
