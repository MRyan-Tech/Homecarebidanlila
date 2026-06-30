<template>
  <div class="admin-login-page py-16 bg-pink-lighten-5" style="min-height: 80vh; display: flex; align-items: center;">
    <v-container class="max-width-xs">
      <v-card class="rounded-xl pa-8 elevation-4 bg-white mx-auto" max-width="400">
        <div class="text-center mb-6">
          <v-avatar color="primary" size="64" class="mb-4">
            <v-icon icon="mdi-shield-lock-outline" color="white" size="32"></v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-navy">Admin Login</h2>
          <p class="text-caption text-grey-500">Kelola pemesanan, layanan, & artikel edukasi</p>
        </div>

        <v-form ref="form" v-model="isFormValid" @submit.prevent="handleLogin">
          <v-text-field
            v-model="loginForm.username"
            label="Username Admin"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-account"
            :rules="[v => !!v || 'Username wajib diisi']"
            required
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="loginForm.password"
            label="Password"
            type="password"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-lock"
            :rules="[v => !!v || 'Password wajib diisi']"
            required
            class="mb-6"
          ></v-text-field>

          <v-btn
            type="submit"
            color="navy"
            block
            size="large"
            class="rounded-lg text-capitalize font-weight-bold py-3 text-white"
            :disabled="!isFormValid || loading"
            :loading="loading"
          >
            Masuk ke Dashboard
          </v-btn>
        </v-form>

        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-6 rounded-lg text-body-2"
          closable
        >
          {{ errorMessage }}
        </v-alert>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isFormValid = ref(false);
const loading = ref(false);
const errorMessage = ref("");

const loginForm = ref({
  username: "",
  password: "",
});

// Check if already logged in
onMounted(() => {
  if (localStorage.getItem("adminToken")) {
    router.push("/admin/dashboard");
  }
});

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await axios.post("/api/auth/login", loginForm.value);
    
    // Save token and user details to localStorage
    localStorage.setItem("adminToken", res.data.token);
    localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

    // Redirect to dashboard
    router.push("/admin/dashboard");
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Login gagal. Periksa kembali username dan password Anda.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.max-width-xs {
  max-width: 480px;
}
.bg-white {
  background-color: white !important;
}
</style>
