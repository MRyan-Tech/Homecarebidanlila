import { createRouter, createWebHistory } from "vue-router";

// Pages
import Home from "../pages/index.vue";
import Layanan from "../pages/layanan.vue";
import ServiceDetail from "../pages/service-detail.vue";
import Articles from "../pages/articles.vue";
import ArticleDetail from "../pages/article-detail.vue";
import About from "../pages/about.vue";
import Booking from "../pages/booking.vue";
import AdminLogin from "../pages/admin/login.vue";
import AdminDashboard from "../pages/admin/dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Homecare Bidan Lila - Pijat Bayi, Baby Spa & Laktasi Jabodetabek",
      description: "Jasa Homecare Bidan Profesional se-Jabodetabek. Layanan lengkap Baby Spa, Pijat Bayi, Pijat Laktasi, dan Prenatal Massage langsung di rumah Anda.",
    },
  },
  {
    path: "/layanan",
    name: "Layanan",
    component: Layanan,
    meta: {
      title: "Daftar Layanan & Tarif Homecare Bidan Lila",
      description: "Pilihan layanan homecare terlengkap: Perawatan Ibu (Pijat Hamil/Laktasi), Perawatan Bayi & Anak (Baby Spa, Tindik, Potong Rambut) dengan tarif terjangkau.",
    },
  },
  {
    path: "/layanan/:slug",
    name: "ServiceDetail",
    component: ServiceDetail,
    meta: {
      title: "Detail Layanan - Homecare Bidan Lila",
    },
  },
  {
    path: "/artikel",
    name: "Articles",
    component: Articles,
    meta: {
      title: "Artikel Edukasi Ibu & Anak - Bidan Lila",
      description: "Kumpulan artikel kesehatan ibu, bayi baru lahir, tips menyusui, dan tumbuh kembang anak oleh Bidan Lila.",
    },
  },
  {
    path: "/artikel/:slug",
    name: "ArticleDetail",
    component: ArticleDetail,
    meta: {
      title: "Baca Artikel - Bidan Lila",
    },
  },
  {
    path: "/tentang-kami",
    name: "About",
    component: About,
    meta: {
      title: "Tentang Bidan Lila - Homecare & Spa Bersertifikat",
      description: "Profil Bidan Lila, STR resmi, keahlian dan sertifikasi profesional dalam perawatan kebidanan, pijat laktasi, dan baby spa.",
    },
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking,
    meta: {
      title: "Booking Jadwal Layanan Homecare Bidan Lila",
      description: "Formulir pemesanan layanan homecare bidan ke rumah. Jadwalkan waktu kunjungan Anda dengan cepat dan mudah.",
    },
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      title: "Admin Login - Homecare Bidan Lila",
    },
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      title: "Dashboard Admin - Homecare Bidan Lila",
      requiresAuth: true,
    },
  },
  // Fallback redirect
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Check auth
  const token = localStorage.getItem("adminToken");
  if (to.meta.requiresAuth && !token) {
    next("/admin");
  } else {
    next();
  }
});

// Dynamic Page Metadata for SEO
router.afterEach((to) => {
  document.title = to.meta.title || "Homecare Bidan Lila - Profesional & Penuh Kasih";
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl && to.meta.description) {
    descEl.setAttribute("content", to.meta.description);
  }
});

export default router;
