import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building2, GraduationCap, Laptop, Sparkles, ArrowRight, Handshake } from 'lucide-react';
import { mockPartners } from '../../data/partners';
import { PartnerType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

export const Partners: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredPartners = mockPartners.filter(p => {
    return selectedType === 'all' || p.type === selectedType;
  });

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Institutional Consortia
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Global Academic & Industrial Alliances
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          AIRC operates through extensive collaborative partnerships with premier universities, international research institutes, teaching hospitals, and technology enterprises.
        </p>

        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {['all', 'Universities', 'Research Institutions', 'Industry', 'Technology Partners'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Partners' : type}
            </button>
          ))}
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPartners.map(partner => (
            <Card
              key={partner.id}
              className="p-6 rounded-2xl border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700 p-0.5 bg-slate-950"
                  />
                  <Badge variant="cyan">{partner.type}</Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {partner.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">{partner.country}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                    Joint Research Tracks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.collaborationAreas.map(area => (
                      <span key={area} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-medium">
                  {partner.jointProjectsCount} Joint Grants
                </span>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-semibold"
                >
                  Visit <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Alliance CTA */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <div className="p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-slate-900 shadow-2xl space-y-4">
          <Handshake className="w-10 h-10 text-cyan-400 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Establish a Research Partnership
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            We actively negotiate sponsored research agreements, compute cluster sharing, and joint doctoral co-advising.
          </p>
          <div className="pt-2">
            <Link to="/collaborate">
              <Button variant="cyan" size="lg">
                Submit Partnership Proposal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
