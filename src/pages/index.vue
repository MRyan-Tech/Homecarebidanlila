<template>
  <div class="home-page bg-cream-base">
    <!-- Hero Section with Glassmorphism overlay and Background Image -->
    <v-sheet class="hero-section py-16 position-relative d-flex align-center" min-height="95vh">
      <div class="hero-bg-wrapper">
        <img src="/images/Bg-Homecare.jpg" alt="Background" class="hero-bg-img" />
      </div>
      <div class="hero-overlay"></div>
      
      <v-container class="max-width-lg position-relative z-10 py-12">
        <v-row align="center" class="gy-12">
          <!-- Text Content -->
          <v-col cols="12" md="6" class="text-left text-white pr-md-8">
            <v-chip
              color="accent"
              variant="flat"
              class="font-weight-bold text-navy text-uppercase tracking-wider mb-6 px-4 py-2 custom-badge-pulse"
              size="small"
              elevation="2"
            >
              ✨ Bidan Resmi STR Aktif & Bersertifikat
            </v-chip>
            
            <h1 class="text-h2 font-weight-black text-white mb-6 leading-tight font-playfair">
              Sentuhan Medis Profesional, <span class="text-accent italic font-weight-light">Rileks di Rumah Sendiri.</span>
            </h1>
            
            <p class="text-body-1 text-grey-200 mb-8 max-w-550" style="line-height: 1.9; font-size: 1.15rem !important;">
              Bidan Lila menghadirkan layanan homecare premium untuk Ibu & Bayi se-Jabodetabek. Mulai dari Baby Spa stimulus tumbuh kembang, Pijat Laktasi pelancar ASI, hingga Prenatal Massage yang dirancang khusus oleh tenaga medis berlisensi resmi.
            </p>
            
            <div class="d-flex flex-wrap gap-4 mb-8">
              <v-btn
                to="/booking"
                color="primary"
                size="large"
                class="rounded-xl px-8 font-weight-bold text-capitalize btn-luxury"
                elevation="4"
                prepend-icon="mdi-calendar-heart"
              >
                Booking Kunjungan
              </v-btn>
              
              <v-btn
                href="https://wa.me/6281365417753?text=Halo%20Bidan%20Lila%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20homecare"
                target="_blank"
                color="white"
                variant="outlined"
                size="large"
                class="rounded-xl px-8 font-weight-bold text-capitalize bg-glass btn-glass-hover"
                prepend-icon="mdi-whatsapp"
              >
                Konsultasi WhatsApp
              </v-btn>
            </div>
            
            <!-- Quick Credibility Features (Hidden on mobile to save vertical space) -->
            <div class="d-none d-md-flex flex-wrap align-center gap-6 pt-6 border-t border-white-15">
              <div class="d-flex align-center">
                <v-avatar color="rgba(255, 255, 255, 0.12)" size="38" class="mr-3">
                  <v-icon icon="mdi-shield-account-outline" color="primary" size="20"></v-icon>
                </v-avatar>
                <div>
                  <span class="text-caption font-weight-bold text-white d-block">Bidan Profesional</span>
                  <span class="text-xxs text-grey-400 d-block">STR Kebidanan Aktif</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <v-avatar color="rgba(255, 255, 255, 0.12)" size="38" class="mr-3">
                  <v-icon icon="mdi-flower-outline" color="primary" size="20"></v-icon>
                </v-avatar>
                <div>
                  <span class="text-caption font-weight-bold text-white d-block">Terapi Bersertifikat</span>
                  <span class="text-xxs text-grey-400 d-block">Mom & Baby Spa Specialist</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <v-avatar color="rgba(255, 255, 255, 0.12)" size="38" class="mr-3">
                  <v-icon icon="mdi-truck-delivery-outline" color="primary" size="20"></v-icon>
                </v-avatar>
                <div>
                  <span class="text-caption font-weight-bold text-white d-block">Praktis di Rumah</span>
                  <span class="text-xxs text-grey-400 d-block">Membawa Alat Steril Lengkap</span>
                </div>
              </div>
            </div>
          </v-col>
          
          <!-- Interactive Brochure Frame -->
          <v-col cols="12" md="6" class="d-flex justify-center position-relative">
            <div class="brochure-container">
              <div class="glass-bg"></div>
              <img
                src="/images/image1.jpg"
                alt="Brosur Layanan Bidan Lila"
                class="brochure-img rounded-xl"
              />
              <div class="pulse-ring"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Interactive Statistics / Milestones row -->
    <v-sheet color="white" class="py-12 border-b border-grey-100">
      <v-container class="max-width-lg">
        <v-row class="text-center justify-center gy-8">
          <v-col v-for="stat in milestones" :key="stat.label" cols="6" md="3" class="animate-scroll">
            <div class="text-h3 font-weight-black text-primary mb-1 font-playfair">{{ stat.count }}</div>
            <div class="text-subtitle-2 font-weight-bold text-navy mb-1">{{ stat.label }}</div>
            <div class="text-caption text-grey-500">{{ stat.sub }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Categories Section -->
    <v-container class="max-width-lg py-20">
      <div class="text-center mb-16 animate-scroll">
        <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">KATEGORI PERAWATAN</span>
        <h2 class="text-h4 font-weight-bold text-navy font-playfair">Layanan Homecare Terlengkap</h2>
        <div class="accent-line mx-auto mt-3"></div>
      </div>
      
      <v-row>
        <v-col v-for="cat in categories" :key="cat.title" cols="6" sm="6" md="3" class="animate-scroll">
          <v-card class="category-card rounded-xl text-center pa-8 h-100 elevation-1 hover-shadow-primary transition-all">
            <v-avatar :color="cat.bgColor" size="80" class="mb-5 custom-avatar-glow">
              <v-icon :icon="cat.icon" :color="cat.iconColor" size="36"></v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold text-navy mb-3 font-playfair">{{ cat.title }}</h3>
            <p class="text-body-2 text-grey-600 mb-6 leading-relaxed d-none d-sm-block">{{ cat.desc }}</p>
            <v-btn
              to="/layanan"
              color="primary"
              variant="text"
              class="text-capitalize font-weight-bold hover-arrow"
              append-icon="mdi-arrow-right"
            >
              Lihat Detail
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- About Bidan Lila Intro Section (Using about-img.png local image) -->
    <v-sheet color="white" class="py-20 border-t border-b border-grey-100">
      <v-container class="max-width-lg py-4">
        <v-row align="center" class="gy-12">
          <v-col cols="12" md="5" class="d-flex justify-center animate-scroll">
            <div class="about-image-frame position-relative">
              <img
                src="https://images.unsplash.com/photo-1531062991700-403473034c9d?w=800&auto=format&fit=crop&q=80"
                alt="Tentang Bidan Lila"
                class="about-img rounded-xl elevation-6"
              />
              <div class="frame-decorator border-primary"></div>
            </div>
          </v-col>
          
          <v-col cols="12" md="7" class="pl-md-10 animate-scroll">
            <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">PROFIL MEDIS</span>
            <h2 class="text-h4 font-weight-bold text-navy mb-6 font-playfair">Asuhan Kebidanan Ramah Keluarga</h2>
            <p class="text-body-1 text-grey-700 leading-relaxed mb-6" style="font-size: 1.08rem !important; line-height: 1.8;">
              Bidan Lila percaya bahwa setiap fase tumbuh kembang si kecil dan pemulihan tubuh Bunda pasca melahirkan adalah momen sakral yang butuh asuhan profesional dan penuh empati.
            </p>
            <p class="text-body-2 text-grey-600 leading-relaxed mb-8 d-none d-sm-block">
              Tanpa perlu mengantre lama di klinik atau membuang tenaga di tengah kemacetan Jabodetabek, kami hadir membawa seluruh fasilitas spa portabel lengkap, disterilisasi dengan standar medis, serta produk minyak aromaterapi organik berkualitas demi kenyamanan maksimal Bunda sekeluarga.
            </p>
            
            <v-row class="mb-8 gy-4">
              <v-col cols="6" sm="4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-check-circle" color="primary" class="mr-2" size="20"></v-icon>
                  <span class="text-caption font-weight-bold text-navy">Peralatan Steril</span>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-check-circle" color="primary" class="mr-2" size="20"></v-icon>
                  <span class="text-caption font-weight-bold text-navy">Minyak Organik</span>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-check-circle" color="primary" class="mr-2" size="20"></v-icon>
                  <span class="text-caption font-weight-bold text-navy">Bathtub Portabel</span>
                </div>
              </v-col>
            </v-row>

            <div class="d-flex gap-4">
              <v-btn to="/tentang-kami" color="navy" class="rounded-xl px-6 text-capitalize font-weight-bold btn-luxury" prepend-icon="mdi-account-heart">
                Kenal Bidan Lila
              </v-btn>
              <v-btn to="/booking" color="primary" variant="outlined" class="rounded-xl px-6 text-capitalize font-weight-bold bg-white">
                Reservasi Sekarang
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Why Choose Us Section with visual tiles -->
    <v-sheet color="navy" class="py-20 text-white text-center position-relative overflow-hidden">
      <div class="bg-pattern-overlay"></div>
      <v-container class="max-width-lg py-6 position-relative z-10">
        <span class="text-accent font-weight-bold text-uppercase tracking-wider d-block mb-2">INTEGRITAS & LISENSI</span>
        <h2 class="text-h4 font-weight-bold text-white mb-12 font-playfair">Mengapa Bunda Mempercayakan Kami?</h2>
        
        <v-row class="gy-8">
          <v-col v-for="item in features" :key="item.title" cols="12" md="4" class="animate-scroll">
            <v-card bg-color="rgba(255, 255, 255, 0.04)" class="text-center pa-8 rounded-xl border border-white-05 text-white h-100 glass-card">
              <v-avatar color="rgba(228, 179, 115, 0.15)" size="70" class="mb-5">
                <v-icon :icon="item.icon" color="accent" size="35"></v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold text-white mb-3 font-playfair">{{ item.title }}</h3>
              <p class="text-body-2 text-grey-300 leading-relaxed d-none d-sm-block" style="font-size: 0.9rem !important;">{{ item.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Featured Services Section -->
    <v-container class="max-width-lg py-20">
      <div class="text-center mb-16 animate-scroll">
        <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">TERFAVORIT</span>
        <h2 class="text-h4 font-weight-bold text-navy font-playfair">Layanan Utama Paling Sering Dipesan</h2>
        <div class="accent-line mx-auto mt-3"></div>
      </div>

      <v-row>
        <v-col v-for="service in featuredServices" :key="service.id" cols="12" md="4" class="animate-scroll">
          <v-card class="service-card rounded-xl elevation-1 h-100 hover-shadow transition-all d-flex flex-column bg-white">
            <v-img :src="service.image" cover class="align-end text-white position-relative service-card-img">
              <v-chip color="primary" class="position-absolute top-4 left-4 font-weight-bold" size="small">
                {{ service.category }}
              </v-chip>
            </v-img>
            
            <v-card-item class="flex-grow-1 pa-6">
              <v-card-title class="font-weight-bold text-navy text-h6 text-wrap mb-3 font-playfair">
                {{ service.name }}
              </v-card-title>
              
              <div class="d-flex align-center gap-4 mb-4 text-caption text-grey-500">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-clock-outline" class="mr-1" size="16" color="primary"></v-icon>
                  <span>{{ service.duration }} Menit</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-cash" class="mr-1" size="16" color="secondary"></v-icon>
                  <span class="font-weight-bold text-teal">Rp {{ formatPrice(service.price) }}</span>
                </div>
              </div>
              
              <p class="text-body-2 text-grey-600 line-clamp-3 leading-relaxed d-none d-sm-block">
                {{ service.description }}
              </p>
            </v-card-item>
            
            <v-card-actions class="pa-6 pt-0">
              <v-btn
                :to="`/layanan/${service.slug}`"
                variant="text"
                color="navy"
                class="text-capitalize font-weight-bold px-0"
              >
                Detail Layanan
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :to="`/booking?service=${encodeURIComponent(service.name)}`"
                color="primary"
                variant="flat"
                class="rounded-lg text-capitalize font-weight-bold px-5 btn-luxury"
              >
                Pesan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Testimonials Section -->
    <v-sheet color="white" class="py-20 border-t border-b border-grey-100">
      <v-container class="max-width-lg">
        <div class="text-center mb-16 animate-scroll">
          <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">TESTIMONI</span>
          <h2 class="text-h4 font-weight-bold text-navy font-playfair">Apa Kata Para Bunda?</h2>
          <div class="accent-line mx-auto mt-3"></div>
        </div>

        <v-row class="justify-center">
          <v-col v-for="testi in testimonials" :key="testi.name" cols="12" md="5" class="animate-scroll">
            <v-card class="rounded-xl pa-8 h-100 border border-grey-100 d-flex flex-column justify-space-between bg-white position-relative shadow-sm hover-shadow-primary transition-all">
              <v-icon icon="mdi-format-quote-open" color="pink-lighten-5" size="64" class="position-absolute" style="top: 15px; right: 15px; opacity: 0.8;"></v-icon>
              <div>
                <div class="d-flex mb-4">
                  <v-icon v-for="i in 5" :key="i" icon="mdi-star" color="warning" size="18"></v-icon>
                </div>
                <p class="text-body-2 text-grey-700 italic mb-6 leading-relaxed">
                  "{{ testi.comment }}"
                </p>
              </div>
              <div class="d-flex align-center pt-4 border-t border-grey-100">
                <v-avatar color="grey-200" size="50" class="mr-4 border border-primary">
                  <v-img :src="testi.image" alt="Avatar Pelanggan"></v-img>
                </v-avatar>
                <div>
                  <h4 class="font-weight-bold text-navy text-subtitle-1 font-playfair">{{ testi.name }}</h4>
                  <span class="text-caption text-grey-500">{{ testi.status }}</span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Latest SEO Blog Articles -->
    <v-container class="max-width-lg py-20">
      <div class="text-center mb-16 animate-scroll">
        <span class="text-primary font-weight-bold text-uppercase tracking-wider d-block mb-2">EDUKASI KEBIDANAN</span>
        <h2 class="text-h4 font-weight-bold text-navy font-playfair">Tips Penting Seputar Ibu & Bayi</h2>
        <div class="accent-line mx-auto mt-3"></div>
      </div>

      <v-row v-if="articles.length > 0">
        <v-col v-for="article in articles.slice(0, 3)" :key="article.id" cols="12" md="4" class="animate-scroll">
          <v-card class="rounded-xl elevation-1 h-100 d-flex flex-column hover-shadow transition-all bg-white">
            <v-img :src="article.image" class="article-card-img" cover></v-img>
            <v-card-item class="flex-grow-1 pa-6">
              <span class="text-caption font-weight-bold text-teal d-block mb-1">{{ article.category }}</span>
              <h3 class="text-h6 font-weight-bold text-navy mb-2 line-clamp-2 font-playfair">
                <router-link :to="`/artikel/${article.slug}`" class="text-decoration-none text-navy hover-teal-text">
                  {{ article.title }}
                </router-link>
              </h3>
              <p class="text-body-2 text-grey-600 line-clamp-3 leading-relaxed d-none d-sm-block">
                {{ article.summary }}
              </p>
            </v-card-item>
            <v-card-actions class="pa-6 pt-0">
              <v-btn :to="`/artikel/${article.slug}`" color="primary" variant="text" class="text-capitalize font-weight-bold px-0" append-icon="mdi-chevron-right">
                Baca Selengkapnya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      <div class="text-center mt-8 animate-scroll">
        <v-btn to="/artikel" color="navy" variant="outlined" class="rounded-lg text-capitalize font-weight-bold px-6">
          Lihat Semua Artikel
        </v-btn>
      </div>
    </v-container>

    <!-- Coverage Area Section -->
    <v-sheet color="navy" class="py-20 text-white text-center position-relative">
      <div class="bg-pattern-overlay"></div>
      <v-container class="max-width-lg position-relative z-10">
        <v-row align="center" class="gy-10">
          <v-col cols="12" md="6" class="text-left pr-md-10">
            <span class="text-teal font-weight-bold text-uppercase tracking-wider mb-2 d-block text-subtitle-1">WILAYAH OPERASIONAL</span>
            <h2 class="text-h4 font-weight-bold text-white mb-6 font-playfair">Melayani Kunjungan Se-Jabodetabek</h2>
            <p class="text-body-2 text-grey-300 leading-relaxed mb-8" style="font-size: 0.95rem !important;">
              Bidan Lila melayani pemesanan ke seluruh wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Tim bidan kami akan membawa seluruh perlengkapan medis steril dan bathtub mandi lipat sekali pakai langsung ke rumah Bunda.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <v-chip color="teal" variant="flat" text-color="white" class="font-weight-bold px-4 py-2">📍 Depok</v-chip>
              <v-chip color="teal" variant="flat" text-color="white" class="font-weight-bold px-4 py-2">📍 Jakarta</v-chip>
              <v-chip color="teal" variant="flat" text-color="white" class="font-weight-bold px-4 py-2">📍 Bogor</v-chip>
              <v-chip color="teal" variant="flat" text-color="white" class="font-weight-bold px-4 py-2">📍 Tangerang</v-chip>
              <v-chip color="teal" variant="flat" text-color="white" class="font-weight-bold px-4 py-2">📍 Bekasi</v-chip>
            </div>
          </v-col>
          
          <v-col cols="12" md="6" class="animate-scroll">
            <v-card class="rounded-xl overflow-hidden elevation-10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126881.34185790432!2d106.7725227748882!3d-6.402484394084534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec08469ad413%3A0x145ad3e1bbf3fcf1!2sDepok%2C%20Kota%20Depok%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1719747754321!5m2!1sid!2sid" 
                width="100%" 
                height="360" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const milestones = ref([
  { count: "500+", label: "Bunda & Bayi Puas", sub: "Ulasan bintang 5" },
  { count: "7+ Tahun", label: "Pengalaman Medis", sub: "Bidan terdaftar STR" },
  { count: "100%", label: "Higienis & Steril", sub: "Standar medis klinis" },
  { count: "12 Wilayah", label: "Jangkauan Layanan", sub: "Kunjungan Jabodetabek" },
]);

const categories = ref([
  {
    title: "Mom Care",
    desc: "Pijat kebugaran hamil (prenatal), pijat memperlancar laktasi, serta postnatal massage nifas pasca bersalin.",
    icon: "mdi-heart-outline",
    bgColor: "pink-lighten-5",
    iconColor: "primary",
  },
  {
    title: "Baby Care",
    desc: "Baby Spa relaksasi, renang bayi, potong rambut newborn, tindik telinga medis steril, dan perawatan tali pusat.",
    icon: "mdi-baby-face-outline",
    bgColor: "teal-lighten-5",
    iconColor: "teal",
  },
  {
    title: "Kids Care",
    desc: "Pijat stimulus napsu makan anak, terapi inhalasi nebulizer & pijat batuk pilek (flu/common cold) balita.",
    icon: "mdi-emoticon-baby-outline",
    bgColor: "amber-lighten-5",
    iconColor: "warning",
  },
  {
    title: "Layanan Bidan",
    desc: "Konsultasi keluarga berencana (KB), deteksi detak jantung janin, pemeriksaan nifas umum, dan tips menyusui.",
    icon: "mdi-stethoscope",
    bgColor: "blue-lighten-5",
    iconColor: "info",
  },
]);

const features = ref([
  {
    title: "Bidan STR Resmi & Sertifikasi",
    desc: "Ditangani secara langsung dan eksklusif oleh Bidan berlisensi (STR aktif) yang bersertifikat resmi Mom & Baby Spa serta pijat tumbuh kembang anak.",
    icon: "mdi-card-account-details-star-outline",
  },
  {
    title: "Kebersihan & Keamanan Medis",
    desc: "Semua alat pendukung disterilisasi sebelum digunakan. Kami menggunakan minyak pijat organik premium dan bahan sekali pakai standar higienis.",
    icon: "mdi-sparkles",
  },
  {
    title: "Praktis, Nyaman, Tanpa Macet",
    desc: "Bunda dan si kecil tidak perlu keluar rumah, mengantre lama, atau menembus kemacetan. Cukup jadwalkan, tim Bidan kami akan datang membawakan kenyamanan klinik.",
    icon: "mdi-home-heart",
  },
]);

const testimonials = ref([
  {
    name: "Bunda Ayu & Baby Kenzo",
    status: "Depok, Jawa Barat",
    comment: "Baby Spa dengan Bidan Lila juara banget! Baby Kenzo seneng banget berendamnya, terus abis dipijit langsung bobo nyenyak banget berjam-jam. Bidan Lila telaten, ramah, dan sabar banget meladeni bayi.",
    image: "/images/client1.jpg",
  },
  {
    name: "Bunda Rini",
    status: "Jakarta Selatan",
    comment: "Sempat stres karena ASI seret di hari ke-4 pasca melahirkan. Panggil Bidan Lila buat Pijat Laktasi di rumah. Setelah dipijat punggung dan payudara, badan terasa rileks, dan besoknya ASI langsung rembes deres. Terima kasih!",
    image: "/images/client2.jpg",
  },
]);

const featuredServices = ref([]);
const articles = ref([]);

const fetchData = async () => {
  try {
    const sRes = await axios.get("/api/services");
    featuredServices.value = sRes.data.slice(0, 3);
  } catch (err) {
    console.log("Using static services fallback");
    featuredServices.value = [
      {
        id: 1,
        name: "Pijat Bayi & Baby Spa Stimulus",
        slug: "pijat-bayi-baby-spa",
        category: "Baby Care",
        description: "Layanan stimulasi tumbuh kembang bayi yang dipandu oleh bidan bersertifikat. Meliputi senam bayi (baby gym), berendam air hangat (baby swim), dan pijat stimulasi bayi menggunakan baby oil organic.",
        price: 175000,
        duration: 60,
        image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: 2,
        name: "Pijat Laktasi & Oksitosin Ibu Menyusui",
        slug: "pijat-laktasi-oksitosin",
        category: "Mom Care",
        description: "Pijat terapi payudara, tengkuk, dan punggung untuk merangsang pelepasan hormon prolaktin dan oksitosin. Bermanfaat mengatasi masalah ASI tersumbat (seret) dan payudara bengkak.",
        price: 200000,
        duration: 60,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: 3,
        name: "Prenatal Massage (Pijat Ibu Hamil)",
        slug: "prenatal-massage-ibu-hamil",
        category: "Mom Care",
        description: "Relaksasi khusus ibu hamil mulai dari trimester kedua (usia kandungan di atas 14 minggu). Bermanfaat untuk meredakan nyeri punggung bawah, kaki bengkak, dan mengurangi kecemasan.",
        price: 225000,
        duration: 75,
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
      },
    ];
  }

  try {
    const aRes = await axios.get("/api/articles");
    articles.value = aRes.data;
  } catch (err) {
    console.log("Using static articles fallback");
    articles.value = [
      {
        id: 1,
        title: "5 Manfaat Pijat Bayi (Baby Massage) untuk Tumbuh Kembang Si Kecil",
        slug: "manfaat-pijat-bayi-tumbuh-kembang",
        summary: "Pijat bayi bukan sekadar membuat bayi rileks. Ketahui 5 manfaat ilmiah pijat bayi, mulai dari meningkatkan berat badan, memperlancar pencernaan hingga membuat tidur lebih nyenyak.",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: 2,
        title: "Mengatasi ASI Seret dengan Pijat Laktasi: Panduan Lengkap Ibu Menyusui",
        slug: "mengatasi-asi-seret-dengan-pijat-laktasi",
        summary: "ASI tidak lancar sering membuat ibu cemas. Pijat laktasi adalah solusi alami yang terbukti meningkatkan hormon oksitosin dan melancarkan saluran ASI yang tersumbat.",
        category: "Kesehatan Ibu",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      },
    ];
  }
};

onMounted(() => {
  fetchData();
  
  // Interactive Scroll Intersection Observer setup!
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, { threshold: 0.15 });

  // Select all animate-scroll elements
  document.querySelectorAll(".animate-scroll").forEach((el) => {
    el.classList.add("animate-scroll-init"); // Initial transform state
    observer.observe(el);
  });
});
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
  font-family: 'Outfit', sans-serif !important;
}

/* Font Playfair for titles */
.font-playfair {
  font-family: 'Playfair Display', serif !important;
}

.bg-cream-base {
  background-color: #FFFBF7 !important;
}

/* Hero Section Styles */
.hero-section {
  position: relative;
  overflow: hidden;
  background-color: #0b1522; /* Fallback */
}
.hero-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55) blur(1px);
}
.hero-overlay {
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
  width: 70px;
  height: 4px;
  background-color: #FF8E72; /* Warm Coral Primary */
  border-radius: 2px;
}
.text-accent {
  color: #F8C868 !important; /* Elegant Gold */
}
.bg-glass {
  background-color: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(12px);
  border-color: rgba(255, 255, 255, 0.22) !important;
}
.border-t {
  border-top: 1px solid rgba(255,255,255,0.15);
}
.italic {
  font-style: italic;
}

