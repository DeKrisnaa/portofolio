/* Grup skill untuk section "Skill".
   `name` harus sama dengan entri di techStack.js supaya ikonnya ketemu.
   `note` dipakai sebagai tooltip saat kursor diarahkan ke logo. */
export const skillCategories = [
  {
    id: 'languages',
    label: 'Bahasa Pemrograman',
    accent: 'var(--violet)',
    skills: [
      { name: 'HTML5', note: 'Struktur halaman semantik' },
      { name: 'CSS3', note: 'Layout, animasi, dark UI' },
      { name: 'JavaScript', note: 'Bahasa utama sehari-hari' },
      { name: 'TypeScript', note: 'Dipakai di proyek utama' },
      { name: 'Python', note: 'Dasar pemrograman kuliah' }
    ]
  },
  {
    id: 'frameworks',
    label: 'Framework & Library',
    accent: 'var(--cyan)',
    skills: [
      { name: 'Next.js', note: 'App router & deploy' },
      { name: 'React', note: 'Komponen & state' },
      { name: 'Vue.js', note: 'Dipakai di portofolio ini' },
      { name: 'Tailwind', note: 'Styling utility-first' },
      { name: 'Bootstrap', note: 'Layout cepat' }
    ]
  },
  {
    id: 'tools',
    label: 'Tools & Platform',
    accent: 'var(--pink)',
    skills: [
      { name: 'Git', note: 'Version control' },
      { name: 'GitHub', note: 'Repo & kolaborasi' },
      { name: 'VS Code', note: 'Editor utama' },
      { name: 'Vercel', note: 'Deployment project' },
      { name: 'Node.js', note: 'Runtime JavaScript' },
      { name: 'MySQL', note: 'Basis data relasional' },
      { name: 'Figma', note: 'Desain & aset UI' }
    ]
  }
]
