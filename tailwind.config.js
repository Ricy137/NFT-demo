const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*"
  ],
  darkMode: 'class',
  theme: {
    // 扩展颜色类，生成bg-primary-light,text-primary-light...
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      colors: {
        'primary-light': '#FFFFFF', //浅白 light mode
        'secondary-light': '#F7F8FC', //白 light mode
        'ternary-light': '#f6f7f8', //深白 light mode
        'primary-dark': '#1d2129',//'#1E3851',  //浅黑色，用于dark mode的背景颜色
        'secondary-dark': '#1a253b',  //黑色，用于dark mode的背景颜色
        'ternary-dark': '#151e31',  //深黑色，用于dark mode的背景颜色
        'logo-blue': '#6525FF',  //蓝色
        'number-orange': '#FF6E40', //橙色
        "light-grey": "#4e5969",  //浅浅灰
        "primary-grey": '#757b87',   //浅灰色，用于dark mode的激活文字样式
        "secondary-grey": "#69778f",  //灰色，用于dark mode的正常文字样式
        "ternary-grey": "#59778f",  //深灰色，用于dark mode的disabled文字样式
        "primary-purple": "#6525FF", //紫色
        "light-purple": "#F3F0FF", //浅紫色，用于列表高亮
        "bright-green":"#60c657",//bright green ,for gradient bg
        "bright-blue":"#35aee2"//bright blue ,for gradient bg
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      screens: {
        'sm': '400px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1680px',
        '4xl': '1920px',
        // '3xl': '1680px',
        // '2xl': '1536px',
        // 'xl': '1280px',
        // 'lg': '1024px',
        // 'md': '768px',
        // 'sm': '640px',
        // 'mobile': '400px',
      },
      maxWidth: {
        'screen-3xl': '1600px',
        'screen-4xl': '1880px'
      },
    },
    variants: {
      extend: { opacity: ['disabled'], borderStyle: ['hover'] },
    },
    plugins: [require('@tailwindcss/forms')],
  }
};
