import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Award, GraduationCap, ArrowRight, CheckCircle2, 
  Lightbulb, Users, Globe, BookOpen, Rocket 
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

const cohorts = [
  {
    name: 'Tanvir Hossain',
    track: 'Quantum Algorithm Optimization',
    institution: 'BAUST, Computer Science',
    achievement: 'Co-authored JAIR paper on surface code error mitigation',
    mentor: 'Prof. Sarah Lin',
    year: '2026 Fellow',
  },
  {
    name: 'Nusrat Jahan',
    track: 'Phytopathology Vision AI',
    institution: 'Dhaka University, Dept. of Botany',
    achievement: 'Lead dataset developer for FlowerDoctorBD (250k images)',
    mentor: 'Dr. Marcus Vance',
    year: '2026 Fellow',
  },
  {
    name: 'Arif Chowdhury',
    track: 'Autonomous SCADA Defense',
    institution: 'BUET, Electrical & Electronic Eng.',
    achievement: 'Won Global CyberDef Challenge; developed CyberShield microgrid testbed',
    mentor: 'Dr. Elena Rostova',
    year: '2025 Fellow',
  },
  {
    name: 'Farhana Kabir',
    track: 'Clinical NLP & Medical Telemetry',
    institution: 'DMC / BAUST Joint Bio-Informatics',
    achievement: 'Developed ECG automated anomaly detection pipeline in MyHeart',
    mentor: 'Dr. Marcus Vance',
    year: '2026 Fellow',
  },
];

export const YoungScientists: React.FC = () => {
  useDocumentTitle('Young Scientist Programme | AIRIC Institute');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Header */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TALENT ACCELERATOR & FELLOWSHIPS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Young Scientist Programme
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Nurturing collegiate innovators, undergraduate researchers, and doctoral fellows through direct mentorship with world-class faculty, compute clusters, and seed prototyping grants.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/collaborate">
              <Button variant="cyan" size="md">
                Apply for 2027 Cohort <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="md" className="bg-slate-800/80 border-slate-700 text-slate-300">
                Explore Mentors Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Fellowship Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
            <GraduationCap className="w-8 h-8 text-cyan-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Faculty Mentorship</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Every young scientist is paired with a Principal Investigator and research engineer throughout their study.
            </p>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
            <Rocket className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Prototyping & GPU Compute</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Dedicated access to AIRIC high-performance compute clusters, wet labs, and rapid fabrication facilities.
            </p>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
            <BookOpen className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Peer-Reviewed Publishing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Targeted guidance to publish first-author papers in JAIR, JAIRIC, IEEE, and top-tier scientific venues.
            </p>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
            <Award className="w-8 h-8 text-emerald-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Venture Spinout Runway</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Direct pipeline from research thesis to institutional startup incubation and angel syndicate funding.
            </p>
          </Card>
        </div>

        {/* Featured Young Scientists */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Young Scientists & Fellows
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Collegiate innovators currently leading breakthroughs across our 10 divisions.
              </p>
            </div>
            <Badge variant="cyan">Cohort 2026</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cohorts.map((fellow, i) => (
              <Card key={i} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      {fellow.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-bold">
                      {fellow.year}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 block mb-2">
                    {fellow.track} • {fellow.institution}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {fellow.achievement}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Mentor: <strong className="text-slate-700 dark:text-slate-300">{fellow.mentor}</strong></span>
                  <Link to="/collaborate" className="text-cyan-600 hover:underline flex items-center gap-0.5 font-medium">
                    Nominate a Fellow <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
