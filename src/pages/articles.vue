<template>
  <div class="articles-page py-12">
    <!-- Header Section -->
    <v-sheet color="navy" class="py-12 text-white text-center position-relative mb-12">
      <v-container class="max-width-lg">
        <h1 class="text-h3 font-weight-bold mb-4">Edukasi Kesehatan Ibu & Anak</h1>
        <p class="text-subtitle-1 text-grey-300 max-w-600 mx-auto">
          Temukan panduan terpercaya seputar kehamilan, tips menyusui, tumbuh kembang bayi, dan informasi kesehatan keluarga dari Bidan Lila.
        </p>
      </v-container>
    </v-sheet>

    <v-container class="max-width-lg">
      <v-row class="mb-8 align-center">
        <!-- Search Field -->
        <v-col cols="12" md="5">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Cari artikel..."
            variant="outlined"
            density="comfortable"
            color="primary"
            class="bg-white rounded-lg"
            hide-details
          ></v-text-field>
        </v-col>
        
        <!-- Category Dropdown / Filters -->
        <v-col cols="12" md="7" class="text-right">
          <v-chip-group mandatory v-model="selectedCategory" color="primary">
            <v-chip value="All" filter variant="outlined" class="font-weight-bold">Semua</v-chip>
            <v-chip value="Kesehatan Anak" filter variant="outlined" class="font-weight-bold">Kesehatan Anak</v-chip>
            <v-chip value="Kesehatan Ibu" filter variant="outlined" class="font-weight-bold">Kesehatan Ibu</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- Articles Grid -->
      <v-row v-if="filteredArticles.length > 0">
        <v-col v-for="art in filteredArticles" :key="art.id" cols="12" sm="6" md="4">
          <v-card class="article-card rounded-xl elevation-2 h-100 d-flex flex-column hover-shadow transition-all">
            <v-img :src="art.image" height="200" cover></v-img>
            
            <v-card-item class="flex-grow-1">
              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-caption font-weight-bold text-teal">{{ art.category }}</span>
                <span class="text-caption text-grey-500">{{ formatDate(art.createdAt) }}</span>
              </div>
              
              <h3 class="text-h6 font-weight-bold text-navy mb-2 line-clamp-2">
                <router-link :to="`/artikel/${art.slug}`" class="text-decoration-none text-navy">
                  {{ art.title }}
                </router-link>
              </h3>
              
              <p class="text-body-2 text-grey-600 line-clamp-3">
                {{ art.summary }}
              </p>
            </v-card-item>
            
            <v-card-actions class="pa-4 pt-0">
              <v-btn
                :to="`/artikel/${art.slug}`"
                color="primary"
                variant="text"
                class="text-capitalize font-weight-bold"
                append-icon="mdi-chevron-right"
              >
                Baca Selengkapnya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- No Articles -->
      <v-sheet v-else class="text-center py-12 rounded-xl bg-white elevation-1">
        <v-icon icon="mdi-book-open-blank-variant" size="64" color="grey-400" class="mb-4"></v-icon>
        <h3 class="text-h6 font-weight-bold text-navy mb-2">Artikel Tidak Ditemukan</h3>
        <p class="text-body-2 text-grey-500">Coba gunakan kata kunci pencarian yang lain.</p>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const searchQuery = ref("");
const selectedCategory = ref("All");
const articles = ref([]);

const formatDate = (dateStr) => {
  if (!dateStr) return "30 Juni 2026";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fetchData = async () => {
  try {
    const res = await axios.get("/api/articles");
    articles.value = res.data;
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
        createdAt: "2026-06-30T08:00:00Z"
      },
      {
        id: 2,
        title: "Mengatasi ASI Seret dengan Pijat Laktasi: Panduan Lengkap Ibu Menyusui",
        slug: "mengatasi-asi-seret-dengan-pijat-laktasi",
        summary: "ASI tidak lancar sering membuat ibu cemas. Pijat laktasi adalah solusi alami yang terbukti meningkatkan hormon oksitosin dan melancarkan saluran ASI yang tersumbat.",
        category: "Kesehatan Ibu",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        createdAt: "2026-06-29T10:00:00Z"
      },
      {
        id: 3,
        title: "Panduan Praktis Perawatan Tali Pusat Bayi Baru Lahir secara Aman di Rumah",
        slug: "panduan-perawatan-tali-pusat-newborn",
        summary: "Merawat tali pusat bayi yang baru lahir sering membuat orang tua baru khawatir akan risiko infeksi. Ikuti panduan praktis perawatan tali pusat kering dan steril.",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
        createdAt: "2026-06-28T09:00:00Z"
      }
    ];
  }
};

const filteredArticles = computed(() => {
  return articles.value.filter((art) => {
    const matchCategory =
      selectedCategory.value === "All" || art.category === selectedCategory.value;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.articles-page {
  background-color: #FFFBF7 !important;
  min-height: 100vh;
}
.max-w-600 {
  max-width: 600px;
}
.article-card {
  transition: all 0.3s ease;
}
.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
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
