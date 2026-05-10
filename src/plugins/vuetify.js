import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const savedTheme = localStorage.getItem('theme-preference');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const defaultTheme = savedTheme ?? systemTheme;

const vuetify = createVuetify({
  theme: {
    defaultTheme,
    themes: {
      light: {
        colors: {
          primary: '#2e7d32',
          secondary: '#66bb6a',
          background: '#f5f7fa',
          surface: '#ffffff',
        },
      },
      dark: {
        colors: {
          primary: '#66bb6a',
          secondary: '#a5d6a7',
          background: '#121212',
          surface: '#1e1e1e',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
