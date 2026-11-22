export type SkillTreeNode = {
  id: string
  label: string
  children?: SkillTreeNode[]
  keywords?: string[]
}

export const skillsTree: SkillTreeNode = {
  id: 'skills',
  label: 'Skills',
  children: [
    {
      id: 'languages',
      label: 'Languages',
      keywords: ['Python', 'JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      keywords: ['React.js', 'Tailwind CSS', 'Responsive design', 'Mobile-first'],
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      keywords: [
        'Django',
        'Django REST Framework',
        'Node.js',
        'Express.js',
        'REST APIs',
        'JWT authentication',
        'RBAC',
      ],
    },
    {
      id: 'databases',
      label: 'Databases',
      keywords: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Schema normalization',
        'Query optimization',
      ],
    },
    {
      id: 'tools-core-cs',
      label: 'Tools & Core CS',
      keywords: [
        'Git',
        'GitHub',
        'Docker',
        'Postman',
        'VS Code',
        'Vercel · Render · Supabase',
        'Data structures & algorithms',
        'OOP',
        'DBMS',
      ],
    },
  ],
}
