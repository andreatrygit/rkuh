module.exports = {
  mode:'jit',
  purge: {
    enabled: true,
    content: ['./api/**/*.js','./public/**/*.html'],
    options: {
        safelist: [
          /data-theme$/,
        ]
      },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio')
  ],
  daisyui: {
      styled: true,
      themes: true,
      rtl: false,
    },
}
