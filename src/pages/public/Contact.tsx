import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Sparkles, Building2, Clock, CheckCircle2 
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Contact: React.FC = () => {
  useDocumentTitle('Contact & Campus Directory');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Inquiries',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      error('Missing Information', 'Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      error('Invalid Email Format', 'Please enter a valid institutional email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      error('Message Too Short', 'Please provide at least 10 characters in your message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      success('Message Dispatched', `Thank you ${formData.name}. Your inquiry has been routed to the ${formData.department}.`);
      setFormData({
        name: '',
        email: '',
        department: 'General Inquiries',
        subject: '',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Institutional Communications
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Contact AIRC
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Connect with our academic administration, research laboratories, fellowship coordinators, or media relations team.
        </p>
      </section>

      {/* Main Grid: Directory & Contact Form */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Department Directory & Campus Location */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">Main Campus Headquarters</h3>
                  <p className="text-xs text-slate-400">Turing Hall & High-Bay Robotics Wing</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>450 Innovation Parkway, Cambridge Research Park, MA 02142, USA</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>+1 (617) 890-2100 (Administrative Mainline)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>contact@airc.research.edu</span>
                </p>
              </div>
            </Card>

            {/* Specialized Inboxes */}
            <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Direct Department Contacts
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">Admissions & Fellowships</div>
                    <div className="text-slate-500">fellowships@airc.research.edu</div>
                  </div>
                  <Badge variant="outline">Recruitment</Badge>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">Office of Sponsored Research</div>
                    <div className="text-slate-500">grants@airc.research.edu</div>
                  </div>
                  <Badge variant="cyan">Alliances</Badge>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">Press & Scientific Communications</div>
                    <div className="text-slate-500">media@airc.research.edu</div>
                  </div>
                  <Badge variant="outline">Press</Badge>
                </div>
              </div>
            </Card>

            {/* Simulated Campus Map View */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="AIRC Campus Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-navy-950/40 flex items-center justify-center">
                <div className="p-3 rounded-2xl bg-navy-950/90 border border-cyan-500/40 text-center backdrop-blur-md">
                  <MapPin className="w-5 h-5 text-cyan-400 mx-auto mb-1 animate-bounce" />
                  <div className="text-xs font-bold text-slate-100">AIRC Turing Pavilion</div>
                  <div className="text-[10px] text-cyan-300 font-mono">Cambridge Innovation Quad</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Inquiry Dispatched</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting AIRC. A member of our administration will review and respond to your inquiry shortly.
                  </p>
                  <div className="pt-4">
                    <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1 pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-slate-100">Send an Inquiry</h3>
                    <p className="text-xs text-slate-400">
                      Fill out the form below to reach the appropriate laboratory or office.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Maya Lin"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="m.lin@university.edu"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Target Department</label>
                      <Select
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="General Inquiries">General Inquiries</option>
                        <option value="Admissions & Fellowships">Admissions & Fellowships</option>
                        <option value="Office of Sponsored Research">Office of Sponsored Research</option>
                        <option value="Visual Intelligence Lab">Visual Intelligence Lab</option>
                        <option value="AI Foundations Lab">AI Foundations Lab</option>
                        <option value="Robotics Institute">Robotics Institute</option>
                        <option value="Media & Press Office">Media & Press Office</option>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                      <Input
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Research Seminar Inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Message Body *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your detailed inquiry or question here..."
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <Button variant="cyan" size="lg" type="submit" isLoading={isSubmitting}>
                      <Send className="w-4 h-4 mr-1.5" /> Transmit Message
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
