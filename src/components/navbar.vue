<template>
  <v-app-bar color="navy" dark elevation="2" height="75" px-4>
    <!-- Brand / Logo -->
    <v-container class="d-flex align-center justify-between py-0 max-width-lg">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-avatar size="50" class="mr-3 bg-white pa-1">
          <v-img src="/images/Logo.png" alt="Logo Bidan Lila"></v-img>
        </v-avatar>
        <div>
          <span class="text-h6 font-weight-bold text-white leading-tight d-block">Bidan Lila</span>
          <span class="text-caption text-teal font-weight-bold d-block uppercase tracking-wider" style="margin-top: -4px;">Homecare & Spa</span>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Links -->
      <div class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          variant="text"
          color="white"
          class="mx-1 text-capitalize font-weight-medium"
          :prepend-icon="item.icon"
        >
          {{ item.title }}
        </v-btn>
        
        <v-btn
          to="/booking"
          color="primary"
          variant="flat"
          class="ml-3 text-capitalize font-weight-bold rounded-lg px-4"
          prepend-icon="mdi-calendar-check"
          elevation="2"
        >
          Booking Sekarang
        </v-btn>
      </div>

      <!-- Mobile Menu Button -->
      <v-btn
        icon="mdi-menu"
        variant="text"
        color="white"
        class="d-flex d-md-none"
        @click="drawer = !drawer"
      ></v-btn>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" color="white">
    <v-list class="pa-4">
      <div class="d-flex align-center mb-6">
        <v-avatar size="45" class="mr-3 bg-pink-lighten-4">
          <v-img src="/images/Logo.png" alt="Logo"></v-img>
        </v-avatar>
        <div>
          <h4 class="font-weight-bold text-navy">Bidan Lila</h4>
          <span class="text-caption text-primary">Homecare & Spa</span>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.title"
        color="primary"
        class="rounded-lg mb-2 text-navy"
        active-class="bg-pink-lighten-5 text-primary font-weight-bold"
      ></v-list-item>

      <v-btn
        to="/booking"
        color="primary"
        block
        class="mt-6 rounded-lg text-capitalize font-weight-bold py-3"
        prepend-icon="mdi-calendar-check"
        elevation="2"
      >
        Booking Sekarang
      </v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);

const menuItems = ref([
  { title: "Home", path: "/", icon: "mdi-home" },
  { title: "Layanan kami", path: "/layanan", icon: "mdi-baby-face-outline" },
  { title: "Artikel Ibu & Anak", path: "/artikel", icon: "mdi-book-open-page-variant" },
  { title: "Tentang Bidan", path: "/tentang-kami", icon: "mdi-account-heart" },
  { title: "Admin", path: "/admin", icon: "mdi-shield-account" },
]);
</script>

<style scoped>
.leading-tight {
  line-height: 1.25;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.uppercase {
  text-transform: uppercase;
}
</style>
