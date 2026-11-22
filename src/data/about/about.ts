export type AboutAccordionItem = {
  answer: string
  id: string
  question: string
}

export type AboutJourneyItem = {
  dateLabel: string
  description: string
  id: string
  organization: string
  title: string
}

export const aboutAccordionItems: AboutAccordionItem[] = [
  {
    id: 'working-style',
    question: 'How do you approach a new project?',
    answer:
      'I start by understanding the workflow the application has to support, break it into small features, then design the data model and API before building and testing the interface step by step.',
  },
  {
    id: 'delivery-focus',
    question: 'What priorities guide your work?',
    answer:
      'Readable code, normalized databases, secure authentication and responsive interfaces, with simple decisions that keep a project easy to debug and extend.',
  },
  {
    id: 'collaboration',
    question: 'How do you work with a team?',
    answer:
      'I ask clear questions, act on mentor and code-review feedback, and keep my Git history and API documentation easy for others to follow.',
  },
]

// Chronological, so the timeline reads from the start of the degree to today.
export const aboutJourneyItems: AboutJourneyItem[] = [
  {
    id: 'bca',
    dateLabel: '2023 – 2026',
    title: 'Bachelor of Computer Applications (B.C.A.)',
    organization:
      'K.M.G. College of Arts and Science (Thiruvalluvar University), Vellore',
    description:
      'Graduated with an 8.8 / 10 CGPA, building strong foundations in Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems and Web Technologies.',
  },
  {
    id: 'python-internship',
    dateLabel: 'May 2025',
    title: 'Python Development Intern',
    organization: 'Redback IT Solutions Pvt. Ltd., Vellore',
    description:
      'Wrote, tested and debugged Python scripts for algorithmic and data-handling problems under senior developer mentorship, using modular functions, data structures and OOP.',
  },
  {
    id: 'full-stack-program',
    dateLabel: 'Jun 2026 – Oct 2026',
    title: 'Python Full Stack Development Program',
    organization: 'Hejex Technology, Pallavaram, Chennai',
    description:
      'Completed a 5-month intensive, hands-on program building and debugging full-stack applications with Python, Django, React.js, Node.js, Express.js, MySQL, MongoDB, REST APIs, database normalization, Tailwind CSS and Git/GitHub.',
  },
]
