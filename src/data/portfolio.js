export const profile = {
  name: 'DeKrisna',
  handle: 'DeKrisnaa',
  initials: 'DK',
  photo: '/foto-diri.jpeg',
  role: 'Junior Developer',
  status: 'Open untuk magang & freelance',
  location: 'Bali, Indonesia',
  email: 'dkrisna821@gmail.com',
  availability: 'Respon dalam 1x24 jam',
  cv: '/CV-DeKrisna.pdf',
  bio: [
    'Halo! Saya DeKrisna, mahasiswa Informatika di Primakara University, Bali. Saya menikmati proses mengubah ide menjadi produk web yang benar-benar bisa dipakai orang lain — mulai dari merancang tampilan sampai merapikan kodenya.',
    'Saat ini saya fokus belajar pengembangan web modern dengan Next.js, TypeScript, dan Tailwind CSS. Saya suka antarmuka yang bersih, cepat, dan nyaman digunakan, serta kode yang masih mudah dipahami saat dibaca ulang.',
    'Di luar coding, saya aktif mengembangkan konten kreatif lewat De_Krisna Channel dengan fokus pada musik dan media sosial. Dari situ saya belajar soal konsistensi, editing, dan cara menyampaikan sesuatu ke audiens.',
    'Setiap proyek saya jadikan kesempatan belajar: memahami masalahnya dulu, membangun versi sederhana, lalu memperbaikinya sedikit demi sedikit.'
  ],
  socials: [
    { label: 'GitHub', handle: '@DeKrisnaa', url: 'https://github.com/DeKrisnaa' },
    { label: 'Instagram', handle: '@dekrisnaaa', url: 'https://instagram.com/dekrisnaaa' },
    { label: 'Email', handle: 'dkrisna821@gmail.com', url: 'mailto:dkrisna821@gmail.com' }
  ]
}

/* one long page, so navigation is a set of anchors instead of routes.
   keep this in document order, the nav highlights the first visible one */
/* one long page, so navigation is a set of anchors instead of routes.
   keep this in document order, the nav highlights the first visible one */
export const sections = ['home', 'about', 'skills', 'projects', 'terminal', 'contact']

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Proyek' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Kontak' }
]

export const stats = [
  { label: 'Project dikerjakan', value: 5, suffix: '+' },
  { label: 'Repo publik', value: 5, suffix: '' },
  { label: 'Teknologi dikuasai', value: 12, suffix: '+' },
  { label: 'Mulai ngoding', value: 2024, suffix: '' }
]

export const marqueeItems = [
  'Next.js',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'JavaScript',
  'Vue.js',
  'Node.js',
  'HTML5',
  'CSS3',
  'Git & GitHub',
  'MySQL',
  'Vercel',
  'VS Code',
  'Figma'
]

export const projects = [
  {
    id: 1,
    title: 'SmartCash',
    category: 'Full-Stack Web App',
    year: '2026',
    glyph: '◈',
    branch: 'main',
    gradient: 'linear-gradient(135deg, #7c5cff 0%, #22d3ee 100%)',
    shot: '/smartcash.png',
    summary:
      'Aplikasi pencatatan keuangan modern berbasis web dengan halaman autentikasi aman, visualisasi chart arus kas, dan area dashboard pengguna. Dibangun memakai Next.js App Router & TypeScript, dideploy di Vercel.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    metric: 'Production Live',
    highlight: 'Lighthouse 98+',
    repo: 'https://github.com/DeKrisnaa/SmartCash',
    live: 'https://smartcash-mu.vercel.app'
  },
  {
    id: 2,
    title: 'AlgoVisualizer & CS Labs',
    category: 'Informatics Tool',
    year: '2025',
    glyph: '⚡',
    branch: 'feat/algo-vis',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
    shot: '/smartcash.png',
    summary:
      'Visualisator interaktif untuk berbagai algoritma sorting & searching (Bubble, Merge, Quick Sort) yang dibangun untuk membantu mahasiswa Informatika memahami kompleksitas waktu dan ruang secara visual.',
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS3 Grid', 'Git'],
    metric: 'Informatics Lab',
    highlight: 'Interactive Playground',
    repo: 'https://github.com/DeKrisnaa',
    live: 'https://github.com/DeKrisnaa'
  },
  {
    id: 3,
    title: 'DeKrisna Dev-OS Portfolio',
    category: 'Cyber UI / Web Experience',
    year: '2026',
    glyph: '⌘',
    branch: 'release/v2.4',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #7c5cff 100%)',
    shot: '/smartcash.png',
    summary:
      'Portofolio berarsitektur modern dengan tema tech/developer, menyertakan embedded interactive UNIX CLI terminal, quick command palette (Ctrl+K), real-time status monitor, dan matrix easter eggs.',
    stack: ['Vue 3', 'Vite 8', 'Vanilla CSS', 'JetBrains Mono'],
    metric: 'Ultra-Fast Vite',
    highlight: 'Sub-300ms Build',
    repo: 'https://github.com/DeKrisnaa/portofolio',
    live: '#'
  }
]

export const education = [
  {
    school: 'Primakara University',
    degree: 'S1 Informatika',
    period: '2024 — Sekarang',
    note: 'Mempelajari dasar pemrograman, algoritma, dan pengembangan web. Aktif mengerjakan proyek pribadi untuk mempraktikkan materi kuliah.'
  },
  {
    school: 'SMA Negeri 1 Pekutatan',
    degree: 'Jurusan MIPA',
    period: '2021 — 2024',
    note: 'Pendidikan menengah atas dengan peminatan Matematika dan Ilmu Pengetahuan Alam.'
  }
]

export const organizations = [
  {
    name: 'Himpunan Mahasiswa Informatika (HMI)',
    org: 'Primakara University',
    role: 'Anggota',
    period: '2024 — Sekarang',
    type: 'Organisasi Kampus',
    glyph: '◈',
    accent: 'var(--violet)',
    activities: [
      'Ikut rapat rutin kepengurusan',
      'Meny organising kegiatan mahasiswa',
      'Menyetusun program kerja bidang'
    ]
  },
  {
    name: 'De_Krisna Channel',
    org: 'Self-managed',
    role: 'Kreator & Editor',
    period: '2022 — Sekarang',
    type: 'Konten Kreatif',
    glyph: '◉',
    accent: 'var(--pink)',
    activities: [
      'Produksi konten musik',
      'Editing video & desain thumbnail',
      'Kelola akun media sosial'
    ]
  }
]

export const contactInfo = [
  { label: 'Email', value: 'dkrisna821@gmail.com', href: 'mailto:dkrisna821@gmail.com', glyph: '✉' },
  { label: 'GitHub', value: '@DeKrisnaa', href: 'https://github.com/DeKrisnaa', glyph: '⌥' },
  { label: 'Instagram', value: '@dekrisnaaa', href: 'https://instagram.com/dekrisnaaa', glyph: '◉' },
  { label: 'Lokasi', value: 'Bali, Indonesia', href: '#', glyph: '⌖' }
]
