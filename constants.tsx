
import { 
  Code, Laptop, Server, Smartphone, Monitor, Database, 
  Users, Award, BookOpen, UserPlus, Briefcase, GraduationCap,
  Globe, ShieldCheck, Cpu, Layout, PenTool, Calendar, Video
} from "lucide-react";
import { Service, Internship, Job, Course, Product, Awardee, Testimonial, FAQItem, Stat, NavItem, Workshop } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
];

export const SERVICES: Service[] = [
  { id: '1', title: 'Website Development', description: 'Responsive, high-performance websites built with modern technologies like React and Next.js.', icon: Globe },
  { id: '2', title: 'Digital Marketing', description: 'Strategic SEO, SMO, and content marketing to boost your online presence and leads.', icon: Layout},
  { id: '3', title: 'Mobile App Dev', description: 'Cross-platform mobile applications using Flutter and React Native for iOS and Android.', icon: Smartphone },
  { id: '4', title: 'Lead Generation', description: 'Targeted strategies to acquire high-quality leads for your business growth.', icon: UserPlus },
  { id: '5', title: 'Placement Training', description: 'Comprehensive technical and soft-skill training to get students industry-ready.', icon: GraduationCap },
  { id: '6', title: 'Digital Business Cards', description: 'Modern, shareable digital identities for professionals and businesses.', icon: ShieldCheck },
];

export const INTERNSHIPS: Internship[] = [
  { id: '1', title: 'Python Development', type: 'Free', duration: '1-3 Months', mode: 'Online', description: 'Learn Python basics to advanced frameworks like Django/Flask.' },
  { id: '2', title: 'Web Development (PHP)', type: 'Paid', duration: '3 Months', mode: 'Offline', description: 'Full stack development with PHP, MySQL, and Modern JS.' },
  { id: '3', title: 'IoT Solutions', type: 'Paid', duration: '2 Months', mode: 'Offline', description: 'Hands-on training with Arduino, Raspberry Pi and Sensors.' },
  { id: '4', title: 'Node.js Backend', type: 'Free', duration: '2 Months', mode: 'Online', description: 'Build scalable APIs and microservices with Node.js.' },
  { id: '5', title: 'Java Programming', type: 'Paid', duration: '3 Months', mode: 'Online', description: 'Core Java to Enterprise Java applications.' },
];

export const JOBS: Job[] = [
  { 
    id: '1', title: 'Frontend Developer (React)', type: 'Internship', location: 'Remote', 
    description: 'We are looking for a passionate Frontend Developer intern to build modern UI components using React and Tailwind CSS.',
    tags: ['Development', 'React', 'Frontend'],
    perks: 'Certificate, Mentorship, LOR', 
    responsibilities: ['Build reusable UI components', 'Integrate RESTful APIs', 'Debug and fix UI issues', 'Ensure mobile responsiveness'] 
  },
  { 
    id: '2', title: 'Backend Developer (Node.js)', type: 'Internship', location: 'Hybrid', 
    description: 'Join our backend team to design and optimize scalable APIs and database architectures.',
    tags: ['Development', 'Backend', 'Database'],
    perks: 'Certificate, Live Projects, Networking', 
    responsibilities: ['Design database schemas', 'Create robust API endpoints', 'Manage server deployment', 'Optimize query performance'] 
  },
  { 
    id: '3', title: 'Mobile App Dev (Flutter)', type: 'Internship', location: 'Remote', 
    description: 'Help us build cross-platform mobile applications for iOS and Android using Flutter.',
    tags: ['Development', 'Mobile', 'Dart'],
    perks: 'Certificate, Flexible hours, Remote Work', 
    responsibilities: ['Develop cross-platform apps', 'Implement pixel-perfect UIs', 'Manage app state efficiently', 'Integrate backend services'] 
  },
  { 
    id: '4', title: 'UI/UX Designer (Figma)', type: 'Internship', location: 'Remote', 
    description: 'Creative designer needed to craft intuitive user experiences and beautiful interfaces.',
    tags: ['Design', 'Creative', 'Figma'],
    perks: 'Certificate, Portfolio building, Workshops', 
    responsibilities: ['Create wireframes & prototypes', 'Conduct user research', 'Design mobile & web interfaces', 'Maintain design systems'] 
  },
  { 
    id: '5', title: 'Marketing Intern', type: 'Internship', location: 'On-site', 
    description: 'Energetic intern required to handle social media campaigns and digital outreach.',
    tags: ['Marketing', 'Social Media'],
    perks: 'Performance Incentives, Certificate', 
    responsibilities: ['Manage social media handles', 'Create engaging content', 'Analyze campaign metrics', 'Coordinate with design team'] 
  },
  { 
    id: '6', title: 'Gen AI Intern', type: 'Internship', location: 'Remote', 
    description: 'Explore the cutting edge of AI with research and implementation of LLM-based solutions.',
    tags: ['AI', 'Research', 'Python'],
    perks: 'Access to premium AI tools, Mentorship', 
    responsibilities: ['Prompt engineering & testing', 'Integrate LLM APIs', 'Research RAG techniques', 'Build AI-powered prototypes'] 
  },
];

