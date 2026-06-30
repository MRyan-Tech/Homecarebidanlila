<template>
  <div class="booking-page bg-cream-base">
    <!-- Header Section -->
    <v-sheet color="navy" class="py-16 text-white text-center position-relative mb-12" min-height="35vh" style="display: flex; align-items: center;">
      <div class="header-bg-wrapper">
        <img src="/images/Bg-Homecare.jpg" alt="Background" class="header-bg-img" />
      </div>
      <div class="header-overlay"></div>
      
      <v-container class="max-width-lg position-relative z-10">
        <span class="text-teal font-weight-bold text-uppercase tracking-wider d-block mb-2">RESERVASI INSTAN</span>
        <h1 class="text-h3 font-weight-black mb-4 font-playfair">Pesan Jadwal Kunjungan</h1>
        <div class="accent-line mx-auto mb-4"></div>
        <p class="text-subtitle-1 text-grey-200 max-w-600 mx-auto">
          Jadwalkan perawatan homecare ke rumah Anda dengan cepat dan mudah. Kami mengurus sisanya.
        </p>
      </v-container>
    </v-sheet>

    <v-container class="max-width-lg py-6">
      <v-row class="gy-10">
        <!-- Info Column -->
        <v-col cols="12" md="4" class="pr-md-6" order="2" order-md="1">
          <v-card class="rounded-xl pa-6 bg-navy text-white h-100 position-relative overflow-hidden elevation-3">
            <div class="decorative-blob"></div>
            
            <h3 class="text-h5 font-weight-bold mb-4 font-playfair text-accent">Panduan Pemesanan</h3>
            <p class="text-body-2 text-grey-300 leading-relaxed mb-6">
              Ikuti langkah mudah berikut untuk mendapatkan layanan homecare langsung di rumah Anda:
            </p>

            <div class="d-flex align-start mb-4">
              <v-avatar color="rgba(255, 255, 255, 0.12)" size="36" class="mr-3 flex-shrink-0">
                <span class="font-weight-bold text-white text-caption">1</span>
              </v-avatar>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-white mb-1">Lengkapi Formulir</h4>
                <p class="text-caption text-grey-400">Isi data Bunda/bayi, alamat lengkap, dan pilih menu perawatan.</p>
              </div>
            </div>

            <div class="d-flex align-start mb-4">
              <v-avatar color="rgba(255, 255, 255, 0.12)" size="36" class="mr-3 flex-shrink-0">
                <span class="font-weight-bold text-white text-caption">2</span>
              </v-avatar>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-white mb-1">Kirim Booking</h4>
                <p class="text-caption text-grey-400">Tekan tombol kirim untuk mengirim data ke database lokal.</p>
              </div>
            </div>

            <div class="d-flex align-start mb-6">
              <v-avatar color="rgba(255, 255, 255, 0.12)" size="36" class="mr-3 flex-shrink-0">
                <span class="font-weight-bold text-white text-caption">3</span>
              </v-avatar>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-white mb-1">Konfirmasi WhatsApp</h4>
                <p class="text-caption text-grey-400">Sistem akan langsung membuka aplikasi WhatsApp secara otomatis tanpa loading lama.</p>
              </div>
            </div>

            <v-divider class="my-6 border-grey-800"></v-divider>

            <h4 class="text-subtitle-1 font-weight-bold text-teal mb-3">Peralatan yang Bidan Bawa:</h4>
            <ul class="amenities-list text-caption text-grey-300 pl-4 leading-relaxed">
              <li class="mb-1">Bathtub bayi lipat steril didisinfeksi</li>
              <li class="mb-1">Matras pijat portabel standar spa</li>
              <li class="mb-1">Minyak pijat organik premium aman kulit</li>
              <li class="mb-1">Alat kesehatan sekali pakai standar higienis</li>
            </ul>
          </v-card>
        </v-col>

        <!-- Form Column -->
        <v-col cols="12" md="8" order="1" order-md="2">
          <v-card class="rounded-xl pa-8 elevation-3 bg-white">
            <h2 class="text-h5 font-weight-bold text-navy mb-2 font-playfair">Formulir Kunjungan</h2>
            <p class="text-caption text-grey-500 mb-6">Isi formulir untuk pemesanan instan. Menekan tombol submit akan langsung mengarahkan Anda ke WhatsApp Bidan Lila.</p>

            <v-form ref="form" v-model="isFormValid" @submit.prevent="submitBooking">
              <v-row class="gy-2">
                <!-- Name -->
                <v-col cols="12">
                  <v-text-field
                    v-model="bookingForm.name"
                    label="Nama Lengkap Bunda / Anak"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-account"
                    :rules="[v => !!v || 'Nama wajib diisi']"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Phone / WA -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="bookingForm.phone"
                    label="Nomor WhatsApp (Aktif)"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-whatsapp"
                    placeholder="Contoh: 0813xxxxxxxx"
                    :rules="[
                      v => !!v || 'Nomor WhatsApp wajib diisi',
                      v => /^[0-9]+$/.test(v) || 'Hanya boleh diisi angka'
                    ]"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Services Dropdown -->
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="bookingForm.serviceName"
                    :items="serviceOptions"
                    label="Pilih Layanan Perawatan"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-baby-face-outline"
                    :rules="[v => !!v || 'Layanan wajib dipilih']"
                    required
                  ></v-select>
                </v-col>

                <!-- Date -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="bookingForm.date"
                    label="Tanggal Kunjungan"
                    type="date"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-calendar-range"
                    :rules="[v => !!v || 'Tanggal wajib diisi']"
                    :min="todayDate"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Time -->
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="bookingForm.time"
                    :items="timeSlots"
                    label="Jam Kunjungan"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-clock-outline"
                    :rules="[v => !!v || 'Jam kunjungan wajib dipilih']"
                    required
                  ></v-select>
                </v-col>

                <!-- Domisili -->
                <v-col cols="12">
                  <v-select
                    v-model="bookingForm.area"
                    :items="['Depok', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Utara', 'Jakarta Pusat', 'Bogor', 'Tangerang', 'Bekasi']"
                    label="Wilayah Domisili (Area Layanan)"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-map-marker"
                    :rules="[v => !!v || 'Wilayah wajib dipilih']"
                    required
                  ></v-select>
                </v-col>

                <!-- Address -->
                <v-col cols="12">
                  <v-textarea
                    v-model="bookingForm.address"
                    label="Alamat Lengkap Rumah"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-home-map-marker"
                    rows="3"
                    placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan patokan rumah"
                    :rules="[v => !!v || 'Alamat wajib diisi']"
                    required
                  ></v-textarea>
                </v-col>

                <!-- Notes -->
                <v-col cols="12">
                  <v-textarea
                    v-model="bookingForm.notes"
                    label="Catatan Khusus / Riwayat Keluhan (Opsional)"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-note-text-outline"
                    rows="2"
                    placeholder="Tulis keluhan bayi kembung, ASI tersumbat, riwayat hamil, dll."
                  ></v-textarea>
                </v-col>

                <!-- Submit Button -->
                <v-col cols="12">
                  <v-btn
                    type="submit"
                    color="primary"
                    block
                    size="large"
                    class="rounded-lg text-capitalize font-weight-bold py-3 text-white btn-submit-luxury"
                    :disabled="!isFormValid || submitting"
                    :loading="submitting"
                    prepend-icon="mdi-whatsapp"
                    elevation="4"
                  >
                    Kirim Booking & Chat WhatsApp (Instan)
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>

            <v-alert
              v-if="submitMessage"
              :type="submitSuccess ? 'success' : 'info'"
              class="mt-6 rounded-lg text-body-2"
              closable
            >
              {{ submitMessage }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const form = ref(null);
const isFormValid = ref(false);
const submitting = ref(false);
const submitMessage = ref("");
const submitSuccess = ref(false);

const serviceOptions = ref([]);

const timeSlots = ref([
  "08:00 WIB",
  "09:30 WIB",
  "11:00 WIB",
  "13:00 WIB",
  "14:30 WIB",
  "16:00 WIB",
  "18:30 WIB"
]);

// Minimum date is today
const todayDate = ref("");
onMounted(() => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  todayDate.value = `${yyyy}-${mm}-${dd}`;
});

