import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Download, Copy, User, GraduationCap, ClipboardCheck } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { Application } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    type: string;
    role: string;
  } | null;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, initialData }) => {
  const [step, setStep] = useState(1);
  const [generatedId, setGeneratedId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    college: '',
    degree: '',
    year: '',
    status: 'Student',
    mode: 'Online',
    startDate: '',
    source: 'Website',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setGeneratedId('');
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid Email is required';
      if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Valid 10-digit Phone is required';
    }

    if (currentStep === 2) {
      if (formData.status === 'Student' && !formData.college.trim()) newErrors.college = 'College Name is required';
      if (!formData.startDate) newErrors.startDate = 'Preferred Start Date is required';
    }

    if (currentStep === 3) {
      if (!formData.reason.trim()) newErrors.reason = 'Please tell us why you are interested.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const generateAppId = (type: string) => {
    const prefixMap: Record<string, string> = {
      'Internship': 'INT',
      'Job': 'JOB',
      'Course': 'CRS',
      'Workshop': 'WS',
      'Service': 'SVC'
    };
    const prefix = prefixMap[type] || 'APP';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `WISE-${prefix}-${date}-${rand}`;
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;

    const type = initialData?.type || 'Internship';
    const newId = generateAppId(type);
    setGeneratedId(newId);

    const newApp: Application = {
      id: newId,
      type: type as any,
      role: initialData?.role || 'General',
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date: new Date().toLocaleDateString(),
      status: 'Submitted'
    };

    const existingApps = JSON.parse(localStorage.getItem('wisecrew_apps') || '[]');
    localStorage.setItem('wisecrew_apps', JSON.stringify([newApp, ...existingApps]));

    setStep(4);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    alert('Application ID Copied!');
  };

  const downloadSummary = () => {
    const content = `
WISECREW SOLUTIONS APPLICATION SUMMARY
--------------------------------------
Application ID: ${generatedId}
Date: ${new Date().toLocaleDateString()}
Role: ${initialData?.role}
Type: ${initialData?.type}

APPLICANT DETAILS
-----------------
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}

EDUCATION / BACKGROUND
----------------------
Status: ${formData.status}
College: ${formData.college}
Degree: ${formData.degree}
Mode: ${formData.mode}
Start Date: ${formData.startDate}

REASON
------
${formData.reason}

--------------------------------------
Thank you for applying to Wisecrew Solutions.
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Wisecrew_App_${generatedId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* 
        Modal Container 
        - Max Height 90vh
        - Flex Column for Sticky Header/Footer
        - Centered
      */}
      <GlassCard className="w-full max-w-4xl relative z-10 flex flex-col max-h-[90vh] !p-0 shadow-2xl animate-in zoom-in-95 duration-300 rounded-2xl border bg-[var(--bg-secondary)]/95 md:bg-[var(--glass-bg)]">
        
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex flex-col border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 backdrop-blur-md rounded-t-2xl">
            <div className="flex items-center justify-between p-5 md:p-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">Application Portal</h2>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 truncate max-w-[200px] md:max-w-none">
                    Applying for: <span className="text-[var(--primary)] font-bold">{initialData?.role}</span>
                    </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors">
                    <X size={24} className="text-[var(--text-secondary)]" />
                </button>
            </div>

            {/* Step Indicator (Pinned to Header) */}
            {step < 4 && (
                <div className="px-5 md:px-6 pb-4 md:pb-6">
                    <div className="flex items-center justify-between mb-2">
                        {['Personal', 'Education', 'Review'].map((label, idx) => (
                        <div key={idx} className={`text-xs font-bold uppercase tracking-wider ${step > idx ? 'text-[var(--primary)]' : step === idx + 1 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-50'}`}>
                            Step {idx + 1}: {label}
                        </div>
                        ))}
                    </div>
                    <div className="w-full h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[var(--primary)] transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
            
            {step === 1 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <User size={20} className="text-[var(--primary)]" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name <span className="text-red-500">*</span></label>
                        <input name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full bg-[var(--bg-primary)] border ${errors.fullName ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]`} placeholder="John Doe" />
                        {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                    </div>
                     <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Email Address <span className="text-red-500">*</span></label>
                      <input name="email" value={formData.email} onChange={handleChange} className={`w-full bg-[var(--bg-primary)] border ${errors.email ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]`} placeholder="john@example.com" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Phone Number <span className="text-red-500">*</span></label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-[var(--bg-primary)] border ${errors.phone ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]`} placeholder="10-digit number" />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">WhatsApp (Optional)</label>
                      <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]" placeholder="Same as phone?" />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">City & State</label>
                      <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]" placeholder="e.g. Chennai, Tamil Nadu" />
                   </div>
                </div>
             </div>
            )}

            {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <GraduationCap size={20} className="text-[var(--primary)]" /> Education & Background
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Current Status</label>
                      <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]">
                         <option value="Student">Student</option>
                         <option value="Fresher">Fresher / Graduate</option>
                         <option value="Working Professional">Working Professional</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">College / Company <span className="text-red-500">*</span></label>
                      <input name="college" value={formData.college} onChange={handleChange} className={`w-full bg-[var(--bg-primary)] border ${errors.college ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]`} placeholder="Institute Name" />
                      {errors.college && <p className="text-xs text-red-500">{errors.college}</p>}
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Degree / Designation</label>
                      <input name="degree" value={formData.degree} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]" placeholder="e.g. B.Tech CSE" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Year / Experience</label>
                      <select name="year" value={formData.year} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]">
                         <option value="">Select...</option>
                         <option value="1st Year">1st Year</option>
                         <option value="2nd Year">2nd Year</option>
                         <option value="3rd Year">3rd Year</option>
                         <option value="4th Year">4th Year</option>
                         <option value="Graduated">Graduated</option>
                         <option value="Experienced">Experienced</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Preferred Mode</label>
                      <select name="mode" value={formData.mode} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]">
                         <option value="Online">Online</option>
                         <option value="Offline">Offline</option>
                         <option value="Hybrid">Hybrid</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Preferred Start Date <span className="text-red-500">*</span></label>
                      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={`w-full bg-[var(--bg-primary)] border ${errors.startDate ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] [color-scheme:dark]`} />
                      {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
                   </div>
                </div>
             </div>
          )}

           {step === 3 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <ClipboardCheck size={20} className="text-[var(--primary)]" /> Program Details & Review
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="md:col-span-2 space-y-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-[var(--text-secondary)]">Why are you interested? <span className="text-red-500">*</span></label>
                         <textarea name="reason" value={formData.reason} onChange={handleChange} rows={4} className={`w-full bg-[var(--bg-primary)] border ${errors.reason ? 'border-red-500' : 'border-[var(--glass-border)]'} rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] resize-none`} placeholder="Briefly explain your motivation..." />
                         {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-[var(--text-secondary)]">How did you hear about us?</label>
                         <select name="source" value={formData.source} onChange={handleChange} className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]">
                            <option value="Website">Website</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Friend">Friend / Referral</option>
                            <option value="College">College</option>
                         </select>
                      </div>
                   </div>

                   {/* Summary Card */}
                   <div className="md:col-span-1">
                      <div className="bg-[var(--glass-border)] rounded-xl p-4 space-y-3 border border-[var(--glass-border)]">
                         <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">Summary</h4>
                         <div className="space-y-1">
                            <p className="text-xs text-[var(--text-secondary)]">Name</p>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{formData.fullName}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-[var(--text-secondary)]">Role</p>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{initialData?.role}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-[var(--text-secondary)]">Email</p>
                            <p className="text-sm font-medium text-[var(--text-primary)] break-all">{formData.email}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-[var(--text-secondary)]">Phone</p>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{formData.phone}</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {step === 4 && (
             <div className="flex flex-col items-center justify-center text-center py-8 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/40 animate-bounce">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Application Submitted! 🎉</h2>
                <p className="text-[var(--text-secondary)] max-w-md mb-8">
                   Your application has been received. Our team will review your profile and contact you shortly via email or WhatsApp.
                </p>

                <div className="bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl p-6 w-full max-w-md mb-8 relative group">
                   <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2">Application ID</p>
                   <div className="text-2xl font-mono font-bold text-[var(--primary)] tracking-wider">{generatedId}</div>
                   <button 
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--glass-bg)] transition-colors"
                      title="Copy ID"
                   >
                      <Copy size={16} />
                   </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                   <button 
                      onClick={downloadSummary}
                      className="flex-1 py-3 px-4 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-border)] transition-colors flex items-center justify-center gap-2 font-medium"
                   >
                      <Download size={18} /> Download Summary
                   </button>
                   <button 
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 transition-colors font-bold shadow-lg shadow-cyan-500/20"
                   >
                      Close & Explore More
                   </button>
                </div>
             </div>
          )}

        </div>

        {/* Fixed Footer Buttons */}
        {step < 4 && (
          <div className="flex-shrink-0 p-4 md:p-6 border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 backdrop-blur-md flex justify-between items-center z-20 rounded-b-2xl">
            <button 
               onClick={handleBack}
               disabled={step === 1}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)]'}`}
            >
               <ChevronLeft size={18} /> Back
            </button>

            {step < 3 ? (
               <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-fg)] font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all transform hover:translate-x-1"
               >
                  Next Step <ChevronRight size={18} />
               </button>
            ) : (
               <button 
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-500/30 hover:opacity-90 transition-all transform hover:scale-105"
               >
                  Submit Application <CheckCircle2 size={18} />
               </button>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default ApplicationModal;