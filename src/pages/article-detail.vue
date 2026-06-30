<template>
  <div class="article-detail-page py-12" v-if="article">
    <v-container class="max-width-lg">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 mb-6 text-caption"></v-breadcrumbs>

      <v-row class="gy-8">
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <v-card class="rounded-xl overflow-hidden elevation-3 pa-6 bg-white">
            <span class="text-caption font-weight-bold text-teal text-uppercase tracking-wider mb-2 d-block">
              {{ article.category }}
            </span>
            <h1 class="text-h4 font-weight-bold text-navy mb-4 leading-tight">
              {{ article.title }}
            </h1>
            
            <div class="d-flex align-center gap-4 mb-6 text-caption text-grey-500 flex-wrap">
              <div class="d-flex align-center">
                <v-icon icon="mdi-account" class="mr-1" size="16" color="primary"></v-icon>
                <span>Ditulis oleh: <strong>{{ article.author }}</strong></span>
              </div>
              <div class="d-flex align-center">
                <v-icon icon="mdi-calendar" class="mr-1" size="16" color="primary"></v-icon>
                <span>{{ formatDate(article.createdAt) }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon icon="mdi-clock-outline" class="mr-1" size="16" color="primary"></v-icon>
                <span>Estimasi Baca: 5 Menit</span>
              </div>
            </div>

            <v-img :src="article.image" height="380" cover class="rounded-xl mb-6 shadow-sm"></v-img>

            <!-- Render Content (supporting HTML) -->
            <div class="article-body text-body-1 text-grey-800 leading-relaxed" v-html="article.content"></div>
            
            <v-divider class="my-8"></v-divider>

            <!-- Back buttons -->
            <div class="d-flex align-center justify-space-between flex-wrap gap-4">
              <v-btn to="/artikel" color="navy" variant="outlined" class="rounded-lg text-capitalize font-weight-bold" prepend-icon="mdi-arrow-left">
                Kembali ke Artikel
              </v-btn>
              <div class="d-flex align-center gap-2">
                <span class="text-caption text-grey-500 font-weight-bold">Bagikan:</span>
                <v-btn icon="mdi-whatsapp" color="success" size="small" variant="flat" :href="`https://wa.me/?text=Baca%20artikel%20bagus%20ini%3A%20${shareUrl}`" target="_blank"></v-btn>
                <v-btn icon="mdi-facebook" color="blue" size="small" variant="flat" :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank"></v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Sidebar / About Author & Recommendations -->
        <v-col cols="12" md="4">
          <!-- Author Card -->
          <v-card class="rounded-xl pa-6 text-center elevation-2 mb-8 bg-white">
            <v-avatar size="100" class="mx-auto mb-4 border border-teal border-lg">
              <v-img src="/images/Logo.png" alt="Bidan Lila"></v-img>
            </v-avatar>
            <h3 class="text-subtitle-1 font-weight-bold text-navy mb-1">Bidan Lila, Amd. Keb</h3>
            <span class="text-caption text-teal font-weight-bold uppercase d-block mb-4">Founder Bidan Lila Homecare</span>
            <p class="text-caption text-grey-600 leading-relaxed mb-4">
              Seorang Bidan profesional dengan STR terdaftar resmi yang berdedikasi mendampingi para Ibu melalui masa kehamilan, menyusui, dan merawat bayi baru lahir secara ilmiah & penuh kasih sayang.
            </p>
            <v-btn
              href="https://wa.me/6281365417753"
              target="_blank"
              color="success"
              block
              class="rounded-lg text-capitalize font-weight-bold"
              prepend-icon="mdi-whatsapp"
            >
              Hubungi Bidan Lila
            </v-btn>
          </v-card>

          <!-- Featured Articles Mini List -->
          <v-card class="rounded-xl pa-6 elevation-2 bg-white">
            <h3 class="text-subtitle-1 font-weight-bold text-navy mb-4 border-b pb-2">Artikel Lainnya</h3>
            <div v-for="rec in recommendations" :key="rec.id" class="d-flex align-start mb-4 gap-3">
              <v-avatar rounded="lg" size="60" class="flex-shrink-0 bg-grey-200">
                <v-img :src="rec.image" cover></v-img>
              </v-avatar>
              <div>
                <router-link :to="`/artikel/${rec.slug}`" class="text-caption font-weight-bold text-navy text-decoration-none hover-teal-text line-clamp-2">
                  {{ rec.title }}
                </router-link>
                <span class="text-xxs text-grey-500 d-block mt-1">{{ formatDate(rec.createdAt) }}</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Loading State -->
  <v-container v-else class="max-width-lg py-16 text-center">
    <v-progress-circular indeterminate color="primary" size="64" class="mb-4"></v-progress-circular>
    <p class="text-grey-600">Memuat artikel...</p>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const article = ref(null);
const recommendations = ref([]);

const shareUrl = computed(() => {
  return typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
});

const breadcrumbs = computed(() => [
  { title: "Home", disabled: false, href: "/" },
  { title: "Artikel", disabled: false, href: "/artikel" },
  { title: article.value ? article.value.title : "Baca", disabled: true },
]);

const formatDate = (dateStr) => {
  if (!dateStr) return "30 Juni 2026";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fetchArticle = async () => {
  const slug = route.params.slug;
  try {
    const res = await axios.get(`http://localhost:5000/api/articles/slug/${slug}`);
    article.value = res.data;

    // Dynamically update meta tags for SEO!
    document.title = `${article.value.title} - Bidan Lila`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", article.value.summary);
    }
  } catch (err) {
    console.log("Using static article detail fallback");
    const staticArticles = [
      {
        id: 1,
        title: "5 Manfaat Pijat Bayi (Baby Massage) untuk Tumbuh Kembang Si Kecil",
        slug: "manfaat-pijat-bayi-tumbuh-kembang",
        summary: "Pijat bayi bukan sekadar membuat bayi rileks. Ketahui 5 manfaat ilmiah pijat bayi, mulai dari meningkatkan berat badan, memperlancar pencernaan hingga membuat tidur lebih nyenyak.",
        content: `
<h3>Pijat Bayi untuk Tumbuh Kembang Optimal</h3>
<p>Banyak orang tua mengira pijat bayi hanya diperlukan saat si kecil rewel atau pegal. Faktanya, pijat bayi merupakan salah satu stimulasi taktil (sentuhan) terbaik yang sangat dianjurkan oleh praktisi kesehatan dan kebidanan sejak bayi lahir.</p>
<p>Berikut adalah 5 manfaat utama pijat bayi yang perlu Bunda ketahui:</p>
<ol>
  <li><strong>Menstimulasi Pertumbuhan Fisik:</strong> Sentuhan lembut merangsang saraf vagus yang menghubungkan otak dengan organ penting, termasuk perut. Ini memicu sekresi hormon pencernaan seperti gastrin dan insulin, membantu penyerapan nutrisi lebih optimal, dan menaikkan berat badan bayi.</li>
  <li><strong>Meningkatkan Kualitas Tidur:</strong> Pijat membantu meningkatkan produksi hormon serotonin dan melatonon, sekaligus menurunkan tingkat kortisol (hormon stres). Hasilnya, bayi menjadi lebih tenang dan tidur lebih nyenyak di malam hari.</li>
  <li><strong>Meredakan Kembung dan Sembelit:</strong> Gerakan pijat di perut seperti teknik "I Love U" membantu memperlancar pergerakan gas dan kotoran di usus besar bayi, meredakan kolik, kembung, dan sembelit.</li>
  <li><strong>Memperkuat Sistem Imun:</strong> Stimulasi kulit melancarkan sirkulasi darah dan aliran limfatik, membantu membuang racun, serta meningkatkan aktivitas sel pembunuh alami dalam tubuh untuk menangkal infeksi.</li>
  <li><strong>Mempererat Bonding (Ikatan Kasih Sayang):</strong> Sentuhan kulit ke kulit (skin-to-skin contact) selama pemijatan memicu pelepasan hormon oksitosin baik pada bayi maupun orang tua, menciptakan ikatan batin yang sangat kuat.</li>
</ol>
<p>Pijat bayi sebaiknya dilakukan oleh tenaga profesional seperti bidan homecare berlisensi agar teknik pemijatan aman dan disesuaikan dengan kebutuhan fisiologis si kecil. Hubungi Homecare Bidan Lila untuk menjadwalkan kunjungan Baby Spa & Massage di rumah Bunda!</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=800&auto=format&fit=crop&q=80",
        createdAt: "2026-06-30T08:00:00Z"
      },
      {
        id: 2,
        title: "Mengatasi ASI Seret dengan Pijat Laktasi: Panduan Lengkap Ibu Menyusui",
        slug: "mengatasi-asi-seret-dengan-pijat-laktasi",
        summary: "ASI tidak lancar sering membuat ibu cemas. Pijat laktasi adalah solusi alami yang terbukti meningkatkan hormon oksitosin dan melancarkan saluran ASI yang tersumbat.",
        content: `
<h3>Pijat Laktasi: Solusi Alami Mengatasi Masalah ASI</h3>
<p>Masalah ASI kurang lancar, tersumbat, atau payudara bengkak adalah keluhan umum yang dialami ibu baru pada minggu-minggu awal pasca melahirkan. Keadaan ini sering memicu kecemasan dan stres, yang justru berujung pada menurunnya produksi ASI lebih jauh. Untuk itu, pijat laktasi hadir sebagai metode terapis fisik alami yang sangat efektif.</p>
<h4>Apa itu Pijat Laktasi?</h4>
<p>Pijat laktasi adalah teknik pemijatan khusus di area kepala, leher, punggung (pijat oksitosin), serta payudara. Tujuannya adalah untuk merangsang produksi hormon menyusui (prolaktin dan oksitosin) dan memperlancar aliran kelenjar susu.</p>
<h4>Manfaat Pijat Laktasi:</h4>
<ul>
  <li><strong>Meningkatkan Refleks Let-Down (LDR):</strong> Stimulasi di punggung memicu kelenjar pituitari di otak memproduksi oksitosin, yang membuat otot-otot di payudara berkontraksi untuk mengalirkan ASI dengan deras.</li>
  <li><strong>Mengatasi Sumbatan ASI (Mastitis Ringan):</strong> Pemijatan lembut di payudara membantu menghancurkan sumbatan lemak ASI di saluran susu (ductus laktiferus), mencegah terjadinya infeksi payudara (mastitis).</li>
  <li><strong>Meredakan Pembengkakan Payudara (Engorgement):</strong> Pijat membantu melunakkan payudara yang keras dan bengkak sehingga bayi dapat menyusu dengan pelekatan (latch-on) yang lebih baik.</li>
  <li><strong>Mencegah Stres pada Ibu Nifas:</strong> Pijatan di kepala dan leher mengurangi ketegangan otot akibat begadang merawat bayi, memberikan efek rileksasi, dan meningkatkan suasana hati ibu.</li>
</ul>
<p>Homecare Bidan Lila menyediakan layanan Pijat Laktasi profesional langsung ke rumah Anda. Bidan kami dibekali keterampilan klinis untuk mengevaluasi posisi menyusui dan membantu Bunda sukses memberikan ASI eksklusif.</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Ibu",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        createdAt: "2026-06-29T10:00:00Z"
      },
      {
        id: 3,
        title: "Panduan Praktis Perawatan Tali Pusat Bayi Baru Lahir secara Aman di Rumah",
        slug: "panduan-perawatan-tali-pusat-newborn",
        summary: "Merawat tali pusat bayi yang baru lahir sering membuat orang tua baru khawatir akan risiko infeksi. Ikuti panduan praktis perawatan tali pusat kering dan steril.",
        content: `
<h3>Merawat Tali Pusat Newborn dengan Tepat dan Higienis</h3>
<p>Tali pusat bayi baru lahir biasanya akan terlepas (puput) dengan sendirinya dalam waktu 7 hingga 14 hari pasca kelahiran. Selama periode ini, sisa tali pusat merupakan pintu masuk potensial bagi kuman penyebab infeksi jika tidak dirawat dengan benar. Sayangnya, masih banyak mitos yang menyarankan pemberian minyak, ramuan tradisional, atau alkohol pada tali pusat.</p>
<p>Berdasarkan rekomendasi Ikatan Dokter Anak Indonesia (IDAI) dan Organisasi Kesehatan Dunia (WHO), berikut adalah panduan perawatan tali pusat yang benar:</p>
<ol>
  <li><strong>Metode Kering & Bersih:</strong> Ini adalah metode terbaik. Tali pusat harus dibiarkan terbuka, bersih, dan kering tanpa dibubuhi zat apapun (alkohol, obat merah, atau minyak).</li>
  <li><strong>Cuci Tangan Terlebih Dahulu:</strong> Selalu cuci tangan menggunakan air mengalir dan sabun antiseptik sebelum memegang tali pusat bayi.</li>
  <li><strong>Menjaga Popok di Bawah Tali Pusat:</strong> Saat memasang popok (sekali pakai atau kain), pastikan bagian depan popok dilipat ke bawah agar tidak menutupi tali pusat. Ini penting untuk menghindari gesekan dan agar tali pusat tidak terkena air seni atau tinja bayi.</li>
  <li><strong>Mandikan Bayi dengan Hati-hati:</strong> Bila tali pusat belum lepas, Anda tetap bisa memandikan bayi dengan menyeka tubuhnya memakai waslap hangat. Hindari merendam tubuh bayi dalam bak mandi terlalu lama agar tali pusat tidak lembab.</li>
  <li><strong>Waspadai Tanda-tanda Infeksi:</strong> Perhatikan jika area sekitar tali pusat tampak merah, bengkak, mengeluarkan nanah, berbau busuk, atau bayi terus-menerus menangis saat tali pusat disentuh. Segera hubungi bidan atau dokter anak.</li>
</ol>
<p>Bila Bunda merasa cemas atau butuh bantuan pertama kali memandikan bayi di rumah, tim Bidan Lila siap berkunjung ke rumah Bunda untuk mendampingi, memberikan perawatan tali pusat, dan mengajari teknik memandikan bayi secara aman.</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
        createdAt: "2026-06-28T09:00:00Z"
      }
    ];
    article.value = staticArticles.find(a => a.slug === slug) || null;
  }

  // Load recommendations
  try {
    const resAll = await axios.get("http://localhost:5000/api/articles");
    recommendations.value = resAll.data.filter(a => a.slug !== slug).slice(0, 3);
  } catch (err) {
    recommendations.value = [];
  }
};

onMounted(() => {
  fetchArticle();
});

watch(() => route.params.slug, () => {
  fetchArticle();
});
</script>

<style>
.article-body h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #02345f;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.article-body h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #02345f;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
.article-body p {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: #374151;
}
.article-body ol, .article-body ul {
  margin-bottom: 1.25rem;
  padding-left: 20px;
  color: #374151;
}
.article-body li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.hover-teal-text:hover {
  color: #E91E63 !important;
  transition: color 0.2s ease;
}
.gap-4 {
  gap: 16px;
}
.gap-3 {
  gap: 12px;
}
.gap-2 {
  gap: 8px;
}
.text-xxs {
  font-size: 0.65rem;
}
.bg-white {
  background-color: white !important;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
