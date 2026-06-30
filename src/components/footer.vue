<template>
  <v-footer class="bg-grey-900 text-white py-12 px-6 d-block border-t-lg border-primary">
    <v-container class="max-width-lg">
      <v-row class="gy-6">
        <!-- Brand Info -->
        <v-col cols="12" md="4">
          <div class="d-flex align-center mb-4">
            <v-avatar size="50" class="mr-3 bg-white pa-1">
              <v-img src="/images/Logo.png" alt="Logo"></v-img>
            </v-avatar>
            <div>
              <span class="text-h6 font-weight-bold text-white d-block">Homecare Bidan Lila</span>
              <span class="text-caption text-primary font-weight-bold uppercase tracking-wider">Profesional & Penuh Kasih</span>
            </div>
          </div>
          <p class="text-body-2 text-grey-400 mb-6" style="line-height: 1.6;">
            Layanan homecare bidan profesional terpercaya se-Jabodetabek. Kami menghadirkan kenyamanan klinik perawatan ibu dan bayi langsung ke rumah Anda dengan standar higienis medis yang ketat.
          </p>
          <div class="d-flex gap-3">
            <v-btn icon="mdi-instagram" href="https://instagram.com/bidanlila_homecare" target="_blank" color="primary" variant="flat" size="small"></v-btn>
            <v-btn icon="mdi-whatsapp" href="https://wa.me/6281365417753" target="_blank" color="success" variant="flat" size="small"></v-btn>
            <v-btn icon="mdi-facebook" href="#" color="blue" variant="flat" size="small"></v-btn>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" sm="6" md="2">
          <h4 class="text-subtitle-1 font-weight-bold mb-4 border-b pb-2 text-teal">Pintasan</h4>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item v-for="link in quickLinks" :key="link.title" :to="link.path" class="px-0 py-1 hover-teal">
              <span class="text-body-2 text-grey-300">{{ link.title }}</span>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Services Categories -->
        <v-col cols="12" sm="6" md="3">
          <h4 class="text-subtitle-1 font-weight-bold mb-4 border-b pb-2 text-teal">Kategori Layanan</h4>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item v-for="cat in serviceCategories" :key="cat" to="/layanan" class="px-0 py-1 hover-teal">
              <span class="text-body-2 text-grey-300">{{ cat }}</span>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Contact & Location -->
        <v-col cols="12" md="3">
          <h4 class="text-subtitle-1 font-weight-bold mb-4 border-b pb-2 text-teal">Hubungi Kami</h4>
          <div class="d-flex align-start mb-3">
            <v-icon icon="mdi-map-marker" color="primary" class="mr-2 mt-1"></v-icon>
            <span class="text-body-2 text-grey-300">Wilayah Layanan: Depok, Jakarta, Bogor, Tangerang, Bekasi (Se-Jabodetabek)</span>
          </div>
          <div class="d-flex align-center mb-3">
            <v-icon icon="mdi-whatsapp" color="success" class="mr-2"></v-icon>
            <span class="text-body-2 text-grey-300">+62 813-6541-7753</span>
          </div>
          <div class="d-flex align-center mb-3">
            <v-icon icon="mdi-email-outline" color="primary" class="mr-2"></v-icon>
            <span class="text-body-2 text-grey-300">info@bidanlilahomecare.com</span>
          </div>
          <div class="d-flex align-center">
            <v-icon icon="mdi-clock-outline" color="warning" class="mr-2"></v-icon>
            <span class="text-body-2 text-grey-300">Setiap Hari: 07:00 - 21:00</span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-8 border-grey-800"></v-divider>

      <!-- Bottom Credits -->
      <div class="d-flex flex-column flex-sm-row justify-space-between align-center text-caption text-grey-500">
        <div>
          &copy; {{ new Date().getFullYear() }} Homecare Bidan Lila. Hak Cipta Dilindungi.
        </div>
        <div class="d-flex gap-4 mt-2 mt-sm-0">
          <span>STR Bidan: Terdaftar Resmi</span>
          <span>&bull;</span>
          <span>Sertifikasi Mom & Baby Spa</span>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from "vue";

const quickLinks = ref([
  { title: "Beranda", path: "/" },
  { title: "Layanan & Tarif", path: "/layanan" },
  { title: "Artikel Edukasi", path: "/artikel" },
  { title: "Tentang Kami", path: "/tentang-kami" },
  { title: "Booking Jadwal", path: "/booking" },
]);

const serviceCategories = ref([
  "Mom Care (Perawatan Ibu)",
  "Baby Care (Perawatan Bayi)",
  "Kids Care (Perawatan Anak)",
  "Layanan Kebidanan Umum",
]);
</script>

<style scoped>
.bg-grey-900 {
  background-color: #0b1522 !important; /* Very deep navy/black */
}
.text-grey-400 {
  color: #90a4ae !important;
}
.text-grey-300 {
  color: #cfd8dc !important;
}
.text-grey-500 {
  color: #78909c !important;
}
.border-grey-800 {
  border-color: #1e293b !important;
}
.hover-teal:hover span {
  color: #00b0ff !important;
  transition: color 0.2s ease;
}
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
</style>
