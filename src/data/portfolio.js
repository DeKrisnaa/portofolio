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

export const services = [
  {
    span: 'wide',
    eyebrow: 'Filosofi',
    glyph: '◈',
    title: 'Selesaikan masalahnya dulu, baru rapikan kodenya.',
    body: 'Saya selalu mulai dari memahami masalah dan penggunanya, baru memilih teknologi. Versi pertama dibuat sesederhana mungkin supaya cepat diuji dan mudah diperbaiki.',
    points: ['Pahami kebutuhan dulu', 'Bangun versi sederhana', 'Perbaiki bertahap']
  },
  {
    eyebrow: 'Frontend',
    glyph: '◐',
    title: 'Antarmuka yang bersih dan ringan',
    body: 'Halaman dibangun dengan komponen yang rapi memakai Next.js, React, dan Tailwind CSS, dengan perhatian pada tampilan mobile dan keterbacaan.',
    points: ['Next.js & React', 'TypeScript', 'Tailwind CSS']
  },
  {
    eyebrow: 'Backend',
    glyph: '◑',
    title: 'Alur data yang jelas',
    body: 'Menghubungkan aplikasi ke API dan database, termasuk autentikasi pengguna, dengan struktur yang mudah dilacak saat ada error.',
    points: ['Next.js API Routes', 'REST API', 'Autentikasi']
  },
  {
    eyebrow: 'Deploy',
    glyph: '◆',
    title: 'Rilis dan versi yang terkelola',
    body: 'Setiap proyek saya kelola dengan Git dan GitHub, lalu dideploy ke Vercel agar bisa diakses publik dan mudah diperbarui.',
    points: ['Git & GitHub', 'Deploy Vercel', 'Domain & hosting']
  }
]

export const skillGroups = [
  {
    name: 'Web Frontend',
    glyph: '◐',
    accent: 'var(--violet)',
    items: ['HTML & CSS', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Responsive Design']
  },
  {
    name: 'Backend & Deploy',
    glyph: '◑',
    accent: 'var(--cyan)',
    items: ['Node.js', 'Next.js API Routes', 'REST API', 'Autentikasi', 'Git & GitHub', 'Vercel']
  },
  {
    name: 'Kreatif & Tools',
    glyph: '◆',
    accent: 'var(--pink)',
    items: ['Figma', 'Canva', 'CapCut', 'Editing video', 'Manajemen konten', 'Linux']
  }
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

export const timeline = [
  {
    year: '2021',
    title: 'SMA Negeri 1 Pekutatan — Jurusan MIPA',
    body: 'Menempuh pendidikan menengah atas dengan peminatan Matematika dan IPA. Rasa penasaran soal teknologi dan media digital mulai tumbuh dari sini.'
  },
  {
    year: '2024',
    title: 'Masuk Primakara University, Jurusan Informatika',
    body: 'Mulai belajar dasar-dasar pemrograman dan logika komputer secara formal, sekaligus aktif membuat konten di De_Krisna Channel.'
  },
  {
    year: '2025',
    title: 'Belajar web development secara serius',
    body: 'Mendalami HTML, CSS, dan JavaScript, lalu berlanjut ke Next.js dan Tailwind CSS. Membangun website portofolio pertama.'
  },
  {
    year: '2026',
    title: 'Membangun SmartCash',
    body: 'Mengerjakan aplikasi keuangan berbasis web dengan Next.js dan TypeScript — dari halaman autentikasi sampai proses deploy ke Vercel.'
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

export const values = [
  {
    title: 'Kode yang enak dibaca',
    body: 'Nama variabel yang jelas, struktur folder yang rapi, dan komentar hanya untuk hal yang benar-benar tidak obvious.'
  },
  {
    title: 'Detail yang terasa',
    body: 'Jarak, kontras teks, dan tampilan di layar kecil adalah hal kecil yang membuat produk terasa selesai, bukan sekadar latihan.'
  },
  {
    title: 'Terus belajar',
    body: 'Setiap teknologi baru saya coba di project kecil lebih dulu, baru dipakai di project yang lebih serius.'
  }
]

export const contactInfo = [
  { label: 'Email', value: 'dkrisna821@gmail.com', href: 'mailto:dkrisna821@gmail.com', glyph: '✉' },
  { label: 'GitHub', value: '@DeKrisnaa', href: 'https://github.com/DeKrisnaa', glyph: '⌥' },
  { label: 'Instagram', value: '@dekrisnaaa', href: 'https://instagram.com/dekrisnaaa', glyph: '◉' },
  { label: 'Lokasi', value: 'Bali, Indonesia', href: '#', glyph: '⌖' }
]
