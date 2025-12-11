import React from 'react';
import { COURSES } from '../constants';
import GlassCard from './ui/GlassCard';
import { BookOpen, Clock, Check, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import SectionDivider from './ui/SectionDivider';

interface CoursesProps {
  onApply: (role: string, type: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onApply }) => {
  return (
    <section id="courses" className="py-24 relative bg-[var(--glass-bg)]">
      <SectionDivider position="top" variant="curve" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Popular Courses</h2>
                <p className="text-[var(--text-secondary)] text-lg">Master the latest technologies with our expert-led courses.</p>
             </div>
             <button onClick={() => onApply('All Courses', 'Course')} className="hidden md:block text-[var(--primary)] hover:text-white font-medium transition-colors border-b border-[var(--primary)] pb-1">View All Courses &rarr;</button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {COURSES.map((course, idx) => (
             <Reveal key={course.id} delay={idx * 100} className="h-full" width="100%">
               <GlassCard className="p-0 overflow-hidden group hover:shadow-cyan-500/20 h-full flex flex-col hover:border-[var(--primary)]">
                  {/* Image & Overlay */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                     <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
                     <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                     {course.level && (
                       <div className="absolute bottom-4 left-4 z-20">
                          <span className="px-3 py-1 bg-[var(--primary)] text-[var(--primary-fg)] text-xs font-bold rounded-full">{course.level}</span>
                       </div>
                     )}
                     
                     {/* Hover Feature List Overlay */}
                     <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm p-6">
                        <ul className="space-y-2">
                           {course.features?.filter(f => f && f.trim()).map((feat, i) => (
                             <li key={i} className="flex items-center text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                               <Check size={16} className="text-[var(--primary)] mr-2" /> {feat}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                     <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">{course.title}</h3>
                     
                     <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
                        <span className="flex items-center gap-1"><Clock size={16} className="text-[var(--primary)]"/> {course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen size={16} className="text-[var(--primary)]"/> Syllabus</span>
                     </div>

                     <button 
                        onClick={() => onApply(course.title, 'Course')}
                        className="group relative mt-auto w-full py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] hover:border-transparent text-[var(--text-primary)] font-medium transition-all shadow-lg overflow-hidden"
                     >
                       <span className="relative z-10">Course Details</span>
                       <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                     </button>
                  </div>
               </GlassCard>
             </Reveal>
           ))}
        </div>
        
        <div className="text-center mt-8 md:hidden">
           <button onClick={() => onApply('All Courses', 'Course')} className="text-[var(--primary)] font-medium">View All Courses &rarr;</button>
        </div>
      </div>
    </section>
  );
};

export default Courses;