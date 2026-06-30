<template>
  <div class="about-page">
    <!-- Header Section with background image overlay -->
    <v-sheet color="navy" class="py-16 text-white text-center position-relative mb-12" min-height="40vh" style="display: flex; align-items: center;">
      <div class="header-bg-wrapper">
        <img src="/images/Bg-Homecare.jpg" alt="Background" class="header-bg-img" />
      </div>
      <div class="header-overlay"></div>
      
      <v-container class="max-width-lg position-relative z-10">
        <span class="text-teal font-weight-bold text-uppercase tracking-wider d-block mb-2">PROFIL PENDIRI</span>
        <h1 class="text-h3 font-weight-black mb-4 font-playfair">Mengenal Bidan Lila</h1>
        <div class="accent-line mx-auto mb-4"></div>
        <p class="text-subtitle-1 text-grey-200 max-w-600 mx-auto">
          Mengenal kualifikasi medis, pengalaman klinis, visi misi kebidanan, dan komitmen penuh kasih langsung di rumah Anda.
        </p>
      </v-container>
    </v-sheet>

    <v-container class="max-width-lg py-8">
      <v-row class="gy-12 align-center mb-16">
        <!-- Photo and Credentials -->
        <v-col cols="12" md="5" class="text-center">
          <div class="profile-frame position-relative mx-auto">
            <v-card class="rounded-xl overflow-hidden elevation-6 bg-white pa-4 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1594824813573-246434de83fb?w=800&auto=format&fit=crop&q=80"
                alt="Bidan Lila"
                class="rounded-xl bg-pink-lighten-5 mb-4 profile-portrait-img"
              />
              <h2 class="text-h5 font-weight-bold text-navy mb-1 font-playfair">Bidan Lila, Amd. Keb</h2>
              <span class="text-caption text-primary font-weight-bold uppercase d-block mb-3">Founder & Bidan Homecare</span>
              
              <v-divider class="my-4"></v-divider>
              
              <div class="text-left text-body-2 text-grey-700 px-2 leading-relaxed">
                <div class="mb-2 d-flex align-center"><v-icon icon="mdi-card-account-details-outline" class="mr-2" color="primary"></v-icon><strong>STR No:</strong>&nbsp;34.02.1.2.21-2274839</div>
                <div class="mb-2 d-flex align-center"><v-icon icon="mdi-school-outline" class="mr-2" color="primary"></v-icon><strong>Pendidikan:</strong>&nbsp;Amd. Keb (Kebidanan)</div>
                <div class="mb-2 d-flex align-center"><v-icon icon="mdi-briefcase-outline" class="mr-2" color="primary"></v-icon><strong>Pengalaman:</strong>&nbsp;7+ Tahun Layanan Medis</div>
                <div class="d-flex align-center"><v-icon icon="mdi-badge-account-alert-outline" class="mr-2" color="primary"></v-icon><strong>Sertifikasi:</strong>&nbsp;Mom & Baby Spa, Laktasi</div>
              </div>
            </v-card>
            <div class="decorator-ring"></div>
          </div>
        </v-col>

        <!-- Biography & Visi Misi -->
        <v-col cols="12" md="7">
          <span class="text-primary font-weight-bold text-uppercase tracking-wider mb-2 d-block">DEDIKASI MEDIS</span>
          <h2 class="text-h4 font-weight-bold text-navy mb-6 font-playfair">Mendukung Ibu & Anak Sejak Hari Pertama</h2>
          
          <p class="text-body-1 text-grey-700 leading-relaxed mb-6" style="font-size: 1.05rem !important;">
            Sebagai bidan berlisensi resmi, saya memahami bahwa periode kehamilan, pemulihan pasca melahirkan, dan perawatan bayi baru lahir merupakan momen berharga yang memerlukan penanganan khusus penuh ketelatenan. 
          </p>
          <p class="text-body-2 text-grey-600 leading-relaxed mb-8">
            Homecare Bidan Lila hadir untuk menjembatani kebutuhan tersebut. Kami merancang setiap layanan homecare agar Bunda dan bayi tercinta mendapatkan stimulasi spa relaksasi atau tindakan kebidanan dengan standar steril klinis di dalam ketenangan dan keakraban rumah Bunda sendiri.
          </p>

          <v-row class="gy-6">
            <v-col cols="12" sm="6">
              <v-card variant="outlined" color="primary" class="pa-6 rounded-xl h-100 bg-white border-subtle">
                <v-avatar color="pink-lighten-5" size="48" class="mb-4">
                  <v-icon icon="mdi-eye-outline" color="primary" size="24"></v-icon>
                </v-avatar>
                <h4 class="font-weight-bold text-navy mb-2">Visi Kami</h4>
                <p class="text-caption text-grey-600 leading-relaxed">
                  Menjadi mitra homecare kebidanan keluarga terbaik se-Jabodetabek yang mengutamakan keselamatan medis, higienitas tinggi, serta sentuhan ramah yang menenangkan.
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card variant="outlined" color="teal" class="pa-6 rounded-xl h-100 bg-white border-subtle">
                <v-avatar color="teal-lighten-5" size="48" class="mb-4">
                  <v-icon icon="mdi-heart-pulse" color="teal" size="24"></v-icon>
                </v-avatar>
                <h4 class="font-weight-bold text-teal mb-2">Misi Kami</h4>
                <p class="text-caption text-grey-600 leading-relaxed">
                  Memberikan asuhan kebidanan ilmiah terbaru, memberikan bimbingan menyusui yang suportif, serta membantu mengoptimalkan tumbuh kembang motorik anak.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Certifications Showcase -->
      <div class="text-center mb-16">
        <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">KREDIBILITAS</span>
        <h2 class="text-h4 font-weight-bold text-navy mb-8 font-playfair">Sertifikat Kompetensi Resmi</h2>
        
        <v-row class="justify-center">
          <v-col v-for="cert in certs" :key="cert.title" cols="12" sm="6" md="4">
            <v-card class="pa-6 rounded-xl elevation-2 h-100 text-center bg-white border-pink-lighten-4">
              <v-avatar color="pink-lighten-5" size="64" class="mb-4">
                <v-icon :icon="cert.icon" color="primary" size="30"></v-icon>
              </v-avatar>
              <h4 class="font-weight-bold text-navy mb-2">{{ cert.title }}</h4>
              <p class="text-caption text-grey-600 leading-relaxed">{{ cert.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section bg-pink-lighten-5 rounded-xl pa-8 mb-8">
        <h2 class="text-h4 font-weight-bold text-navy text-center mb-2 font-playfair">Pertanyaan Umum (FAQ)</h2>
        <p class="text-subtitle-2 text-grey-600 text-center mb-8">Hal-hal yang sering ditanyakan mengenai kunjungan homecare.</p>
        
        <v-expansion-panels variant="accordion" class="rounded-lg overflow-hidden elevation-1 bg-white">
          <v-expansion-panel
            v-for="(faq, index) in faqs"
            :key="index"
            :title="faq.q"
            :text="faq.a"
            class="text-navy font-weight-bold"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const certs = ref([
  {
    title: "Surat Tanda Registrasi Bidan (STR)",
    desc: "Lisensi hukum resmi dari Konsil Kebidanan Indonesia yang menyatakan kelayakan praktik kebidanan berstandar nasional.",
    icon: "mdi-certificate-outline",
  },
  {
    title: "Certified Mom & Baby Spa Therapist",
    desc: "Sertifikasi keahlian khusus terapi hidroterapi bayi, pijat stimulasi motorik bayi/anak, dan totok wajah rileksasi ibu.",
    icon: "mdi-baby-face-outline",
  },
  {
    title: "Certified Lactation & Postpartum Care",
    desc: "Keterampilan klinis bersertifikat untuk memijat payudara menyusui, melatih pelekatan ASI, serta perawatan bengkung ibu nifas.",
    icon: "mdi-heart-outline",
  },
]);

const faqs = ref([
  {
    q: "Apakah Bidan Lila benar-benar datang ke rumah?",
    a: "Ya! Konsep layanan kami adalah homecare penuh. Anda hanya perlu menjadwalkan hari dan jam kunjungan. Bidan kami akan datang langsung ke rumah Anda dengan membawa seluruh peralatan perawatan yang dibutuhkan.",
  },
  {
    q: "Area mana saja yang dijangkau oleh Homecare Bidan Lila?",
    a: "Kami melayani seluruh wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, dan Bekasi). Kunjungan terjauh disesuaikan dengan ketersediaan transportasi tim Bidan.",
  },
  {
    q: "Peralatan apa saja yang perlu disiapkan oleh orang tua di rumah?",
    a: "Secara umum, orang tua tidak perlu repot. Tim Bidan Lila sudah memboyong bathtub lipat bayi steril, handuk bersih, matras pijat sekali pakai yang higienis, minyak pijat organik bersertifikat BPOM, dan mainan stimulasi air. Bunda cukup menyediakan air hangat untuk mandi bayi.",
  },
  {
    q: "Bagaimana cara melakukan booking jadwal?",
    a: "Anda bisa langsung mengisi formulir di halaman 'Booking', memilih layanan yang diinginkan, tanggal, dan jam kunjungan. Setelah dikirim, Anda akan dialihkan ke WhatsApp Bidan Lila untuk konfirmasi pembayaran uang muka (jika diperlukan) dan penguncian jadwal.",
  },
]);
</script>

<style scoped>
.about-page {
  font-family: 'Outfit', sans-serif !important;
}
.font-playfair {
  font-family: 'Playfair Display', serif !important;
}

/* Header Section Background overlay */
.header-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.header-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5) blur(1px);
}
.about-page {
  background-color: #FFFBF7 !important;
  min-height: 100vh;
}
.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(135deg, rgba(28, 42, 57, 0.95) 0%, rgba(255, 142, 114, 0.5) 100%);
}
.z-10 {
  z-index: 10;
}
.accent-line {
  width: 60px;
  height: 4px;
  background-color: #FF8E72;
  border-radius: 2px;
}
.max-w-600 {
  max-width: 600px;
}

/* Profile Photo Frame */
.profile-frame {
  max-width: 360px;
  width: 100%;
}
.profile-portrait-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 16px;
}
.decorator-ring {
  position: absolute;
  top: 20px;
  left: -20px;
  width: 100%;
  height: 100%;
  border: 4px solid #FF8E72;
  border-radius: 24px;
  z-index: 1;
}
.border-pink-lighten-4 {
  border-color: #f8bbd0 !important;
}
.border-subtle {
  border-color: #eceff1 !important;
}
.bg-white {
  background-color: white !important;
}

@media (max-width: 959px) {
  .profile-frame {
    max-width: 300px;
    margin-bottom: 2rem;
  }
  .decorator-ring {
    left: -12px;
    top: 12px;
  }
}
</style>