import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sectors from './components/Sectors';
import Services from './components/Services';
import Internships from './components/Internships';
import Roadmap from './components/Roadmap';
import Careers from './components/Careers';
import ApplyForm from './components/ApplyForm';
import Courses from './components/Courses';
import Products from './components/Products';
import Awards from './components/Awards';
import Testimonials from './components/Testimonials';
import Workshops from './components/Workshops';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';
import BackgroundAnimation from './components/ui/BackgroundAnimation';
import Ecosystem from './components/Ecosystem';
import CEOSection from './components/CEOSection';
import WisecrewBot from './components/WisecrewBot';
import { X, MessageCircle, ArrowUp, Briefcase } from 'lucide-react';
import ApplicationModal from './components/ApplicationModal';
import CursorAnimation from './components/ui/CursorAnimation';
import Milestones from './components/Milestones';
import CyberPreloader from './components/ui/CyberPreloader';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BranchDetails from './components/BranchDetails';
import PhoneShowcase from './components/PhoneShowcase';
import Appointment from './components/Appointment';

// Views
import AcademyView from './components/views/AcademyView';
import ProductsView from './components/views/ProductsView';
import ServicesView from './components/views/ServicesView';
import CareerView from './components/views/CareerView';
import PublicationsView from './components/views/PublicationsView';

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  // View State Management
  const [currentView, setCurrentView] = useState<'home' | 'academy' | 'products' | 'services' | 'career' | 'publications'>('home');

  // Application Modal State
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [appModalData, setAppModalData] = useState<{ type: string; role: string } | null>(null);

  // Note: The timer logic is now handled inside CyberPreloader to ensure animation completes
  // We use the onComplete callback to switch states

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
    scrollToTop();
  };

  const handleApply = (role: string, type: string) => {
    setAppModalData({ role, type });
    setIsAppModalOpen(true);
  };

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  // View Switching Logic
  const renderContent = () => {
    switch(currentView) {
      case 'academy': 
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <AcademyView onBack={() => handleNavigate('home')} />
             <div className="bg-[var(--bg-primary)]">
               <Internships onApply={handleApply} />
               <Courses onApply={handleApply} />
               <Roadmap />
               <Workshops />
               <ApplyForm />
               <CEOSection />
               <ContactFooter />
             </div>
          </div>
        );
      case 'products': 
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <ProductsView onBack={() => handleNavigate('home')} />
             <div className="bg-[var(--bg-primary)]">
               <Products />
               <FAQ />
               <CEOSection />
               <ContactFooter />
             </div>
          </div>
        );
      case 'services': 
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <ServicesView onBack={() => handleNavigate('home')} />
             <div className="bg-[var(--bg-primary)]">
               <Services />
               <Testimonials />
               <Awards />
               <ApplyForm />
               <CEOSection />
               <ContactFooter />
             </div>
          </div>
        );
      case 'publications':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PublicationsView onBack={() => handleNavigate('home')} />
            <div className="bg-[var(--bg-primary)]">
              <CEOSection />
              <ContactFooter />
            </div>
          </div>
        );
      case 'career': 
        return <CareerView onBack={() => handleNavigate('home')} />;
      default: // Home
        return (
          <>
             <Hero onApply={handleApply} />
             <Sectors />
             <div id="ecosystem" className="py-20">
                <Ecosystem onNavigate={handleNavigate} />
             </div>
             <BranchDetails />
             <Milestones />
             <PhoneShowcase />
             <Appointment onApply={handleApply} />
             <CEOSection />
             <ContactFooter />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen antialiased selection:bg-[var(--primary)] selection:text-[var(--primary-fg)] transition-colors duration-500 relative cursor-default`}>
      
      {/* High-Tech Preloader */}
      {loading && <CyberPreloader onComplete={handlePreloaderComplete} />}

      <BackgroundAnimation />
      <CursorAnimation />
      
      <ApplicationModal 
        isOpen={isAppModalOpen} 
        onClose={() => setIsAppModalOpen(false)} 
        initialData={appModalData}
      />

      {/* Global Header Elements */}
      {currentView === 'home' && !loading && (
        <>
          {showAnnouncement && (
            <div className="fixed top-0 left-0 w-full z-[100] h-10 bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-100 text-xs font-semibold px-4 flex items-center justify-center border-b border-white/5 animate-in slide-in-from-top duration-500">
              <span className="flex-grow text-center truncate pr-8 md:pr-0">
                ✨ Launching Wisecrew AI Academy - <button onClick={() => { handleNavigate('academy'); }} className="underline ml-1 hover:text-white">Join Waitlist</button>
              </span>
              <button onClick={() => setShowAnnouncement(false)} className="absolute right-4 hover:bg-white/10 rounded p-1">
                <X size={14}/>
              </button>
            </div>
          )}
          
          <Navbar 
            toggleTheme={toggleTheme} 
            isDarkMode={isDarkMode} 
            onApply={() => handleApply('Demo Request', 'Service')}
            isBannerVisible={showAnnouncement}
            onNavigate={handleNavigate}
          />
          
          {/* Main Bot for Home Page */}
          <WisecrewBot />
          
          {/* Floating WhatsApp Button */}
          <FloatingWhatsApp />
        </>
      )}

      {/* Main Content Router */}
      <main className={`flex flex-col w-full overflow-hidden transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;