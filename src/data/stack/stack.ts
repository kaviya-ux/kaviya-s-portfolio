export type StackTech = {
  label: string
}

export type StackItem = {
  items: StackTech[]
  title: string
}

export const stack: StackItem[] = [
  {
    title: 'Languages',
    items: [
      { label: 'Python' },
      { label: 'JavaScript (ES6+)' },
      { label: 'SQL' },
      { label: 'HTML5' },
      { label: 'CSS3' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { label: 'React.js' },
      { label: 'Tailwind CSS' },
      { label: 'Responsive Design' },
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      { label: 'Django' },
      { label: 'Django REST Framework' },
      { label: 'Node.js' },
      { label: 'Express.js' },
      { label: 'REST APIs' },
      { label: 'JWT Auth' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { label: 'PostgreSQL' },
      { label: 'MySQL' },
      { label: 'MongoDB' },
    ],
  },
  {
    title: 'Tools & Cloud',
    items: [
      { label: 'Git' },
      { label: 'GitHub' },
      { label: 'Docker' },
      { label: 'Postman' },
      { label: 'VS Code' },
      { label: 'Vercel' },
      { label: 'Render' },
      { label: 'Supabase' },
    ],
  },
]
