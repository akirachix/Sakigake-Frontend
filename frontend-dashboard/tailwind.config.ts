import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
 feature/login
      colors: { 
        textblue:'#008CBF',
        navyblue:'#303972',
        grey:'#E5E5E5',
        textgrey:'#A098AE',
        lightblue:'#B4DCFE',
        lightgrey:'#667085',
        mildgrey:'#484848', 
        darkgrey:'#4F4F4F', 
        bgblue:'#008CBF',
        buttonblue:'#509CDB',
        gregrey:'#CECECE',
      },
      fontFamily:{
        baloo:[ 'Baloo Bhai 2', 'cursive' ],
        jost:[ 'Jost' ]
      },
      width: {
        '248': '248px',
        '208px':'208px',
        '160':'160 px',

      },
      height: {
        '42':'42',
        '128':'128',
        '100':'100 px'
      },
      margin: {
        '150':'150',
      },
      fontSize:{
        '28px':'28px'
      }

      backgroundImage: {
        pattern: "url('/images/background.png')",
      },
      colors:{
        mainblue: "#008CBF",
        hoverblue: "#509CDB",
        white: "#fff",
        maingrey:'#484848',
        bordercolor:'#CECECE',
      }
    },
    fontFamily:{
      baloo:[ 'Baloo Bhai 2', 'cursive' ],
      jost:[ 'Jost' ]
 dev
    },

  },
  plugins: [],
}
export default config
