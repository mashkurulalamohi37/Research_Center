import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Globe, 
  Github, Linkedin, BookOpen, Save, Sparkles, Upload 
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const ResearcherProfileEdit: React.FC = () => {
  const researcher = mockResearchers[1]; // Dr. Marcus Vance

  const [formData, setFormData] = useState({
    name: researcher.name,
    title: researcher.title,
    department: researcher.department,
    email: researcher.email,
    phone: researcher.phone || '+1 (415) 890-2104',
    office: researcher.office,
    bio: researcher.bio,
    googleScholar: researcher.googleScholar || 'https://scholar.google.com',
    orcid: researcher.orcid || '0000-0003-4912-7718',
    linkedin: researcher.linkedin || 'https://linkedin.com',
    github: researcher.github || 'https://github.com',
  });

  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success('Faculty Profile Updated', 'Public researcher directory information has been synchronized.');
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Researcher Profile Management
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Update public biography, scholarly identifiers, and laboratory contact information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Photo & Basic Info */}
        <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-6">
          <h3 className="text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Identity & Official Designation
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={researcher.avatar}
                alt={formData.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-cyan-500/40 shadow-xl"
              />
              <button
                type="button"
                className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-cyan-500 text-navy-950 shadow-md hover:bg-cyan-400 transition-colors"
                title="Upload Photo"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Title / Designation</label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
              <Input
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Office / Lab Suite</label>
              <Input
                value={formData.office}
                onChange={e => setFormData({ ...formData, office: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Academic Bio */}
        <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Scholarly Biography
          </h3>
          <Textarea
            rows={5}
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Write your research summary..."
          />
        </Card>

        {/* Scholarly Identifiers */}
        <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-6">
          <h3 className="text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Scholarly & External Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Google Scholar URL</label>
              <Input
                value={formData.googleScholar}
                onChange={e => setFormData({ ...formData, googleScholar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">ORCID ID</label>
              <Input
                value={formData.orcid}
                onChange={e => setFormData({ ...formData, orcid: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Profile</label>
              <Input
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">LinkedIn URL</label>
              <Input
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="cyan" size="lg" type="submit" isLoading={isSaving}>
            <Save className="w-4 h-4 mr-1.5" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
