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
      screens:{
          'pho-po': {'raw': '(max-width:480)'},
          'pho-la': {'raw': '(orientation: landscape) and (min-width:481) and (max-width:768)'},
          'tab-po': {'raw': '(orientation: portrait) and (min-width:481) and (max-width:768)'},
          'tab-la-lap': {'raw': '(min-width:769) and (max-width:1279)'},
          'desktop': {'raw': '(min-width:1280)'}
      }
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
