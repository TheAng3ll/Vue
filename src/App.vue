
<script setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const isDark = computed({
  get: () => theme.global.name.value === 'dark',
  set: (value) => {
    const nextTheme = value ? 'dark' : 'light';
    theme.global.name.value = nextTheme;
    localStorage.setItem('theme-preference', nextTheme);
  },
});
</script>

<template>
  <v-app>
    <v-app-bar color="surface" density="comfortable" flat>
      <v-spacer />
      <v-btn
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        @click="isDark = !isDark"
      />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>