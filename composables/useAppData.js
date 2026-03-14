/**
 * useAppData - Centralized reactive data store for the entire application.
 * 
 * This composable is the SINGLE SOURCE OF TRUTH for:
 * - Articles/Berita (used by: homepage, /berita, admin/berita, admin/super)
 * - Members (used by: admin/super, admin/anggota, member/profile, homepage stats)
 * - Admins & Roles (used by: admin/super)
 * - Organization Structure (used by: /struktur, admin/struktur)
 * 
 * All CRUD operations happen here. No page should define its own local copy of this data.
 */

const _articles = ref([
  {
    _id: '1',
    title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
    excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit, menjadi tempat belajar khusus bagi generasi muda yang tertarik dengan kesenian ini. Program ini mencakup dasar-dasar dalang, musik iringan, dan pembuatan wayang.',
    slug: 'peluncuran-pusat-pembelajaran',
    category: 'Pendidikan',
    status: 'published',
    createdAt: new Date('2026-03-10')
  },
  {
    _id: '2',
    title: 'Festival Seni Jawa Sastro Jendro 2026',
    excerpt: 'Bergabunglah dengan kami dalam merayakan seni dan budaya Jawa di festival tahunan kami! Acara ini akan dimeriahkan oleh pentas tari tradisional, pameran kerajinan tangan lokal, dan kompetisi gamelan antar pemuda.',
    slug: 'festival-seni-tahunan-2026',
    category: 'Acara',
    status: 'published',
    createdAt: new Date('2026-03-05')
  },
  {
    _id: '3',
    title: 'Kelas Pemuda: Gamelan Tingkat Dasar',
    excerpt: 'Pendaftaran untuk kelas musik gamelan gelombang kedua telah dibuka. Kelas ini dirancang khusus bagi pemula dengan instruktur profesional. Mari bersama lestarikan alunan nada Nusantara!',
    slug: 'kelas-pemuda-gamelan-dasar',
    category: 'Seni',
    status: 'published',
    createdAt: new Date('2026-02-28')
  },
  {
    _id: '4',
    title: 'Gotong Royong Rehabilitasi Sanggar Komunitas',
    excerpt: 'Sabtu lalu, warga dan anggota Yayasan bahu-membahu memperbaiki atap dan panggung sanggar seni agar dapat digunakan dengan nyaman untuk persiapan pentas bulan depan. Terima kasih kepada semua relawan.',
    slug: 'gotong-royong-rehabilitasi-sanggar',
    category: 'Komunitas',
    status: 'published',
    createdAt: new Date('2026-02-15')
  },
  {
    _id: '5',
    title: 'Mengenal Filosofi Sastra Jendra Hayuningrat',
    excerpt: 'Sastra Jendra bukan sekadar kisah lakon pewayangan, melainkan sebuah ajaran luhur tentang keselamatan, peleburan angkara murka, dan bagaimana mencapai kedamaian sejati sebagai manusia.',
    slug: 'mengenal-filosofi-sastra-jendra',
    category: 'Pendidikan',
    status: 'published',
    createdAt: new Date('2026-02-01')
  },
  {
    _id: '6',
    title: 'Rapat Tahunan Koperasi Anggota 2026',
    excerpt: 'Pemberitahuan kepada seluruh anggota koperasi, rapat tahunan (RAT) akan diselenggarakan untuk membagikan Sisa Hasil Usaha (SHU) dan menyusun program kerja komunitas setahun ke depan.',
    slug: 'rapat-tahunan-koperasi-2026',
    category: 'Komunitas',
    status: 'draft',
    createdAt: new Date('2026-01-20')
  }
])