export const COURSES: Course[] = [
  { id: '1', title: 'Full Stack Web Dev', level: 'Beginner', duration: '6 Months', image: 'https://picsum.photos/400/250?random=1', features: ['MERN Stack', 'Real Projects', 'Placement Support'] },
  { id: '2', title: 'Python Masterclass', level: 'Intermediate', duration: '3 Months', image: 'https://picsum.photos/400/250?random=2', features: ['Data Analysis', 'Automation', 'Django'] },
  { id: '3', title: 'Flutter App Dev', level: 'Intermediate', duration: '4 Months', image: 'https://picsum.photos/400/250?random=3', features: ['iOS & Android', 'State Mgmt', 'Firebase'] },
  { id: '4', title: 'Data Science Basics', level: 'Advanced', duration: '5 Months', image: 'https://picsum.photos/400/250?random=4', features: ['Pandas/NumPy', 'Visualization', 'ML Basics'] },
  { id: '5', title: 'Digital Marketing', level: 'Beginner', duration: '2 Months', image: 'https://picsum.photos/400/250?random=5', features: ['SEO/SEM', 'Social Media', 'Analytics'] },
  { id: '6', title: 'Java Programming', level: 'Beginner', duration: '4 Months', image: 'https://picsum.photos/400/250?random=6', features: ['Core Java', 'OOPs', 'Collections'] },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Inventory Manager', category: 'Business', description: 'Track stock levels and orders in real-time.' },
  { id: '2', name: 'Smart HRMS', category: 'HR', description: 'Employee attendance, payroll, and performance tracking.' },
  { id: '3', name: 'Campus Connect', category: 'Education', description: 'Complete college management ERP system.' },
  { id: '4', name: 'DocuHealth', category: 'Healthcare', description: 'Hospital management and patient record system.' },
  { id: '5', name: 'E-Shop Pro', category: 'E-commerce', description: 'Turnkey e-commerce solution for small businesses.' },
  { id: '6', name: 'Quiz Master', category: 'Education', description: 'Online exam and quiz management platform.' },
];

export const AWARDEES: Awardee[] = [
  { id: '1', name: 'Dr. K. Gowri', role: 'Professor, CSE', image: 'https://picsum.photos/150/150?random=10', description: 'Honored for excellence in mentoring research students.' },
  { id: '2', name: 'Somasundaram K', role: 'HOD, IT Dept', image: 'https://picsum.photos/150/150?random=11', description: 'Awarded for innovative curriculum design.' },
  { id: '3', name: 'Priya R', role: 'Senior Lecturer', image: 'https://picsum.photos/150/150?random=12', description: 'Best Student Support Award 2024.' },
];

export const STATS: Stat[] = [
  { label: 'Happy Students', value: 1200, suffix: '+', icon: Users },
  { label: 'Teachers', value: 50, suffix: '+', icon: BookOpen },
  { label: 'Projects Done', value: 350, suffix: '+', icon: Briefcase },
  { label: 'Courses', value: 25, suffix: '+', icon: Laptop },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Arjun Kumar', role: 'Student, SRM University', quote: 'The internship at Wisecrew gave me the real-world exposure I needed. The mentors are fantastic!', rating: 5 },
  { id: '2', name: 'Divya S', role: 'Frontend Dev Intern', quote: 'I learned more in 2 months here than I did in a whole year of college. Highly recommended.', rating: 4.5 },
  { id: '3', name: 'Prof. Ramesh', role: 'HOD, SVCE', quote: 'Wisecrew Solutions provides excellent industrial training that bridges the gap between academia and industry.', rating: 5 },
  { id: '4', name: 'Sneha P', role: 'Full Stack Student', quote: 'The course structure is amazing. I got placed in a top MNC after completing the Java course.', rating: 5 },
];

export const FAQS: FAQItem[] = [
  { question: 'Is the internship really free?', answer: 'Yes, we offer select free internships for meritorious students which include real-time project experience. We also have paid premium programs with intensive mentorship.' },
  { question: 'Do you provide certificates?', answer: 'Absolutely. All interns and course participants receive a verifiable certificate upon successful completion.' },
  { question: 'Can I do the internship online?', answer: 'Yes, most of our internships are available in both Online and Offline modes to suit your schedule.' },
  { question: 'How do I apply for a job?', answer: 'Navigate to the Careers section, check the open positions, and use the "Apply Now" form to submit your details.' },
];

export const WORKSHOPS: Workshop[] = [
  { id: '1', title: 'Generative AI Tools & Prompt Engineering', date: 'Oct 25, 2025', mode: 'Online', description: 'A hands-on session exploring the latest AI tools, LLMs, and efficient prompt construction.', status: 'Upcoming' },
  { id: '2', title: 'Full Stack Roadmap 2025', date: 'Sep 10, 2025', mode: 'Online', description: 'Guide to becoming a full stack developer in 2025.', status: 'Completed' },
];
