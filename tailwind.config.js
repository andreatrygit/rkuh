module.exports = {
  purge: {
    enabled: true,
    content: ['./api/**/*.js','./public/index.html'],
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
  ],
  daisyui: {
      styled: true,
      themes: true,
      rtl: false,
    },
}
