<template>
  <div class="admin-dashboard-page py-8">
    <v-container class="max-width-lg">
      <!-- Welcome Header -->
      <v-card class="rounded-xl pa-6 bg-navy text-white mb-8 d-flex align-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-h4 font-weight-bold">Dashboard Admin Bidan Lila</h1>
          <p class="text-subtitle-2 text-grey-300">Selamat datang kembali! Kelola aktivitas homecare di sini.</p>
        </div>
        <v-btn color="primary" variant="flat" class="text-capitalize font-weight-bold rounded-lg" prepend-icon="mdi-logout" @click="handleLogout">
          Log Out
        </v-btn>
      </v-card>

      <!-- Tabs and Tables -->
      <v-card class="rounded-xl bg-white pa-6 elevation-2">
        <v-tabs v-model="tab" color="primary" class="mb-6">
          <v-tab value="bookings" prepend-icon="mdi-calendar-check" class="text-capitalize font-weight-bold">Pemesanan Kunjungan</v-tab>
          <v-tab value="services" prepend-icon="mdi-baby-face-outline" class="text-capitalize font-weight-bold">Daftar Layanan</v-tab>
          <v-tab value="articles" prepend-icon="mdi-book-open-page-variant" class="text-capitalize font-weight-bold">Artikel Edukasi</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <!-- 1. Bookings Tab -->
          <v-window-item value="bookings">
            <v-data-table
              :headers="bookingHeaders"
              :items="bookings"
              class="elevation-0"
              :loading="loadingBookings"
            >
              <template v-slot:item.price="{ item }">
                Rp {{ formatPrice(item.price) }}
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" size="small" class="font-weight-bold">
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props"></v-btn>
                  </template>
                  <v-list density="compact">
                    <v-list-item
                      v-if="item.status === 'Pending'"
                      prepend-icon="mdi-check-circle"
                      title="Konfirmasi Kunjungan"
                      @click="updateBookingStatus(item.id, 'Confirmed')"
                    ></v-list-item>
                    <v-list-item
                      v-if="item.status === 'Confirmed'"
                      prepend-icon="mdi-checkbox-marked-circle"
                      title="Selesai Kunjungan"
                      @click="updateBookingStatus(item.id, 'Completed')"
                    ></v-list-item>
                    <v-list-item
                      v-if="item.status !== 'Cancelled' && item.status !== 'Completed'"
                      prepend-icon="mdi-close-circle"
                      title="Batalkan Kunjungan"
                      @click="updateBookingStatus(item.id, 'Cancelled')"
                    ></v-list-item>
                    <v-list-item
                      prepend-icon="mdi-delete"
                      title="Hapus Data"
                      color="error"
                      @click="deleteBooking(item.id)"
                    ></v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-window-item>

          <!-- 2. Services Tab -->
          <v-window-item value="services">
            <div class="d-flex justify-end mb-4">
              <v-btn color="primary" prepend-icon="mdi-plus" class="text-capitalize font-weight-bold rounded-lg" @click="openAddServiceDialog">
                Tambah Layanan
              </v-btn>
            </div>
            
            <v-data-table
              :headers="serviceHeaders"
              :items="services"
              class="elevation-0"
              :loading="loadingServices"
            >
              <template v-slot:item.price="{ item }">
                Rp {{ formatPrice(item.price) }}
              </template>
              <template v-slot:item.duration="{ item }">
                {{ item.duration }} Menit
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" class="mr-2" @click="openEditServiceDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="deleteService(item.id)"></v-btn>
              </template>
            </v-data-table>
          </v-window-item>

          <!-- 3. Articles Tab -->
          <v-window-item value="articles">
            <div class="d-flex justify-end mb-4">
              <v-btn color="primary" prepend-icon="mdi-plus" class="text-capitalize font-weight-bold rounded-lg" @click="openAddArticleDialog">
                Tulis Artikel Baru
              </v-btn>
            </div>

            <v-data-table
              :headers="articleHeaders"
              :items="articles"
              class="elevation-0"
              :loading="loadingArticles"
            >
              <template v-slot:item.createdAt="{ item }">
                {{ formatDate(item.createdAt) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" class="mr-2" @click="openEditArticleDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="deleteArticle(item.id)"></v-btn>
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>

    <!-- Dialog Service (Add/Edit) -->
    <v-dialog v-model="serviceDialog" max-width="600">
      <v-card class="rounded-xl pa-6 bg-white">
        <v-card-title class="font-weight-bold text-navy text-h6 px-0 mb-4">
          {{ isEditingService ? 'Edit Layanan Homecare' : 'Tambah Layanan Baru' }}
        </v-card-title>
        <v-form ref="serviceFormRef" @submit.prevent="submitServiceForm">
          <v-text-field v-model="serviceForm.name" label="Nama Perawatan" variant="outlined" color="primary" required class="mb-3"></v-text-field>
          <v-select v-model="serviceForm.category" :items="['Mom Care', 'Baby Care', 'Kids Care', 'Midwifery']" label="Kategori" variant="outlined" color="primary" required class="mb-3"></v-select>
          <v-row class="mb-1">
            <v-col cols="6" class="py-0">
              <v-text-field v-model.number="serviceForm.price" label="Tarif (Rupiah)" type="number" variant="outlined" color="primary" required></v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field v-model.number="serviceForm.duration" label="Durasi (Menit)" type="number" variant="outlined" color="primary" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="serviceForm.image" label="URL Foto Gambar Layanan" variant="outlined" color="primary" class="mb-3"></v-text-field>
          <v-textarea v-model="serviceForm.description" label="Deskripsi Detail" variant="outlined" color="primary" rows="4" class="mb-6"></v-textarea>
          
          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="navy" class="text-capitalize rounded-lg px-4" @click="serviceDialog = false">Batal</v-btn>
            <v-btn type="submit" color="primary" variant="flat" class="text-capitalize rounded-lg px-4" :loading="savingService">Simpan</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Dialog Article (Add/Edit) -->
    <v-dialog v-model="articleDialog" max-width="800">
      <v-card class="rounded-xl pa-6 bg-white">
        <v-card-title class="font-weight-bold text-navy text-h6 px-0 mb-4">
          {{ isEditingArticle ? 'Edit Artikel Edukasi' : 'Tulis Artikel Baru' }}
        </v-card-title>
        <v-form ref="articleFormRef" @submit.prevent="submitArticleForm">
          <v-text-field v-model="articleForm.title" label="Judul Artikel" variant="outlined" color="primary" required class="mb-3"></v-text-field>
          <v-row class="mb-1">
            <v-col cols="6" class="py-0">
              <v-select v-model="articleForm.category" :items="['Kesehatan Ibu', 'Kesehatan Anak', 'Kesehatan Bayi', 'Tips Menyusui']" label="Kategori" variant="outlined" color="primary" required></v-select>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field v-model="articleForm.keywords" label="SEO Keywords (pisahkan dengan koma)" placeholder="pijat bayi, baby spa, dll" variant="outlined" color="primary"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="articleForm.image" label="URL Gambar Utama" variant="outlined" color="primary" class="mb-3"></v-text-field>
          <v-textarea v-model="articleForm.summary" label="Ringkasan Pendek (Summary)" variant="outlined" color="primary" rows="2" required class="mb-3"></v-textarea>
          
          <div class="text-subtitle-2 font-weight-bold text-grey-700 mb-2">Konten Artikel (Bisa diisi HTML)</div>
          <v-textarea v-model="articleForm.content" placeholder="Tulis artikel lengkap di sini..." variant="outlined" color="primary" rows="10" required class="mb-6"></v-textarea>

          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="navy" class="text-capitalize rounded-lg px-4" @click="articleDialog = false">Batal</v-btn>
            <v-btn type="submit" color="primary" variant="flat" class="text-capitalize rounded-lg px-4" :loading="savingArticle">Terbitkan</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const tab = ref("bookings");

const bookings = ref([]);
const services = ref([]);
const articles = ref([]);

const loadingBookings = ref(false);
const loadingServices = ref(false);
const loadingArticles = ref(false);

// Service dialog variables
const serviceDialog = ref(false);
const isEditingService = ref(false);
const savingService = ref(false);
const currentServiceId = ref(null);
const serviceForm = ref({
  name: "",
  category: "Mom Care",
  price: 150000,
  duration: 60,
  image: "",
  description: "",
});

// Article dialog variables
const articleDialog = ref(false);
const isEditingArticle = ref(false);
const savingArticle = ref(false);
const currentArticleId = ref(null);
const articleForm = ref({
  title: "",
  category: "Kesehatan Anak",
  keywords: "",
  image: "",
  summary: "",
  content: "",
});

// Table headers
const bookingHeaders = [
  { title: "Kode", key: "bookingCode", fontStyle: "bold" },
  { title: "Nama", key: "name" },
  { title: "Layanan", key: "serviceName" },
  { title: "Tanggal", key: "date" },
  { title: "Waktu", key: "time" },
  { title: "Alamat", key: "address" },
  { title: "Status", key: "status" },
  { title: "Aksi", key: "actions", sortable: false },
];

const serviceHeaders = [
  { title: "Nama Layanan", key: "name" },
  { title: "Kategori", key: "category" },
  { title: "Durasi", key: "duration" },
  { title: "Tarif", key: "price" },
  { title: "Aksi", key: "actions", sortable: false },
];

const articleHeaders = [
  { title: "Judul Artikel", key: "title" },
  { title: "Kategori", key: "category" },
  { title: "Tanggal Terbit", key: "createdAt" },
  { title: "Aksi", key: "actions", sortable: false },
];

const getHeadersConfig = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const formatPrice = (price) => {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending": return "warning";
    case "Confirmed": return "info";
    case "Completed": return "success";
    case "Cancelled": return "error";
    default: return "grey";
  }
};

// Fetch bookings
const fetchBookings = async () => {
  loadingBookings.value = true;
  try {
    const res = await axios.get("/api/bookings", getHeadersConfig());
    bookings.value = res.data;
  } catch (err) {
    console.error("Gagal memuat booking");
  } finally {
    loadingBookings.value = false;
  }
};

// Update booking status
const updateBookingStatus = async (id, status) => {
  try {
    await axios.put(`/api/bookings/${id}/status`, { status }, getHeadersConfig());
    fetchBookings();
  } catch (err) {
    alert("Gagal memperbarui status");
  }
};

// Delete booking
const deleteBooking = async (id) => {
  if (!confirm("Hapus data pemesanan ini?")) return;
  try {
    await axios.delete(`/api/bookings/${id}`, getHeadersConfig());
    fetchBookings();
  } catch (err) {
    alert("Gagal menghapus data");
  }
};

// Fetch services
const fetchServices = async () => {
  loadingServices.value = true;
  try {
    const res = await axios.get("/api/services");
    services.value = res.data;
  } catch (err) {
    console.error("Gagal memuat layanan");
  } finally {
    loadingServices.value = false;
  }
};

// Service form methods
const openAddServiceDialog = () => {
  isEditingService.value = false;
  currentServiceId.value = null;
  serviceForm.value = {
    name: "",
    category: "Mom Care",
    price: 150000,
    duration: 60,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=600&auto=format&fit=crop&q=80",
    description: "",
  };
  serviceDialog.value = true;
};

const openEditServiceDialog = (item) => {
  isEditingService.value = true;
  currentServiceId.value = item.id;
  serviceForm.value = {
    name: item.name,
    category: item.category,
    price: item.price,
    duration: item.duration,
    image: item.image,
    description: item.description,
  };
  serviceDialog.value = true;
};

const submitServiceForm = async () => {
  savingService.value = true;
  try {
    if (isEditingService.value) {
      await axios.put(`/api/services/${currentServiceId.value}`, serviceForm.value, getHeadersConfig());
    } else {
      await axios.post("/api/services", serviceForm.value, getHeadersConfig());
    }
    serviceDialog.value = false;
    fetchServices();
  } catch (err) {
    alert("Gagal menyimpan layanan");
  } finally {
    savingService.value = false;
  }
};

const deleteService = async (id) => {
  if (!confirm("Hapus layanan homecare ini?")) return;
  try {
    await axios.delete(`/api/services/${id}`, getHeadersConfig());
    fetchServices();
  } catch (err) {
    alert("Gagal menghapus layanan");
  }
};

// Fetch articles
const fetchArticles = async () => {
  loadingArticles.value = true;
  try {
    const res = await axios.get("/api/articles");
    articles.value = res.data;
  } catch (err) {
    console.error("Gagal memuat artikel");
  } finally {
    loadingArticles.value = false;
  }
};

// Article form methods
const openAddArticleDialog = () => {
  isEditingArticle.value = false;
  currentArticleId.value = null;
  articleForm.value = {
    title: "",
    category: "Kesehatan Anak",
    keywords: "",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=800&auto=format&fit=crop&q=80",
    summary: "",
    content: "",
  };
  articleDialog.value = true;
};

const openEditArticleDialog = (item) => {
  isEditingArticle.value = true;
  currentArticleId.value = item.id;
  articleForm.value = {
    title: item.title,
    category: item.category,
    keywords: item.keywords,
    image: item.image,
    summary: item.summary,
    content: item.content,
  };
  articleDialog.value = true;
};

const submitArticleForm = async () => {
  savingArticle.value = true;
  try {
    if (isEditingArticle.value) {
      await axios.put(`/api/articles/${currentArticleId.value}`, articleForm.value, getHeadersConfig());
    } else {
      await axios.post("/api/articles", articleForm.value, getHeadersConfig());
    }
    articleDialog.value = false;
    fetchArticles();
  } catch (err) {
    alert("Gagal mempublikasikan artikel");
  } finally {
    savingArticle.value = false;
  }
};

const deleteArticle = async (id) => {
  if (!confirm("Hapus artikel ini?")) return;
  try {
    await axios.delete(`/api/articles/${id}`, getHeadersConfig());
    fetchArticles();
  } catch (err) {
    alert("Gagal menghapus artikel");
  }
};

// Logout
const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  router.push("/admin");
};

onMounted(() => {
  fetchBookings();
  fetchServices();
  fetchArticles();
});
</script>

<style scoped>
.bg-white {
  background-color: white !important;
}
.gap-4 {
  gap: 16px;
}
.gap-3 {
  gap: 12px;
}
</style>
