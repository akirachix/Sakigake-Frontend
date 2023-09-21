import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { 
        textblue:'#008CBF',
        navyblue:'#303972',
        grey:'#E5E5E5',
        textgrey:'#A098AE',
        lightblue:'#B4DCFE',
        lightgrey:'#667085',
        mildgrey:'#484848',  
      },
      fontFamily:{
        baloo:[ 'Baloo Bhai 2', 'cursive' ],
        jost:[ 'Jost' ]
      },
    },
  },
  plugins: [],
}
export default config
