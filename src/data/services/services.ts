export type Service = {
  id: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Full-stack web applications',
    description:
      'End-to-end development with React.js, Tailwind CSS, Django and Node.js/Express, from responsive UI components to cloud deployment on Vercel, Render and Supabase.',
  },
  {
    id: 'api',
    title: 'REST APIs & authentication',
    description:
      'Secure, modular backends with JWT authentication, role-based access control (RBAC), input validation and clean API documentation, tested with Postman.',
  },
  {
    id: 'data',
    title: 'Relational & NoSQL database design',
    description:
      'Normalized schemas, query optimization and data modeling across PostgreSQL, MySQL and MongoDB.',
  },
]