/* Luxury buttons */
.btn-luxury {
  border-radius: 30px !important;
  box-shadow: 0 8px 24px rgba(214, 159, 150, 0.3) !important;
  transition: all 0.3s ease-in-out !important;
}
.btn-luxury:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 30px rgba(214, 159, 150, 0.45) !important;
}
.btn-glass-hover:hover {
  background-color: rgba(255, 255, 255, 0.18) !important;
  transform: translateY(-3px);
  transition: all 0.3s ease;
}

/* Custom pulse badge */
.custom-badge-pulse {
  animation: pulse-glow 2.5s infinite;
}
@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(228, 179, 115, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(228, 179, 115, 0); }
  100% { box-shadow: 0 0 0 0 rgba(228, 179, 115, 0); }
}

/* Brochure Frame (image1.jpg) */
.brochure-container {
  position: relative;
  width: 100%;
  max-width: 440px;
  z-index: 10;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.brochure-container:hover {
  transform: translateY(-8px) scale(1.02);
}
.glass-bg {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: -1;
  box-shadow: 0 30px 60px rgba(0,0,0,0.35);
}
.brochure-img {
  width: 100%;
  height: auto;
  border: 4px solid white;
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
}

/* About image frame (about-img.png) */
.about-image-frame {
  width: 100%;
  max-width: 380px;
}
.about-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 8px solid white;
  z-index: 2;
  position: relative;
  box-shadow: 0 20px 40px rgba(43, 56, 70, 0.12) !important;
}
.frame-decorator {
  position: absolute;
  top: 25px;
  left: -25px;
  width: 100%;
  height: 100%;
  border: 4px solid #FF8E72; /* Warm Coral */
  border-radius: 16px;
  z-index: 1;
}

