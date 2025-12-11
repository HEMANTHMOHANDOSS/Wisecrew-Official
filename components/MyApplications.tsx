import React, { useEffect, useState } from 'react';
import { X, Briefcase, Calendar, Hash } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { Application } from '../types';

interface MyApplicationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyApplications: React.FC<MyApplicationsProps> = ({ isOpen, onClose }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const stored = localStorage.getItem('wisecrew_apps');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <GlassCard className="w-full max-w-2xl relative z-10 flex flex-col max-h-[85vh] !p-0 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]/50">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">My Applications</h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors">
            <X size={24} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {applications.length === 0 ? (
             <div className="text-center py-12">
                <div className="w-16 h-16 bg-[var(--glass-border)] rounded-full flex items-center justify-center mx-auto mb-4">
                   <Briefcase size={32} className="text-[var(--text-secondary)] opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Applications Yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">You haven't applied for any positions yet.</p>
                <button onClick={onClose} className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-fg)] font-bold hover:opacity-90 transition-all">
                   Browse Opportunities
                </button>
             </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-4 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <h4 className="font-bold text-[var(--text-primary)] text-lg mb-1">{app.role}</h4>
                      <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
                         <span className="flex items-center gap-1"><Hash size={14}/> {app.id}</span>
                         <span className="flex items-center gap-1"><Briefcase size={14}/> {app.type}</span>
                         <span className="flex items-center gap-1"><Calendar size={14}/> {app.date}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        {app.status}
                      </span>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default MyApplications;