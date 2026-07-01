<template>
  <div class="layanan-page bg-cream-base pb-12">
    <!-- Header Section -->
    <v-sheet color="navy" class="py-16 text-white text-center position-relative mb-12">
      <div class="header-bg-wrapper">
        <img src="/images/Bg-Homecare.jpg" alt="Background" class="header-bg-img" />
      </div>
      <div class="header-overlay"></div>
      
      <v-container class="max-width-lg position-relative z-10">
        <span class="text-teal font-weight-bold text-uppercase tracking-wider d-block mb-2">KATALOG PERAWATAN</span>
        <h1 class="text-h3 font-weight-black mb-4 font-playfair">Layanan & Tarif Homecare</h1>
        <div class="accent-line mx-auto mb-4"></div>
        <p class="text-subtitle-1 text-grey-200 max-w-600 mx-auto">
          Daftar lengkap stimulasi spa, pijat terapi, dan asuhan kebidanan profesional untuk Ibu, Bayi, dan Anak di rumah Anda.
        </p>
      </v-container>
    </v-sheet>

    <v-container class="max-width-lg">
      <!-- Search & Filters -->
      <v-row class="mb-10 align-center gy-4">
        <!-- Search Field -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Cari Perawatan..."
            variant="outlined"
            density="comfortable"
            color="primary"
            class="bg-white rounded-lg elevation-1"
            hide-details
          ></v-text-field>
        </v-col>
        
        <!-- Category Filters -->
        <v-col cols="12" md="8">
          <v-slide-group show-arrows>
            <v-slide-group-item>
              <v-btn
                :color="selectedCategory === 'All' ? 'primary' : 'navy'"
                :variant="selectedCategory === 'All' ? 'flat' : 'outlined'"
                class="mr-2 text-capitalize font-weight-bold rounded-xl"
                :class="{ 'text-white': selectedCategory === 'All' }"
                @click="selectedCategory = 'All'"
              >
                Semua
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item v-for="cat in categories" :key="cat">
              <v-btn
                :color="selectedCategory === cat ? 'primary' : 'navy'"
                :variant="selectedCategory === cat ? 'flat' : 'outlined'"
                class="mr-2 text-capitalize font-weight-bold rounded-xl"
                :class="{ 'text-white': selectedCategory === cat }"
                @click="selectedCategory = cat"
              >
                {{ cat }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>

      <!-- Services Grid -->
      <v-row v-if="filteredServices.length > 0">
        <v-col v-for="service in filteredServices" :key="service.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="service-card rounded-xl elevation-1 h-100 d-flex flex-column hover-shadow transition-all bg-white">
            <v-img :src="service.image" height="200" cover class="align-end text-white">
              <v-chip color="primary" class="position-absolute top-4 left-4 font-weight-bold" size="x-small">
                {{ service.category }}
              </v-chip>
            </v-img>
            
            <v-card-item class="flex-grow-1 pa-5">
              <h3 class="font-weight-bold text-navy text-subtitle-1 text-wrap mb-2 font-playfair line-clamp-2" style="line-height: 1.4;">
                {{ service.name }}
              </h3>
              
              <div class="d-flex align-center justify-space-between mb-4 text-caption text-grey-500">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-clock-outline" class="mr-1" size="14" color="primary"></v-icon>
                  <span>{{ service.duration }} Menit</span>
                </div>
                <div class="font-weight-bold text-teal">
                  Rp {{ formatPrice(service.price) }}
                </div>
              </div>
              
              <p class="text-caption text-grey-600 line-clamp-3 leading-relaxed">
                {{ service.description }}
              </p>
            </v-card-item>
            
            <v-card-actions class="pa-5 pt-0">
              <v-btn
                :to="`/layanan/${service.slug}`"
                variant="text"
                color="navy"
                size="small"
                class="text-capitalize font-weight-bold px-0 hover-teal-text"
              >
                Detail
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :to="`/booking?service=${encodeURIComponent(service.name)}`"
                color="primary"
                variant="flat"
                size="small"
                class="rounded-lg text-capitalize font-weight-bold px-4 text-white btn-luxury"
              >
                Pesan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-sheet v-else class="text-center py-16 rounded-xl bg-white elevation-1 border border-grey-100">
        <v-icon icon="mdi-baby-face-outline" size="64" color="grey-400" class="mb-4"></v-icon>
        <h3 class="text-h6 font-weight-bold text-navy mb-2 font-playfair">Perawatan Tidak Ditemukan</h3>
        <p class="text-body-2 text-grey-500">Silakan gunakan kata kunci pencarian atau kategori filter lain.</p>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const searchQuery = ref("");
const selectedCategory = ref("All");
const services = ref([]);

const categories = ref(["Mom Care", "Baby Care", "Kids Care", "Midwifery"]);

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const fetchData = async () => {
  try {
    const res = await axios.get("/api/services");
    services.value = res.data;
  } catch (err) {
    console.log("Using static services fallback");
    services.value = [
      { id: 1, name: "Pijat Bayi & Baby Spa Stimulus", slug: "pijat-bayi-baby-spa", category: "Baby Care", description: "Layanan stimulasi tumbuh kembang bayi yang dipandu oleh bidan bersertifikat.", price: 175000, duration: 60, image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=600&auto=format&fit=crop&q=80" },
      { id: 2, name: "Pijat Laktasi & Oksitosin Ibu Menyusui", slug: "pijat-laktasi-oksitosin", category: "Mom Care", description: "Pijat terapi payudara, tengkuk, dan punggung untuk merangsang pelepasan hormon prolaktin dan oksitosin.", price: 200000, duration: 60, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80" },
      { id: 3, name: "Prenatal Massage (Pijat Ibu Hamil)", slug: "prenatal-massage-ibu-hamil", category: "Mom Care", description: "Relaksasi khusus ibu hamil mulai dari trimester kedua.", price: 225000, duration: 75, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80" },
      { id: 4, name: "Newborn Care & Perawatan Tali Pusat", slug: "newborn-care-perawatan-tali-pusat", category: "Baby Care", description: "Layanan kunjungan ke rumah untuk membantu memandikan bayi baru lahir (newborn) dan melakukan perawatan tali pusat secara steril.", price: 150000, duration: 45, image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80" },
      { id: 5, name: "Postnatal Massage & Perawatan Ibu Nifas", slug: "postnatal-massage-nifas", category: "Mom Care", description: "Perawatan komprehensif bagi ibu pasca melahirkan meliputi pijat seluruh badan dan pemakaian bengkung.", price: 250000, duration: 90, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80" },
      { id: 6, name: "Nebulizer & Pijat Batuk Pilek Anak", slug: "nebulizer-pijat-batuk-pilek-anak", category: "Kids Care", description: "Layanan fisioterapi dada bagi anak yang sedang menderita batuk pilek dan hidung tersumbat.", price: 180000, duration: 45, image: "https://images.unsplash.com/photo-1484665754804-74b091211472?w=600&auto=format&fit=crop&q=80" },
      { id: 7, name: "Tindak Telinga Bayi Steril & Aman", slug: "tindak-telinga-bayi-steril", category: "Baby Care", description: "Layanan penindikan telinga bayi perempuan menggunakan alat tindik khusus berstandar medis sekali pakai.", price: 130000, duration: 30, image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=600&auto=format&fit=crop&q=80" },
      { id: 8, name: "Konsultasi KB & Pelayanan Pemeriksaan Umum", slug: "konsultasi-kb-pemeriksaan-kebidanan", category: "Midwifery", description: "Konsultasi lengkap pilihan keluarga berencana (KB) pasca melahirkan.", price: 100000, duration: 45, image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=600&auto=format&fit=crop&q=80" },
    ];
  }
};

const filteredServices = computed(() => {
  return services.value.filter((service) => {
    const matchCategory =
      selectedCategory.value === "All" || service.category === selectedCategory.value;
    const matchSearch =
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.layanan-page {
  font-family: 'Outfit', sans-serif !important;
}
.font-playfair {
  font-family: 'Playfair Display', serif !important;
}

.bg-cream-base {
  background-color: #FFFBF7 !important;
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
  filter: brightness(0.55) blur(1px);
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

/* Service cards */
.service-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #f6f2f0;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(28, 42, 57, 0.08) !important;
  border-color: rgba(255, 142, 114, 0.3);
}
.btn-luxury {
  border-radius: 30px !important;
  box-shadow: 0 4px 12px rgba(255, 142, 114, 0.25) !important;
  transition: all 0.3s ease !important;
}
.btn-luxury:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 142, 114, 0.4) !important;
}
.hover-teal-text:hover {
  color: #FF8E72 !important;
  transition: color 0.2s ease;
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
.bg-white {
  background-color: white !important;
}
</style>
