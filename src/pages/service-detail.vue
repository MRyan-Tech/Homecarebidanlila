<template>
  <div class="service-detail-page py-12" v-if="service">
    <v-container class="max-width-lg">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 mb-6 text-caption"></v-breadcrumbs>

      <v-row class="gy-8">
        <!-- Image & Gallery -->
        <v-col cols="12" md="6">
          <v-card class="rounded-xl overflow-hidden elevation-4">
            <v-img :src="service.image" height="400" cover></v-img>
          </v-card>
        </v-col>

        <!-- Service Info -->
        <v-col cols="12" md="6">
          <v-chip color="primary" class="font-weight-bold mb-3" size="small">{{ service.category }}</v-chip>
          <h1 class="text-h4 font-weight-black text-navy mb-4 leading-tight">{{ service.name }}</h1>
          
          <!-- Price & Duration Summary -->
          <v-row class="mb-6 gy-4">
            <v-col cols="6">
              <v-card variant="tonal" color="teal" class="pa-4 rounded-xl text-center">
                <v-icon icon="mdi-clock-outline" class="mb-1" size="24"></v-icon>
                <div class="text-caption text-grey-600">Durasi Sesi</div>
                <div class="text-subtitle-1 font-weight-bold">{{ service.duration }} Menit</div>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card variant="tonal" color="primary" class="pa-4 rounded-xl text-center">
                <v-icon icon="mdi-cash" class="mb-1" size="24"></v-icon>
                <div class="text-caption text-grey-600">Tarif Homecare</div>
                <div class="text-subtitle-1 font-weight-bold">Rp {{ formatPrice(service.price) }}</div>
                <div class="text-xxs text-grey-500 italic mt-1">*Belum termasuk transport</div>
              </v-card>
            </v-col>
          </v-row>

          <h3 class="text-subtitle-1 font-weight-bold text-navy mb-2">Deskripsi Perawatan</h3>
          <p class="text-body-2 text-grey-700 leading-relaxed mb-6">
            {{ service.description }}
          </p>

          <v-divider class="mb-6"></v-divider>

          <!-- Standard Benefits List for SEO richness -->
          <h3 class="text-subtitle-1 font-weight-bold text-navy mb-3">Apa yang Anda Dapatkan?</h3>
          <ul class="benefit-list text-body-2 text-grey-700 mb-8 pl-5">
            <li class="mb-2">Penanganan langsung oleh Bidan berlisensi resmi (STR Aktif)</li>
            <li class="mb-2">Bahan sekali pakai steril & higienis untuk menjaga keamanan</li>
            <li class="mb-2">Minyak pijat organik premium aman bagi kulit bayi & sensitif</li>
            <li class="mb-2">Aromaterapi khusus untuk suasana rileks layaknya di klinik</li>
            <li class="mb-2">Konsultasi gratis mengenai perawatan ibu & anak selama sesi</li>
            <li class="mb-2 text-primary font-weight-bold">*Tarif di atas belum termasuk biaya transportasi (ongkir) kunjungan</li>
          </ul>

          <div class="d-flex flex-wrap gap-4">
            <v-btn
              :to="`/booking?service=${encodeURIComponent(service.name)}`"
              color="primary"
              size="large"
              class="rounded-xl px-8 font-weight-bold text-capitalize"
              prepend-icon="mdi-calendar-check"
              elevation="3"
            >
              Pesan Sekarang
            </v-btn>
            <v-btn
              :href="`https://wa.me/6281365417753?text=Halo%20Bidan%20Lila%2C%20saya%20ingin%20tanya%20detail%20mengenai%20layanan%20homecare%20${encodeURIComponent(service.name)}`"
              target="_blank"
              color="success"
              variant="outlined"
              size="large"
              class="rounded-xl px-8 font-weight-bold text-capitalize bg-white"
              prepend-icon="mdi-whatsapp"
            >
              Tanya via WhatsApp
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Loading State -->
  <v-container v-else class="max-width-lg py-16 text-center">
    <v-progress-circular indeterminate color="primary" size="64" class="mb-4"></v-progress-circular>
    <p class="text-grey-600">Memuat data layanan...</p>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const service = ref(null);

const breadcrumbs = computed(() => [
  { title: "Home", disabled: false, href: "/" },
  { title: "Layanan", disabled: false, href: "/layanan" },
  { title: service.value ? service.value.name : "Detail", disabled: true },
]);

const formatPrice = (price) => {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
};