const _members = ref([
  { id: 1, fullName: 'Budi Santoso', city: 'Yogyakarta', memberId: 'SJ-0001', email: 'budi@sastrojendro.id', phone: '+62 812 3456 7890', position: 'Ketua', status: 'verified', joinedAt: new Date('2024-06-01') },
  { id: 2, fullName: 'Siti Nurhaliza', city: 'Surakarta', memberId: 'SJ-0002', email: 'siti@sastrojendro.id', phone: '+62 812 3456 7891', position: 'Wakil Ketua I', status: 'verified', joinedAt: new Date('2024-06-01') },
  { id: 3, fullName: 'Ahmad Wijaya', city: 'Semarang', memberId: 'SJ-0003', email: 'ahmad@sastrojendro.id', phone: '+62 812 3456 7892', position: 'Wakil Ketua II', status: 'verified', joinedAt: new Date('2024-07-15') },
  { id: 4, fullName: 'Dewi Sekartaji', city: 'Kediri', memberId: 'SJ-0004', email: 'dewi@sastrojendro.id', phone: '+62 813 5678 1234', position: 'Anggota', status: 'verified', joinedAt: new Date('2024-08-20') },
  { id: 5, fullName: 'Suryo Kencana', city: 'Surakarta', memberId: 'SJ-0005', email: 'suryo@sastrojendro.id', phone: '+62 856 7890 1234', position: 'Anggota', status: 'verified', joinedAt: new Date('2025-01-10') },
])

const _admins = ref([
  { id: 1, name: 'Super Administrator', email: 'super@sastrojendro.id', role: 1, active: true },
  { id: 2, name: 'Budi Santoso', email: 'budi@sastrojendro.id', role: 2, active: true },
])

const _roles = ref([
  { id: 1, name: 'superadmin', description: 'Kendali absolut seluruh fitur yayasan dan infrastruktur digital.', permissions: ['all'], isSystem: true },
  { id: 2, name: 'administrator', description: 'Operator database, verifikator member, dan manajemen konten harian.', permissions: ['members.read', 'members.write', 'articles.read', 'articles.write', 'structure.read', 'structure.write'], isSystem: false },
  { id: 3, name: 'editor', description: 'Penulis dan penyunting konten berita dan artikel yayasan.', permissions: ['articles.read', 'articles.write'], isSystem: false },
])

const _structure = ref({
  pembina: { name: 'K.R.T. Joyodiningrat', title: 'Dewan Pembina', description: 'Pelindung dan Penasihat Utama Yayasan' },
  ketua: { name: 'Budi Santoso', title: 'Ketua Umum Yayasan', email: 'budi@sastrojendro.id' },
  wakil: [
    { _id: '1', name: 'Siti Nurhaliza', title: 'Wakil Ketua Bidang Edukasi', email: 'siti@sastrojendro.id' },
    { _id: '2', name: 'Ahmad Wijaya', title: 'Wakil Ketua Bidang Operasional', email: 'ahmad@sastrojendro.id' },
  ],
  departments: [
    {
      _id: '1', name: 'Departemen Kesenian & Budaya', icon: '🎭',
      members: [
        { _id: '1', name: 'Dewi Sekartaji', position: 'Ketua Departemen' },
        { _id: '2', name: 'Ki Roni Hermawan', position: 'Koordinator Pelatihan Wayang' },
        { _id: '3', name: 'Nyi Eka Putri', position: 'Koreografer & Tari' },
        { _id: '8', name: 'Bambang Pamungkas', position: 'Instruktur Gamelan' },
      ]
    },
    {
      _id: '2', name: 'Departemen Pendidikan Masyarakat', icon: '📚',
      members: [
        { _id: '4', name: 'Prof. Darmawan', position: 'Ketua Departemen' },
        { _id: '5', name: 'Lisda Suryani', position: 'Program Pelatihan Pemuda' },
        { _id: '9', name: 'Hadi Sudarso', position: 'Dokumentasi & Literatur' },
      ]
    },
    {
      _id: '3', name: 'Dpt. Sosial & Kemitraan', icon: '🤝',
      members: [
        { _id: '6', name: 'Suryo Kencana', position: 'Ketua Departemen' },
        { _id: '7', name: 'Maya Kusuma', position: 'Humas & Event Organizer' },
        { _id: '10', name: 'Andi Pratama', position: 'Keuangan & Sponsorship' },
      ]
    },
  ]
})