/* Category card */
.category-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #f6f3f0;
}
.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(255, 142, 114, 0.15) !important;
  border-color: rgba(255, 142, 114, 0.3);
}
.custom-avatar-glow {
  box-shadow: 0 8px 20px rgba(255, 142, 114, 0.1);
}

/* Why choose us glass card */
.glass-card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.06) !important;
  box-shadow: 0 15px 35px rgba(0,0,0,0.18) !important;
}

/* Service Card */
.service-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #f0ecf0;
}
.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(28, 42, 57, 0.08) !important;
  border-color: rgba(255, 142, 114, 0.3);
}

/* Testimonial card */
.hover-shadow-primary:hover {
  border-color: rgba(255, 142, 114, 0.4) !important;
  box-shadow: 0 15px 35px rgba(255, 142, 114, 0.1) !important;
}

/* Scroll Animation Utilities */
.animate-scroll-init {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.animate-scroll-init.animated {
  opacity: 1;
  transform: translateY(0);
}

.hover-teal-text:hover {
  color: #FF8E72 !important;
  transition: color 0.25s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-card-img {
  height: 240px !important;
}
.article-card-img {
  height: 210px !important;
}

@media (max-width: 959px) {
  .hero-section {
    text-align: center !important;
  }
  .text-left {
    text-align: center !important;
  }
  .max-w-550 {
    margin: 0 auto;
  }
  .brochure-container {
    margin-top: 3rem;
    max-width: 340px;
  }
  .about-image-frame {
    max-width: 300px;
    margin-bottom: 2rem;
  }
  .frame-decorator {
    left: -15px;
    top: 15px;
  }
  .service-card-img {
    height: 150px !important;
  }
  .article-card-img {
    height: 140px !important;
  }
}
</style>