const fetchService = async () => {
  const slug = route.params.slug;
  try {
    const res = await axios.get(`/api/services/slug/${slug}`);
    service.value = res.data;
    
    // Dynamically update document title and meta description for SEO!
    document.title = `${service.value.name} - Homecare Bidan Lila`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", `${service.value.name} se-Jabodetabek. ${service.value.description.substring(0, 120)}...`);
    }
  } catch (err) {
    console.log("Using static service detail fallback");
    // Static Fallback
    const staticServices = [
      { id: 1, name: "Pijat Bayi & Baby Spa Stimulus", slug: "pijat-bayi-baby-spa", category: "Baby Care", description: "Layanan stimulasi tumbuh kembang bayi yang dipandu oleh bidan bersertifikat. Meliputi senam bayi (baby gym), berendam air hangat (baby swim), dan pijat stimulasi bayi menggunakan baby oil organic untuk merangsang motorik, melancarkan pencernaan, serta meningkatkan kualitas tidur bayi.", price: 175000, duration: 60, image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=800&auto=format&fit=crop&q=80" },
      { id: 2, name: "Pijat Laktasi & Oksitosin Ibu Menyusui", slug: "pijat-laktasi-oksitosin", category: "Mom Care", description: "Pijat terapi payudara, tengkuk, dan punggung untuk merangsang pelepasan hormon prolaktin dan oksitosin. Bermanfaat mengatasi masalah ASI tersumbat (seret), meredakan payudara bengkak, memberikan efek relaksasi yang mendalam bagi ibu menyusui, serta melancarkan aliran ASI.", price: 200000, duration: 60, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80" },
      { id: 3, name: "Prenatal Massage (Pijat Ibu Hamil)", slug: "prenatal-massage-ibu-hamil", category: "Mom Care", description: "Relaksasi khusus ibu hamil mulai dari trimester kedua (usia kandungan di atas 14 minggu). Bermanfaat untuk meredakan nyeri punggung bawah, kaki bengkak, mengurangi kecemasan, serta merelaksasikan otot-otot yang tegang demi mempersiapkan persalinan yang lancar.", price: 225000, duration: 75, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80" },
      { id: 4, name: "Newborn Care & Perawatan Tali Pusat", slug: "newborn-care-perawatan-tali-pusat", category: "Baby Care", description: "Layanan kunjungan ke rumah untuk membantu memandikan bayi baru lahir (newborn), melakukan perawatan tali pusat secara steril, serta memberikan pelatihan dan edukasi cara merawat bayi, membedong, dan teknik menyusui (latch-on) yang benar bagi ibu baru.", price: 150000, duration: 45, image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80" },
      { id: 5, name: "Postnatal Massage & Perawatan Ibu Nifas", slug: "postnatal-massage-nifas", category: "Mom Care", description: "Perawatan komprehensif bagi ibu pasca melahirkan. Meliputi pijat seluruh badan untuk mengembalikan kebugaran, memperlancar nifas, pemakaian bengkung/gurita, totok wajah relaksasi, dan pemantauan kondisi fisik umum pasca bersalin.", price: 250000, duration: 90, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80" },
      { id: 6, name: "Nebulizer & Pijat Batuk Pilek Anak", slug: "nebulizer-pijat-batuk-pilek-anak", category: "Kids Care", description: "Layanan fisioterapi dada bagi anak yang sedang menderita batuk pilek dan hidung tersumbat. Meliputi terapi inhalasi uap (nebulizer) dengan cairan fisiologis steril untuk mengencerkan lendir, dilanjutkan dengan pijat dada-punggung untuk melegakan pernapasan.", price: 180000, duration: 45, image: "https://images.unsplash.com/photo-1484665754804-74b091211472?w=800&auto=format&fit=crop&q=80" },
      { id: 7, name: "Tindak Telinga Bayi Steril & Aman", slug: "tindak-telinga-bayi-steril", category: "Baby Care", description: "Layanan penindikan telinga bayi perempuan menggunakan alat tindik khusus berstandar medis sekali pakai yang steril, cepat, aman, dan minim rasa sakit. Sudah termasuk anting hypoallergenic (anti-alergi) yang aman untuk kulit sensitif bayi.", price: 130000, duration: 30, image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&auto=format&fit=crop&q=80" },
      { id: 8, name: "Konsultasi KB & Pelayanan Pemeriksaan Umum", slug: "konsultasi-kb-pemeriksaan-kebidanan", category: "Midwifery", description: "Konsultasi lengkap pilihan keluarga berencana (KB) pasca melahirkan, pemeriksaan tekanan darah, pemeriksaan detak jantung janin (Doppler) untuk ibu hamil, konsultasi keluhan kehamilan, serta penyuluhan nutrisi sehat untuk ibu dan janin.", price: 100000, duration: 45, image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&auto=format&fit=crop&q=80" },
    ];
    service.value = staticServices.find(s => s.slug === slug) || null;
  }
};

onMounted(() => {
  fetchService();
});

watch(() => route.params.slug, () => {
  fetchService();
});
</script>

<style scoped>
.service-detail-page {
  background-color: #FFFBF7 !important;
  min-height: 100vh;
}
.leading-tight {
  line-height: 1.2;
}
.benefit-list {
  list-style-type: disc;
  padding-left: 20px;
}
.gap-4 {
  gap: 16px;
}
.bg-white {
  background-color: white !important;
}
</style>
