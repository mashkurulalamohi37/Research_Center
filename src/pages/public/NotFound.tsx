import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, ArrowLeft, Search, Compass, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black text-slate-800 font-mono tracking-tighter select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Atom className="w-16 h-16 text-cyan-400 animate-spin-slow" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Academic Coordinate Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The requested research publication, project record, or portal page does not exist in the AIRC Institute directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="cyan" size="md" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Institute Home
            </Button>
          </Link>
          <Link to="/research" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <Compass className="w-4 h-4 mr-1.5" /> Explore Research
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
