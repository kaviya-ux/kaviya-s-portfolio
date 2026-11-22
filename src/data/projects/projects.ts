export type Project = {
  category: 'personal'
  title: string
  description: string
  highlights: string
  imageAlt: string
  imageSrc: string
  imageWebpSrcSet?: string
  repositoryHref?: string
  stack: string[]
  status: string
  href?: string
}

export const projects: Project[] = [
  {
    category: 'personal',
    title: 'Job Application Tracker',
    description:
      'Full-stack career pipeline tracker built to log, filter and manage job applications across hiring stages in one unified dashboard.',
    highlights:
      'Implemented JWT user authentication, full CRUD workflows, status pipeline tracking and analytics views, backed by a Django REST API and a PostgreSQL database.',
    imageAlt: 'Cover card for the Job Application Tracker project.',
    imageSrc: '/projects/job-application-tracker.png',
    imageWebpSrcSet:
      '/projects/generated/job-application-tracker-384.webp 384w, /projects/generated/job-application-tracker-512.webp 512w, /projects/generated/job-application-tracker-960.webp 960w, /projects/generated/job-application-tracker-1280.webp 1280w',
    href: 'https://job-application-tracker1-liart.vercel.app',
    repositoryHref: 'https://github.com/kaviya-ux/job-application-tracker',
    stack: [
      'React',
      'Tailwind CSS',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
    ],
    status: 'Full-stack web app · Live',
  },
  {
    category: 'personal',
    title: 'QuickDesk — Helpdesk Ticket System',
    description:
      'Role-based technical support and SLA ticketing platform where customers raise issues and support agents and admins triage and resolve requests.',
    highlights:
      'Engineered multi-role access control (Admin, Agent, Customer), ticket lifecycle status workflows, priority and SLA tracking, and seeded demo environments.',
    imageAlt: 'Cover card for the QuickDesk helpdesk ticket system project.',
    imageSrc: '/projects/helpdesk-ticket-system.png',
    imageWebpSrcSet:
      '/projects/generated/helpdesk-ticket-system-384.webp 384w, /projects/generated/helpdesk-ticket-system-512.webp 512w, /projects/generated/helpdesk-ticket-system-960.webp 960w, /projects/generated/helpdesk-ticket-system-1280.webp 1280w',
    href: 'https://helpdesk-ticket-system-peach.vercel.app',
    repositoryHref: 'https://github.com/kaviya-ux/helpdesk-ticket-system',
    stack: [
      'React',
      'Tailwind CSS',
      'Django REST Framework',
      'JWT',
      'PostgreSQL',
    ],
    status: 'Full-stack web app · Live',
  },
  {
    category: 'personal',
    title: 'Appointment Booking System',
    description:
      'Full-stack scheduling platform where clients browse service providers and book time slots with real-time availability validation.',
    highlights:
      'Built conflict-free slot booking workflows, provider and service management, status updates, and responsive form validation across desktop and mobile.',
    imageAlt: 'Cover card for the Appointment Booking System project.',
    imageSrc: '/projects/appointment-booking-system.png',
    imageWebpSrcSet:
      '/projects/generated/appointment-booking-system-384.webp 384w, /projects/generated/appointment-booking-system-512.webp 512w, /projects/generated/appointment-booking-system-960.webp 960w, /projects/generated/appointment-booking-system-1280.webp 1280w',
    href: 'https://appointment-booking-system-gamma-ruby.vercel.app/',
    repositoryHref: 'https://github.com/kaviya-ux/appointment-booking-system',
    stack: ['React', 'Tailwind CSS', 'Django', 'REST API', 'PostgreSQL'],
    status: 'Full-stack web app · Live',
  },
]
