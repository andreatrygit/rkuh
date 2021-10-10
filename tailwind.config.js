module.exports = {
  mode:'jit',
  purge: {
    enabled: true,
    content: ['./**/*.{js,html}'],
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
      'sm-land': {'raw': '(orientation: landscape) and (min-width:640px) and (max-width:820px)'}, // iphone x is 812
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
    require('daisyui')
  ],
  daisyui: {
      styled: true,
      themes: true,
      rtl: false,
    },
}
