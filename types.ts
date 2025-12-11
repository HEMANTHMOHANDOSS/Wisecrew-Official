import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Internship {
  id: string;
  title: string;
  type: 'Free' | 'Paid';
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  description: string;
}

export interface Job {
  id: string;
  title: string;
  type: 'Internship' | 'Full Time';
  location: 'Remote' | 'On-site' | 'Hybrid';
  description: string;
  tags: string[];
  perks: string;
  responsibilities: string[];
}

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  features?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Awardee {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  mode: 'Online' | 'Offline';
  description: string;
  status: 'Upcoming' | 'Completed';
}

export interface Application {
  id: string; // WISE-INT-20251025-1234
  type: 'Internship' | 'Job' | 'Course' | 'Workshop' | 'Service';
  role: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: 'Submitted' | 'Under Review';
}