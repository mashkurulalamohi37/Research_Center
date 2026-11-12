import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Send
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { CollaborationType } from '../../types';
import { researchService } from '../../services';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Collaborate: React.FC = () => {
  useDocumentTitle('Partner with IRICC — Strategic Alliances & Commercialization');
  const [formData, setFormData] = useState({
    contactPerson: '',
    organization: '',
    email: '',
    organizationType: 'Industry Enterprise',
    researchAreaId: 'ai-core',
    collaborationType: 'Joint Research' as CollaborationType,
    proposalSummary: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { success, error } = useToast();

  const collaborationTypes: { type: CollaborationType; desc: string }[] = [
    { type: 'Joint Research', desc: 'Co-develop foundational neural algorithms and commercial prototypes with faculty.' },
    { type: 'Industry Collaboration', desc: 'Sponsor dedicated research tracks with direct IP licensing and commercialization options.' },
    { type: 'Sponsored Research', desc: 'Fund doctoral fellowships, compute clusters, or commercial laboratory testbeds.' },
    { type: 'Dataset Collaboration', desc: 'Share high-value clinical, robotic, or telemetry datasets securely.' },
    { type: 'Technology Transfer', desc: 'License patents, 3D perception algorithms, and deep-tech architectures.' },
    { type: 'Student Research', desc: 'Co-mentor Ph.D. scholars and venture fellowship interns.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactPerson || !formData.organization || !formData.email || !formData.proposalSummary) {
      error('Required Fields Missing', 'Please fill in all required proposal details.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      error('Invalid Email Format', 'Please enter a valid institutional or corporate email address.');
      return;
    }

    if (formData.proposalSummary.trim().length < 15) {
      error('Proposal Too Short', 'Please provide at least 15 characters in your proposal summary.');
      return;
    }

    setIsSubmitting(true);
    try {
      await researchService.submitCollaboration(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      success('Collaboration Proposal Received', 'The IRICC Office of Commercialization & Technology Transfer has assigned an intake reference ID.');
    } catch {
      setIsSubmitting(false);
      error('Submission Error', 'Failed to transmit proposal. Please try again.');
    }
  };

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Strategic Partnerships & Commercialization
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Collaborate With <span className="text-gradient-cyan">IRICC</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Partner with our principal investigators, faculty, and venture fellows to pioneer breakthroughs in science, intellectual property, and global commercialization.
        </p>
      </section>

      {/* Collaboration Modes Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborationTypes.map((item, i) => (
            <Card key={i} className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 shadow-xs hover:shadow-md transition-all space-y-2">
              <Badge variant="cyan">{item.type}</Badge>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Proposal Form Section */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Card className="p-8 sm:p-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl backdrop-blur-xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Proposal Submitted Successfully</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to IRICC. A designated representative from the Office of Commercialization & Technology Transfer will review your inquiry within 3 business days.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                  Submit Another Proposal
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Initiate Collaboration Intake</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Submit your institutional, venture, or academic partnership concept for expedited review.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Contact Lead *</label>
                  <Input
                    required
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Dr. Jordan Lee"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Corporate or University Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="j.lee@enterprise.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Organization Name *</label>
                  <Input
                    required
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Siemens Healthineers / Stanford Bio"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Organization Type</label>
                  <Select
                    value={formData.organizationType}
                    onChange={e => setFormData({ ...formData, organizationType: e.target.value })}
                  >
                    <option value="Industry Enterprise">Industry Enterprise</option>
                    <option value="Venture & Startup">Venture & Startup</option>
                    <option value="Academic Institute">Academic Institute</option>
                    <option value="Government Agency">Government Agency</option>
                    <option value="Philanthropic Foundation">Philanthropic Foundation</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Research Domain</label>
                  <Select
                    value={formData.researchAreaId}
                    onChange={e => setFormData({ ...formData, researchAreaId: e.target.value })}
                  >
                    {mockResearchAreas.map(a => (
                      <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Mode of Collaboration</label>
                  <Select
                    value={formData.collaborationType}
                    onChange={e => setFormData({ ...formData, collaborationType: e.target.value as CollaborationType })}
                  >
                    {collaborationTypes.map(c => (
                      <option key={c.type} value={c.type}>{c.type}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Executive Proposal Summary *
                </label>
                <Textarea
                  required
                  rows={5}
                  value={formData.proposalSummary}
                  onChange={e => setFormData({ ...formData, proposalSummary: e.target.value })}
                  placeholder="Summarize the collaboration objectives, technical scope, commercialization angle, and expected duration..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <Button variant="cyan" size="lg" type="submit" isLoading={isSubmitting}>
                  <Send className="w-4 h-4 mr-1.5" /> Submit Collaboration Proposal
                </Button>
              </div>
            </form>
          )}
        </Card>
      </section>
    </div>
  );
};