const bookingForm = ref({
  name: "",
  phone: "",
  serviceName: "",
  date: "",
  time: "",
  area: "",
  address: "",
  notes: "",
});

const generateBookingCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BL-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const fetchServices = async () => {
  try {
    const res = await axios.get("/api/services");
    serviceOptions.value = res.data.map(s => s.name);
  } catch (err) {
    serviceOptions.value = [
      "Pijat Bayi & Baby Spa Stimulus",
      "Pijat Laktasi & Oksitosin Ibu Menyusui",
      "Prenatal Massage (Pijat Ibu Hamil)",
      "Newborn Care & Perawatan Tali Pusat",
      "Postnatal Massage & Perawatan Ibu Nifas",
      "Nebulizer & Pijat Batuk Pilek Anak",
      "Tindak Telinga Bayi Steril & Aman",
      "Konsultasi KB & Pelayanan Pemeriksaan Umum"
    ];
  }

  // Pre-select service if passed in query param
  if (route.query.service) {
    const matchedService = serviceOptions.value.find(
      s => s.toLowerCase() === decodeURIComponent(route.query.service).toLowerCase()
    );
    if (matchedService) {
      bookingForm.value.serviceName = matchedService;
    }
  }
};

const submitBooking = async () => {
  submitting.value = true;
  submitMessage.value = "";
  submitSuccess.value = false;

  const bookingCode = generateBookingCode();

  // 1. Prepare WhatsApp auto-message text
  const messageText = `Halo Bidan Lila, saya ingin mengonfirmasi booking Homecare dengan detail berikut:
----------------------------------------
Kode Booking : ${bookingCode}
Nama Pasien   : ${bookingForm.value.name}
Layanan       : ${bookingForm.value.serviceName}
Jadwal Kunjungan: ${bookingForm.value.date} pukul ${bookingForm.value.time}
Wilayah       : ${bookingForm.value.area}
Alamat Rumah  : ${bookingForm.value.address}
Catatan/Keluhan: ${bookingForm.value.notes || "-"}
----------------------------------------
Mohon konfirmasi ketersediaan jadwal. Terima kasih!`;

  const encodedMessage = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/6281365417753?text=${encodedMessage}`;

  // 2. Open WhatsApp IMMEDIATELY (prevents popup blockers since it's synchronous to user click)
  const waWindow = window.open(waUrl, "_blank");
  
  // 3. Save to database in the background concurrently
  try {
    const payload = {
      bookingCode,
      name: bookingForm.value.name,
      phone: bookingForm.value.phone,
      serviceName: bookingForm.value.serviceName,
      date: bookingForm.value.date,
      time: bookingForm.value.time,
      address: `${bookingForm.value.address}, ${bookingForm.value.area}`,
      notes: bookingForm.value.notes,
    };

    await axios.post("/api/bookings", payload);
    
    submitSuccess.value = true;
    submitMessage.value = `Pemesanan berhasil disimpan! Kode Booking Anda: ${bookingCode}. WhatsApp telah dibuka di tab baru.`;
    
    // Clear form
    form.value.reset();
  } catch (err) {
    console.error("Gagal menyimpan ke DB lokal:", err);
    // WhatsApp opened successfully, so we still show confirmation
    submitSuccess.value = true;
    submitMessage.value = `Pesan WhatsApp telah dikirim! Kode Booking Anda: ${bookingCode} (Koneksi database offline).`;
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.booking-page {
  font-family: 'Outfit', sans-serif !important;
}
.font-playfair {
  font-family: 'Playfair Display', serif !important;
}

.bg-cream-base {
  background-color: #FAF6F0 !important;
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
  background: linear-gradient(135deg, rgba(43, 56, 70, 0.95) 0%, rgba(214, 159, 150, 0.5) 100%);
}
.z-10 {
  z-index: 10;
}
.accent-line {
  width: 60px;
  height: 4px;
  background-color: #D69F96;
  border-radius: 2px;
}
.max-w-600 {
  max-width: 600px;
}

/* Info Card decoration */
.decorative-blob {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(214, 159, 150, 0.18);
  z-index: 1;
}
.text-accent {
  color: #E4B373 !important;
}
.border-grey-800 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
.amenities-list {
  list-style-type: square;
}
.bg-white {
  background-color: white !important;
}

.btn-submit-luxury {
  border-radius: 30px !important;
  box-shadow: 0 8px 20px rgba(214, 159, 150, 0.3) !important;
  transition: all 0.3s ease !important;
}
.btn-submit-luxury:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(214, 159, 150, 0.45) !important;
}
</style>
