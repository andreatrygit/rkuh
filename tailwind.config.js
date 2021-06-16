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
    screens:{
      'sm': '640px',
      'sm-land': {'raw': '(orientation: landscape) and (min-width:640px) and (max-width:767px)'},
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