export const useAppData = () => {
  // ========== ARTICLES ==========
  const articles = computed(() => _articles.value)
  const publishedArticles = computed(() => _articles.value.filter(a => a.status === 'published').sort((a, b) => b.createdAt - a.createdAt))
  const latestArticles = computed(() => publishedArticles.value.slice(0, 3))

  const addArticle = (article) => {
    _articles.value.push({ _id: String(Date.now()), status: 'draft', createdAt: new Date(), ...article })
  }
  const updateArticle = (id, data) => {
    const idx = _articles.value.findIndex(a => a._id === id)
    if (idx !== -1) _articles.value[idx] = { ..._articles.value[idx], ...data }
  }
  const deleteArticle = (id) => {
    _articles.value = _articles.value.filter(a => a._id !== id)
  }
  const toggleArticleStatus = (id) => {
    const article = _articles.value.find(a => a._id === id)
    if (article) article.status = article.status === 'published' ? 'draft' : 'published'
  }

  // ========== MEMBERS ==========
  const members = computed(() => _members.value)
  const verifiedMembers = computed(() => _members.value.filter(m => m.status === 'verified'))

  const addMember = (member) => {
    _members.value.push({ id: Date.now(), status: 'pending', joinedAt: new Date(), position: 'Anggota', ...member })
  }
  const updateMember = (id, data) => {
    const idx = _members.value.findIndex(m => m.id === id)
    if (idx !== -1) _members.value[idx] = { ..._members.value[idx], ...data }
  }
  const deleteMember = (id) => {
    _members.value = _members.value.filter(m => m.id !== id)
  }

  // ========== ADMINS ==========
  const admins = computed(() => _admins.value)

  const addAdmin = (admin) => {
    _admins.value.push({ id: Date.now(), active: true, role: 2, ...admin })
  }
  const updateAdminRole = (adminId, roleId) => {
    const admin = _admins.value.find(a => a.id === adminId)
    if (admin) admin.role = roleId
  }
  const toggleAdminStatus = (adminId) => {
    const admin = _admins.value.find(a => a.id === adminId)
    if (admin) admin.active = !admin.active
  }
  const deleteAdmin = (id) => {
    _admins.value = _admins.value.filter(a => a.id !== id)
  }

  // ========== ROLES ==========
  const roles = computed(() => _roles.value)

  const addRole = (role) => {
    _roles.value.push({ id: Date.now(), isSystem: false, permissions: [], ...role })
  }
  const updateRole = (id, data) => {
    const idx = _roles.value.findIndex(r => r.id === id)
    if (idx !== -1) _roles.value[idx] = { ..._roles.value[idx], ...data }
  }
  const deleteRole = (id) => {
    _roles.value = _roles.value.filter(r => r.id !== id && !r.isSystem)
  }
  const getRoleName = (roleId) => {
    const role = _roles.value.find(r => r.id === roleId)
    return role ? role.name : 'unknown'
  }

  // ========== STRUCTURE ==========
  const structure = computed(() => _structure.value)

  const updateStructure = (data) => {
    _structure.value = { ..._structure.value, ...data }
  }

  // ========== GLOBAL STATS ==========
  const stats = computed(() => ({
    totalArticles: _articles.value.length,
    publishedArticles: _articles.value.filter(a => a.status === 'published').length,
    draftArticles: _articles.value.filter(a => a.status === 'draft').length,
    totalMembers: _members.value.length,
    verifiedMembers: _members.value.filter(m => m.status === 'verified').length,
    totalAdmins: _admins.value.length,
    activeAdmins: _admins.value.filter(a => a.active).length,
    totalRoles: _roles.value.length,
    totalDepartments: _structure.value.departments ? _structure.value.departments.length : 0,
    totalMessages: 0,
  }))

  // ========== UTILITY ==========
  const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  return {
    // Articles
    articles, publishedArticles, latestArticles,
    addArticle, updateArticle, deleteArticle, toggleArticleStatus,
    // Members
    members, verifiedMembers,
    addMember, updateMember, deleteMember,
    // Admins
    admins,
    addAdmin, updateAdminRole, toggleAdminStatus, deleteAdmin,
    // Roles
    roles,
    addRole, updateRole, deleteRole, getRoleName,
    // Structure
    structure, updateStructure,
    // Stats
    stats,
    // Utils
    formatDate,
  }
}
