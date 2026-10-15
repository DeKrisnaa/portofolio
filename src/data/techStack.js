/* Ikon brand asli (SVG) tersimpan di src/assets/icons.
   Vite mengembalikan URL file yang sudah di-hash saat build, jadi cukup
   di-render sebagai <img>. Tambah ikon baru = taruh file .svg di folder itu. */
const icons = import.meta.glob('../assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const icon = (file) => icons[`../assets/icons/${file}.svg`] || ''

export const techStack = [
  { name: 'HTML5', color: '#E34F26', icon: icon('html5') },
  { name: 'CSS3', color: '#1572B6', icon: icon('css3') },
  { name: 'JavaScript', color: '#F7DF1E', icon: icon('javascript') },
  { name: 'TypeScript', color: '#3178C6', icon: icon('typescript') },
  { name: 'Vue.js', color: '#41B883', icon: icon('vuejs') },
  { name: 'React', color: '#61DAFB', icon: icon('react') },
  { name: 'Next.js', color: '#ffffff', icon: icon('nextjs') },
  { name: 'Node.js', color: '#5FA04E', icon: icon('nodejs') },
  { name: 'Tailwind', color: '#38BDF8', icon: icon('tailwindcss') },
  { name: 'Bootstrap', color: '#7952B3', icon: icon('bootstrap') },
  { name: 'Python', color: '#3776AB', icon: icon('python') },
  { name: 'MySQL', color: '#4479A1', icon: icon('mysql') },
  { name: 'Git', color: '#F05032', icon: icon('git') },
  { name: 'GitHub', color: '#ffffff', icon: icon('github') },
  { name: 'Vercel', color: '#ffffff', icon: icon('vercel') },
  { name: 'VS Code', color: '#007ACC', icon: icon('vscode') },
  { name: 'Figma', color: '#F24E1E', icon: icon('figma') }
]
