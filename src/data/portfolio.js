export const profile = {
  name: 'DeKrisna',
  initials: 'DK',
  photo: '/foto-diri.jpeg',
  role: 'Mahasiswa Informatika',
  title: 'Web Developer',
  status: 'Open untuk magang & freelance',
  location: 'Bali, Indonesia',
  email: 'dkrisna821@gmail.com',
  availability: 'Respon dalam 1x24 jam',
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

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Tentang' },
  { to: '/projects', label: 'Proyek' },
  { to: '/contact', label: 'Kontak' }
]

export const stats = [
  { label: 'Project dikerjakan', value: 5, suffix: '+' },
  { label: 'Repo publik', value: 5, suffix: '' },
  { label: 'Teknologi dipakai', value: 12, suffix: '+' },
  { label: 'Mulai ngoding', value: 2024, suffix: '' }
]

export const marqueeItems = [
  'Next.js',
  'TypeScript',
  'React',
  'Tailwind',
  'JavaScript',
  'HTML',
  'CSS',
  'Node.js',
  'Git',
  'GitHub',
  'Vercel',
  'Figma'
]

export const projects = [
  {
    id: 1,
    title: 'SmartCash',
    category: 'Web App',
    year: '2026',
    glyph: '◈',
    gradient: 'linear-gradient(135deg, #7c5cff 0%, #22d3ee 100%)',
    summary:
      'Aplikasi pencatatan keuangan berbasis web dengan halaman autentikasi dan area pengguna. Dibangun memakai Next.js dan TypeScript, lalu dideploy ke Vercel.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    metric: 'Live di Vercel',
    repo: 'https://github.com/DeKrisnaa/SmartCash',
    live: 'https://smartcash-mu.vercel.app'
  },
  {
    id: 2,
    title: 'dekrizz — Website Pribadi',
    category: 'Portofolio',
    year: '2026',
    glyph: '◐',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #a3e635 100%)',
    summary:
      'Website personal berisi profil, riwayat pendidikan, dan kontak. Menjadi tempat menampilkan perjalanan belajar web development sekaligus karya konten.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    metric: 'Live di Vercel',
    repo: 'https://github.com/DeKrisnaa/dekrizz',
    live: 'https://dekrizz.vercel.app'
  },
  {
    id: 3,
    title: 'dekrisna_portofolio',
    category: 'Portofolio',
    year: '2026',
    glyph: '◑',
    gradient: 'linear-gradient(135deg, #ff4d8d 0%, #fbbf24 100%)',
    summary:
      'Portofolio web versi pertama yang dibangun dari HTML dan CSS dasar, lalu dipublikasikan secara gratis memakai GitHub Pages.',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    metric: 'GitHub Pages',
    repo: 'https://github.com/DeKrisnaa/dekrisna_portofolio',
    live: 'https://dekrisnaa.github.io/dekrisna_portofolio/'
  }
]

export const projectFilters = ['Semua', 'Web App', 'Portofolio']

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
