<template>
  <v-app class="app-container">
    <Navbar />
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
</script>

<style>
/* Global CSS tweaks */
body {
  font-family: 'Outfit', sans-serif !important;
}
.text-navy {
  color: #2B3846 !important;
}
.bg-navy {
  background-color: #2B3846 !important;
}
.text-teal {
  color: #5E8C81 !important;
}
.bg-teal {
  background-color: #5E8C81 !important;
}
.app-container {
  background-color: #FAF6F0 !important;
}
.main-content {
  padding-bottom: 0px !important;
}

/* Premium Scroll Animation Classes */
.animate-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.animate-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}
</style>


